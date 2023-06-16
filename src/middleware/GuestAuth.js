import { useLocation, Navigate, Outlet } from "react-router-dom";
import APP from "src/config/app";
import Cookies from "universal-cookie";

const GuestAuth = () => {
    const location = useLocation();

    const cookies = new Cookies();
    const accessToken = cookies.get(APP.ACCESS_TOKEN_KEY);

    return (
        accessToken ? <Navigate to="/feed/me" state={{ from: location }} replace /> : <Outlet />
    );
}

export default GuestAuth;