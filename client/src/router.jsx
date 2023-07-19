import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";

const Router = () => {
  const pagesData = [
    {
      path: "login",
      element: <Login />,
      title: "login",
    },
    {
      path: "signup",
      element: <Signup />,
      title: "signup",
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {pagesData.map((page) => (
          <Route
            key={page.title}
            path={`${page.path}`}
            element={page.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
