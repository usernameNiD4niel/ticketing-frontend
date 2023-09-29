import React from "react";
import { ClientCookiesProvider } from "./CookiesProvider";

import { cookies } from "next/headers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClientCookiesProvider value={cookies().getAll()}>
        {children}
      </ClientCookiesProvider>
    </div>
  );
};

export default RootLayout;
