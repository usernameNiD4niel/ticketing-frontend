import { getSpecificTicketTypeAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCustom from "@/components/utils/SelectCustom";
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
    console.log(`selected tt ::: ${selectedTT}`);

    const response = await getSpecificTicketTypeAction(selectedTT);
    console.log(`the response ::: ${JSON.stringify(response, null, 2)}`);
    setPriority(response.priority);
    setDuration(response.duration);
  }

  useEffect(() => {
    if (!selectedTT) {
      setSelectedTT(default_tt);
    }

    if (selectedTT) {
      getSpecifiedTT();
    }
  }, [selectedTT]);

  return (
    <div className="w-full">
      <Label className="flex flex-col gap-2">
        <span>Ticket Type</span>
        <SelectTT
          selected={selectedTT}
          setSelected={setSelectedTT}
          ticketType={ticket_type}
        />
        {/* <SelectCustom
          items={ticket_type}
          name="Ticket Type"
          placeholder="Select ticket type"
          defaultValue={default_tt}
          isRequired
          width="w-full"
          key={"ComponentClientFeedTicketTypeFieldTicketTypeFieldTicketType"}
        /> */}
      </Label>
      <Label className="flex flex-col gap-2">
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
