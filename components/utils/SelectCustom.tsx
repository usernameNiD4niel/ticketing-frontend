import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SelectCustomProps {
  items: string[];
  name: string;
  placeholder: string;
  width?: string;
  isRequired?: boolean;
  defaultValue?: string;
}

export default function SelectCustom({
  items,
  name,
  placeholder,
  width,
  isRequired = false,
  defaultValue,
}: SelectCustomProps) {
  const [selected, setSelected] = useState(defaultValue);

  function handleOpen(selectedItem: string) {
    setSelected(selectedItem);
  }

  return (
    <Select
      name={name}
      required={isRequired}
      value={selected}
      onValueChange={handleOpen}
    >
      <SelectTrigger className={`${width ? width : "w-[180px]"}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
