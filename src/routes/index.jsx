import { createBrowserRouter } from "react-router-dom";
import MainLayoutos from "../layouts/MainLayoutos";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutos />,
    errorElement: <h3 className="text-center">Not Found</h3>,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);
