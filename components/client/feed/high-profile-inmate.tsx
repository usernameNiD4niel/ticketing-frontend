import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/utils/CustomSelect";
import Cookies from "js-cookie";

interface HighProfileInmateProps {
  isChampion: boolean;
  assignTo: string;
  champions: string[];
}

export default function HighProfileInmate({
  assignTo,
  champions,
  isChampion,
}: HighProfileInmateProps) {
  if (champions.length === 0) {
    return <div>Getting champions...</div>;
  }

  const name = Cookies.get("name")?.toString();

  if (isChampion) {
    return (
      <Label>
        <span>Assign To</span>
        <Input disabled defaultValue={name} />
      </Label>
    );
  }

  return (
    <CustomSelect
      isFullWidth={true}
      label="Assign To"
      selectItems={["Choose here", ...champions, name!]}
      selectedState={assignTo}
    />
  );
}
