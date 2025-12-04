import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Users, UserCheck, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { format, subDays } from "date-fns";

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

interface TeamComparisonProps {
  teams: Team[];
  teamMembers: TeamMember[];
}

export function TeamComparison({ teams, teamMembers }: TeamComparisonProps) {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const addTeam = (teamId: string) => {
    if (!selectedTeams.includes(teamId) && selectedTeams.length < 4) {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  const removeTeam = (teamId: string) => {
    setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
  };

  const getTeamStats = (teamId: string) => {
    const members = teamMembers.filter((m) => m.team_id === teamId);
    const team = teams.find((t) => t.id === teamId);
    
    const roleCount = members.reduce((acc, m) => {
      acc[m.role] = (acc[m.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const oneWeekAgo = subDays(new Date(), 7);
    const recentJoins = members.filter((m) => new Date(m.joined_at) > oneWeekAgo).length;

    return {
      name: team?.name || "Unknown",
      totalMembers: members.length,
      admins: roleCount["admin"] || 0,
      leads: roleCount["lead"] || 0,
      regularMembers: roleCount["member"] || 0,
      recentJoins,
      createdAt: team?.created_at ? format(new Date(team.created_at), "MMM d, yyyy") : "N/A",
    };
  };

  const comparisonData = selectedTeams.map((teamId) => getTeamStats(teamId));

  const barChartData = comparisonData.map((stats) => ({
    name: stats.name.length > 12 ? stats.name.slice(0, 12) + "..." : stats.name,
    Members: stats.totalMembers,
    Admins: stats.admins,
    Leads: stats.leads,
    Recent: stats.recentJoins,
  }));

  const radarData = [
    { metric: "Members", ...Object.fromEntries(comparisonData.map((s) => [s.name, s.totalMembers])) },
    { metric: "Admins", ...Object.fromEntries(comparisonData.map((s) => [s.name, s.admins])) },
    { metric: "Leads", ...Object.fromEntries(comparisonData.map((s) => [s.name, s.leads])) },
    { metric: "Recent Joins", ...Object.fromEntries(comparisonData.map((s) => [s.name, s.recentJoins])) },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  const availableTeams = teams.filter((t) => !selectedTeams.includes(t.id));

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Team Comparison</h3>
        <div className="flex items-center gap-2">
          {selectedTeams.length < 4 && availableTeams.length > 0 && (
            <Select onValueChange={addTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Add team to compare" />
              </SelectTrigger>
              <SelectContent>
                {availableTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Selected Teams Badges */}
      {selectedTeams.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTeams.map((teamId, index) => {
            const team = teams.find((t) => t.id === teamId);
            return (
              <Badge
                key={teamId}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
                style={{ borderLeft: `3px solid ${COLORS[index]}` }}
              >
                {team?.name}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeTeam(teamId)}
                />
              </Badge>
            );
          })}
          {selectedTeams.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedTeams([])}>
              Clear all
            </Button>
          )}
        </div>
      )}

      {selectedTeams.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Select teams to compare their statistics</p>
          <p className="text-sm">You can compare up to 4 teams</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comparisonData.map((stats, index) => (
              <Card
                key={stats.name}
                className="p-3"
                style={{ borderTop: `3px solid ${COLORS[index]}` }}
              >
                <h4 className="font-medium text-sm truncate mb-2">{stats.name}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> Total
                    </span>
                    <span className="font-semibold">{stats.totalMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <UserCheck className="h-3 w-3" /> Admins
                    </span>
                    <span>{stats.admins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Recent
                    </span>
                    <span>{stats.recentJoins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Created
                    </span>
                    <span>{stats.createdAt}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts */}
          {selectedTeams.length >= 2 && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Bar Chart */}
              <Card className="p-4">
                <h4 className="text-sm font-medium mb-3">Member Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        tick={{ fontSize: 11 }}
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
                      <Bar dataKey="Members" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Admins" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Leads" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Radar Chart */}
              <Card className="p-4">
                <h4 className="text-sm font-medium mb-3">Team Metrics Comparison</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <PolarRadiusAxis tick={{ fontSize: 9 }} />
                      {comparisonData.map((stats, index) => (
                        <Radar
                          key={stats.name}
                          name={stats.name}
                          dataKey={stats.name}
                          stroke={COLORS[index]}
                          fill={COLORS[index]}
                          fillOpacity={0.2}
                        />
                      ))}
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
