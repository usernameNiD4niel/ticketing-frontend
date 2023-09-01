import { Button } from "../ui/button";
import { BsSearch } from "react-icons/bs";
import LeftSheet from "./LeftSheet";

const Header = () => {
  return (
    <>
      <LeftSheet />
      <h1 className="font-bold">Head</h1>
      <Button variant="outline">
        <BsSearch />
      </Button>
    </>
  );
};

export default Header;
