import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectTTProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
}

export default function SelectTT({ items, setValue, value }: SelectTTProps) {
  function handleOnSelectedRole(item: string) {
    setValue(item);
  }

  return (
    <Label className="space-y-2">
      <span>Ticket Type</span>
      <Select value={value} onValueChange={handleOnSelectedRole}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item, index) => (
              <SelectItem value={item.toUpperCase()} key={index}>
                {item.toUpperCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
}
