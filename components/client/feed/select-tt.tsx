import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectTTProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  ticketType: string[];
}

export default function SelectTT({
  selected,
  setSelected,
  ticketType,
}: SelectTTProps) {
  function handleOpen(selectedItem: string) {
    setSelected(selectedItem);
  }

  return (
    <Select value={selected} onValueChange={handleOpen}>
      <SelectTrigger className={`w-full`}>
        <SelectValue placeholder={"Select ticket type"} />
      </SelectTrigger>
      <SelectContent>
        {ticketType.map((item) => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
