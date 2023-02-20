import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/Home";
import Results from "../pages/Results/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/results/:teamCode",
        element: <Results />,
      },
    ],
  },
]);
