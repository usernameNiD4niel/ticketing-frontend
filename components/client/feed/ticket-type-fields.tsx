import { getSpecificTicketTypeAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import SelectTT from "./select-tt";

interface TicketTypeFieldsProps {
  ticket_type: string[];
  default_tt: string;
}

export default function TicketTypeFields({
  ticket_type,
  default_tt,
}: TicketTypeFieldsProps) {
  const [selectedTT, setSelectedTT] = useState("");
  const [priority, setPriority] = useState("");
  const [duration, setDuration] = useState("");

  async function getSpecifiedTT() {
    const response = await getSpecificTicketTypeAction(selectedTT);
    setPriority(response.priority);
    setDuration(response.duration);
  }

  useEffect(() => {
    if (default_tt) {
      setSelectedTT(default_tt);
    }
  }, []);

  useEffect(() => {
    if (selectedTT) {
      getSpecifiedTT();
    }
  }, [selectedTT]);

  return (
    <div className="w-full space-y-2">
      <Label className="space-y-2">
        <span>Ticket Type</span>
        <SelectTT
          items={["SELECT A TYPE", ...ticket_type]}
          setValue={setSelectedTT}
          value={selectedTT}
          key={"TicketTypeFieldsFeedClientComponents"}
        />
      </Label>

      <Label className="flex flex-col gap-2 mt-2">
        <span>Priority</span>
        <Input
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled
          className="w-full"
        />
      </Label>
      <Label className="flex flex-col gap-2">
        <span>Duration</span>
        <Input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled
          className="w-full"
        />
      </Label>
    </div>
  );
}
