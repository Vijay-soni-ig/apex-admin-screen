import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Mail, Calendar, Shield } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: Profile | null;
}

interface MemberProfileCardProps {
  member: TeamMember;
  onRemove: (memberId: string) => void;
}

export function MemberProfileCard({ member, onRemove }: MemberProfileCardProps) {
  const profile = member.profile;
  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : member.user_id.slice(0, 2).toUpperCase();

  const roleColors: Record<string, string> = {
    admin: "bg-destructive/10 text-destructive border-destructive/20",
    lead: "bg-primary/10 text-primary border-primary/20",
    member: "bg-secondary text-secondary-foreground border-border",
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border-2 border-border">
          <AvatarImage src={profile?.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold truncate">
              {profile?.full_name || "Unknown User"}
            </h4>
            <Badge
              variant="outline"
              className={`text-xs ${roleColors[member.role] || roleColors.member}`}
            >
              <Shield className="h-3 w-3 mr-1" />
              {member.role}
            </Badge>
          </div>

          {profile?.email && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate">{profile.email}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Joined {new Date(member.joined_at).toLocaleDateString()}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
          onClick={() => {
            if (confirm("Remove this member from the team?")) {
              onRemove(member.id);
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
