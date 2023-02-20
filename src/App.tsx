import React from "react";
import { Outlet } from "react-router-dom";

import { NbaProvider } from "./context/NbaContext";

const App = () => {
  return (
    <div className="container h-screen w-screen mx-auto py-4">
      <header className="mb-5 text-3xl">NBA Score Tracking APP</header>
      <NbaProvider>
        <Outlet />
      </NbaProvider>
    </div>
  );
};

export default App;
