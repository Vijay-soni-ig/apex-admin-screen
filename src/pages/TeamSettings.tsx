import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Settings, Shield, Bell, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { teamSettingsSchema } from "@/lib/validations";

export default function TeamSettings() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [defaultRole, setDefaultRole] = useState("member");
  const [allowSelfJoin, setAllowSelfJoin] = useState(false);
  const [notifyOnJoin, setNotifyOnJoin] = useState(true);
  const [notifyOnLeave, setNotifyOnLeave] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch team details
  const { data: team, isLoading } = useQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      if (!teamId) return null;
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("id", teamId)
        .single();

      if (error) throw error;
      
      setTeamName(data.name);
      setTeamDescription(data.description || "");
      return data;
    },
    enabled: !!teamId,
  });

  // Update team mutation
  const updateTeamMutation = useMutation({
    mutationFn: async () => {
      if (!teamId) throw new Error("No team ID");

      const { error } = await supabase
        .from("teams")
        .update({
          name: teamName,
          description: teamDescription,
        })
        .eq("id", teamId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
      toast.success("Team settings updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update team: " + error.message);
    },
  });

  // Delete team mutation
  const deleteTeamMutation = useMutation({
    mutationFn: async () => {
      if (!teamId) throw new Error("No team ID");

      const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", teamId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("Team deleted successfully");
      navigate("/teams");
    },
    onError: (error) => {
      toast.error("Failed to delete team: " + error.message);
    },
  });

  const handleSave = () => {
    setErrors({});

    const result = teamSettingsSchema.safeParse({
      name: teamName,
      description: teamDescription,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    updateTeamMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading team settings...</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Team not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/teams")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Team Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage settings and permissions for {team.name}
          </p>
        </div>
      </div>

      {/* General Settings */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">General Settings</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          <div>
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className={errors.name ? "border-destructive" : ""}
              maxLength={100}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="team-description">Description</Label>
            <Textarea
              id="team-description"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              placeholder="Enter team description"
              rows={3}
              className={errors.description ? "border-destructive" : ""}
              maxLength={500}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <Label htmlFor="default-role">Default Role for New Members</Label>
            <Select value={defaultRole} onValueChange={setDefaultRole}>
              <SelectTrigger id="default-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Permissions */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Permissions</h2>
        </div>
        <Separator />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Allow Self-Join</Label>
              <p className="text-sm text-muted-foreground">
                Users can join this team without an invitation
              </p>
            </div>
            <Switch
              checked={allowSelfJoin}
              onCheckedChange={setAllowSelfJoin}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Require Approval</Label>
              <p className="text-sm text-muted-foreground">
                New members require admin approval before joining
              </p>
            </div>
            <Switch
              checked={requireApproval}
              onCheckedChange={setRequireApproval}
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        <Separator />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Notify on Member Join</Label>
              <p className="text-sm text-muted-foreground">
                Send notification when a new member joins the team
              </p>
            </div>
            <Switch
              checked={notifyOnJoin}
              onCheckedChange={setNotifyOnJoin}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Notify on Member Leave</Label>
              <p className="text-sm text-muted-foreground">
                Send notification when a member leaves the team
              </p>
            </div>
            <Switch
              checked={notifyOnLeave}
              onCheckedChange={setNotifyOnLeave}
            />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 space-y-6 border-destructive/50">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Delete Team</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete this team and all its members
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Team</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  team "{team.name}" and remove all team members.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTeamMutation.mutate()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Team
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
