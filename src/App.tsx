import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const App = (props: Props) => {
  return (
    <div className='container h-screen w-screen mx-auto py-4'>
      <Outlet />
    </div>
  );
};

export default App;
