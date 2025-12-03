import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Users as UsersIcon, Trash2, UserPlus, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BulkActions } from "@/components/teams/BulkActions";

export default function Teams() {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Fetch teams
  const { data: teams, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch team members for selected team
  const { data: teamMembers } = useQuery({
    queryKey: ["team-members", selectedTeam],
    queryFn: async () => {
      if (!selectedTeam) return [];
      
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", selectedTeam);
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedTeam,
  });

  // Create team mutation
  const createTeamMutation = useMutation({
    mutationFn: async (formData: { name: string; description: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("teams")
        .insert({
          name: formData.name,
          description: formData.description,
          created_by: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setIsCreateOpen(false);
      toast.success("Team created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create team: " + error.message);
    },
  });

  // Add team member mutation
  const addMemberMutation = useMutation({
    mutationFn: async (formData: { userId: string; role: string }) => {
      if (!selectedTeam) throw new Error("No team selected");

      const { data, error } = await supabase
        .from("team_members")
        .insert({
          team_id: selectedTeam,
          user_id: formData.userId,
          role: formData.role,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", selectedTeam] });
      setIsAddMemberOpen(false);
      toast.success("Team member added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add member: " + error.message);
    },
  });

  // Delete team mutation
  const deleteTeamMutation = useMutation({
    mutationFn: async (teamId: string) => {
      const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", teamId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setSelectedTeam(null);
      toast.success("Team deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete team: " + error.message);
    },
  });

  // Remove team member mutation
  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", memberId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", selectedTeam] });
      toast.success("Member removed successfully");
    },
    onError: (error) => {
      toast.error("Failed to remove member: " + error.message);
    },
  });

  // Bulk role change mutation
  const bulkRoleChangeMutation = useMutation({
    mutationFn: async ({ memberIds, role }: { memberIds: string[]; role: string }) => {
      const { error } = await supabase
        .from("team_members")
        .update({ role })
        .in("id", memberIds);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", selectedTeam] });
      setSelectedMemberIds([]);
      toast.success("Roles updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update roles: " + error.message);
    },
  });

  // Bulk remove mutation
  const bulkRemoveMutation = useMutation({
    mutationFn: async (memberIds: string[]) => {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .in("id", memberIds);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", selectedTeam] });
      setSelectedMemberIds([]);
      toast.success("Members removed successfully");
    },
    onError: (error) => {
      toast.error("Failed to remove members: " + error.message);
    },
  });

  const handleCreateTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createTeamMutation.mutate({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    });
  };

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addMemberMutation.mutate({
      userId: formData.get("userId") as string,
      role: formData.get("role") as string,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && teamMembers) {
      setSelectedMemberIds(teamMembers.map((m) => m.id));
    } else {
      setSelectedMemberIds([]);
    }
  };

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMemberIds((prev) => [...prev, memberId]);
    } else {
      setSelectedMemberIds((prev) => prev.filter((id) => id !== memberId));
    }
  };

  const handleBulkRoleChange = (role: string) => {
    bulkRoleChangeMutation.mutate({ memberIds: selectedMemberIds, role });
  };

  const handleBulkRemove = () => {
    bulkRemoveMutation.mutate(selectedMemberIds);
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Teams
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your teams and team members
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <Label htmlFor="name">Team Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter team name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter team description"
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Team
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Teams List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary" />
              All Teams
            </h2>
            {isLoading ? (
              <p className="text-muted-foreground">Loading teams...</p>
            ) : teams && teams.length > 0 ? (
              <div className="space-y-2">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedTeam === team.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => {
                      setSelectedTeam(team.id);
                      setSelectedMemberIds([]);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{team.name}</h3>
                        {team.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {team.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/teams/${team.id}/settings`);
                          }}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Are you sure you want to delete this team?")) {
                              deleteTeamMutation.mutate(team.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No teams found. Create your first team!</p>
            )}
          </Card>

          {/* Team Members */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-primary" />
                Team Members
              </h2>
              <div className="flex gap-2">
                {selectedTeam && teamMembers && teamMembers.length > 0 && (
                  <BulkActions
                    selectedIds={selectedMemberIds}
                    onBulkRoleChange={handleBulkRoleChange}
                    onBulkRemove={handleBulkRemove}
                  />
                )}
                {selectedTeam && (
                  <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMember} className="space-y-4">
                        <div>
                          <Label htmlFor="userId">User ID</Label>
                          <Input
                            id="userId"
                            name="userId"
                            placeholder="Enter user ID"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select name="role" defaultValue="member" required>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="lead">Lead</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">
                          Add Member
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            {!selectedTeam ? (
              <p className="text-muted-foreground">Select a team to view members</p>
            ) : teamMembers && teamMembers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        checked={
                          teamMembers.length > 0 &&
                          selectedMemberIds.length === teamMembers.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMemberIds.includes(member.id)}
                          onCheckedChange={(checked) =>
                            handleSelectMember(member.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {member.user_id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.role}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(member.joined_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            if (confirm("Remove this member from the team?")) {
                              removeMemberMutation.mutate(member.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">No members in this team yet</p>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}