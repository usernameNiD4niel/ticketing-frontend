import Selector from "@/components/client/hr/tab-mutator/selector";
import { AvailableTabs } from "@/constants/hr/enums";
import React from "react";

const RequestedManpower = () => {
  return (
    <div>
      <Selector activeTab={AvailableTabs["Requested Manpower"]} />
    </div>
  );
};

export default RequestedManpower;
