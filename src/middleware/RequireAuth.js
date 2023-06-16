import { useLocation, Navigate, Outlet } from "react-router-dom";
import APP from "src/config/app";
import Cookies from "universal-cookie";

const RequireAuth = () => {
    const location = useLocation();

    const cookies = new Cookies();
    const accessToken = cookies.get(APP.ACCESS_TOKEN_KEY);

    return (
        accessToken
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;