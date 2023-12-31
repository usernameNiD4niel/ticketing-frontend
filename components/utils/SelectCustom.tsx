import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCustomProps {
  items: string[];
  name: string;
  placeholder: string;
}

export default function SelectCustom({
  items,
  name,
  placeholder,
}: SelectCustomProps) {
  return (
    <Select name={name}>
      <SelectTrigger className="w-[180px]">
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
