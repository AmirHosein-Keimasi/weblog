import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayoutos from "../layouts/MainLayoutos";
import SingleblogPage from "../components/SingleblogPage";
import CreateBlogForm from "../components/CreateBlogForm";
import EditBlogForm from "../components/EditBlogForm";

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
{
        path: "/blogs/:blogId",
        element: <SingleblogPage />,
      },
      {
        path: "/blogs/create-blog",
        element: <CreateBlogForm />,
      },

      
      {
        path: "/editblogs/:blogId",
        element: <EditBlogForm />,
      },
    ],
  },
]);
