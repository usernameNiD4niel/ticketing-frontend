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
  return (
    <Select name={name} required={isRequired} value={defaultValue}>
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
