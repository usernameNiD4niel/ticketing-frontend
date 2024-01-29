import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

interface HoverNameProps {
  name: string;
  department: string;
  joinedOn: string;
}

export default function HoverName({
  name,
  department,
  joinedOn,
}: HoverNameProps) {
  function getFormattedName() {
    const splittedName = name.split(" ");

    let newName = "";

    if (splittedName.length > 3) {
      splittedName.splice(1, splittedName.length - 2);
    }

    for (const name_ of splittedName) {
      newName += name_.charAt(0).toUpperCase();
    }

    return newName;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="p-0 text-sm m-0 h-fit text-blue-900 font-bold"
        >
          {name}:{" "}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            {/* <AvatarImage src="/origdevexlogo.svg" /> */}
            <AvatarFallback>{getFormattedName()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-sm">
            <h4 className="text-sm font-semibold">@{name}</h4>
            <p className="text-sm">
              {name} is from {department} department. If you found this comment
              inappropriate <Link href={"#"}>click here</Link>
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined on: {joinedOn}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
