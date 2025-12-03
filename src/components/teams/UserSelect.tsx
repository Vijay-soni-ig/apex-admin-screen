import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

interface UserSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  excludeUserIds?: string[];
}

export function UserSelect({ value, onValueChange, excludeUserIds = [] }: UserSelectProps) {
  const [open, setOpen] = useState(false);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) throw error;
      return data as Profile[];
    },
  });

  const availableProfiles = profiles?.filter(
    (p) => !excludeUserIds.includes(p.user_id)
  );

  const selectedProfile = profiles?.find((p) => p.user_id === value);

  const getInitials = (name: string | null) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProfile ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={selectedProfile.avatar_url || undefined} />
                <AvatarFallback className="text-xs">
                  {getInitials(selectedProfile.full_name)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">
                {selectedProfile.full_name || selectedProfile.email || "Unknown"}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground">Select a user...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search users..." />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading..." : "No users found."}
            </CommandEmpty>
            <CommandGroup>
              {availableProfiles?.map((profile) => (
                <CommandItem
                  key={profile.user_id}
                  value={`${profile.full_name || ""} ${profile.email || ""}`}
                  onSelect={() => {
                    onValueChange(profile.user_id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === profile.user_id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="text-xs">
                      {getInitials(profile.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {profile.full_name || "No name"}
                    </span>
                    {profile.email && (
                      <span className="text-xs text-muted-foreground">
                        {profile.email}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
