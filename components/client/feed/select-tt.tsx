import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

interface SelectTTProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
}

export default function SelectTT({ items, setValue, value }: SelectTTProps) {
  function handleOnSelectedRole(item: string) {
    if (item) {
      setValue(item.toUpperCase());
    }
  }

  useEffect(() => {
    if (!value) {
      setValue(items[0].toUpperCase());
    }
  }, []);

  return (
    <Select
      value={value.toUpperCase()}
      onValueChange={handleOnSelectedRole}
      name={"ticket_type"}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={"Select ticket type"} />
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
  );
}
