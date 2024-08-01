import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const publicRoutes = [
    {
        path: "/",
        element: Home
    },
    {
        path: "/Login",
        element: Login
    },
    {
        path: "/Register",
        element: Register
    },
]

export default publicRoutes