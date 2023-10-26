import Selector from "@/components/client/hr/tab-mutator/selector";
import { AvailableTabs } from "@/constants/hr/enums";
import React from "react";

const DepartmentRole = () => {
  return (
    <div>
      <Selector activeTab={AvailableTabs["Department Role"]} />
    </div>
  );
};

export default DepartmentRole;
