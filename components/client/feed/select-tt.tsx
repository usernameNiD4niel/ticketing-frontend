import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomSelect from "@/components/utils/CustomSelect";

interface SelectTTProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  ticketType: string[];
  isDisable?: boolean;
}

export default function SelectTT({
  selected,
  setSelected,
  ticketType,
  isDisable,
}: SelectTTProps) {
  function handleOpen(selectedItem: string) {
    setSelected(selectedItem);
  }

  if (selected && selected.length > 0) {
    return (
      <Select
        value={selected}
        onValueChange={handleOpen}
        disabled={isDisable}
        name="selected-tt"
      >
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

  return (
    <Select disabled={isDisable} name="selected-tt">
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
