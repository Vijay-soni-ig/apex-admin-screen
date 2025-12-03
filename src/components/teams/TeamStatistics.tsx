import { Card } from "@/components/ui/card";
import { Users, Activity, UserCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

interface Team {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface TeamStatisticsProps {
  teams: Team[];
  teamMembers: TeamMember[];
}

const ROLE_COLORS = {
  admin: "hsl(var(--chart-1))",
  lead: "hsl(var(--chart-2))",
  member: "hsl(var(--chart-3))",
};

export function TeamStatistics({ teams, teamMembers }: TeamStatisticsProps) {
  // Calculate role distribution
  const roleDistribution = teamMembers.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(roleDistribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Calculate team activity (members per team)
  const teamActivity = teams.map((team) => ({
    name: team.name.length > 10 ? team.name.slice(0, 10) + "..." : team.name,
    members: teamMembers.filter((m) => m.team_id === team.id).length,
  }));

  // Calculate recent joins (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentJoins = teamMembers.filter(
    (m) => new Date(m.joined_at) > oneWeekAgo
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Members Card */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Members</p>
            <p className="text-2xl font-bold">{teamMembers.length}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Across {teams.length} teams
        </p>
      </Card>

      {/* Recent Activity Card */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Activity className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recent Joins</p>
            <p className="text-2xl font-bold">{recentJoins}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">In the last 7 days</p>
      </Card>

      {/* Role Distribution Card */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-secondary/50">
            <UserCheck className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role Distribution</p>
          </div>
        </div>
        {pieData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ROLE_COLORS[entry.name.toLowerCase() as keyof typeof ROLE_COLORS] ||
                        "hsl(var(--chart-4))"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No members yet</p>
        )}
        <div className="flex gap-3 justify-center mt-1">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-1 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    ROLE_COLORS[item.name.toLowerCase() as keyof typeof ROLE_COLORS] ||
                    "hsl(var(--chart-4))",
                }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Team Activity Chart */}
      {teamActivity.length > 0 && (
        <Card className="p-4 md:col-span-3">
          <h3 className="text-sm font-medium mb-3">Members per Team</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamActivity}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="members"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
