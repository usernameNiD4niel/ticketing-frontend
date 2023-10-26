import Selector from "@/components/client/hr/tab-mutator/selector";
import { AvailableTabs } from "@/constants/hr/enums";
import React from "react";

const Feed = () => {
  return (
    <div>
      <Selector activeTab={AvailableTabs.Feed} />
    </div>
  );
};

export default Feed;
