
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './middleware/RequireAuth';
import GuestAuth from './middleware/GuestAuth';

import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgot-password';
import PasswordReset from './pages/password-reset';
import ErrorPage from './pages/error';
import Feed from './pages/feed';
import Collection from './pages/collection';
import AllCollection from './pages/allCollection';


function App() {
    return (
        <Routes>
            <Route element={<GuestAuth />}>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="password/reset" element={<ForgotPassword />} />
                <Route path="password/reset/:token" element={<PasswordReset />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path="/feed/:tab" element={<Feed />} />
                <Route path="/collection/all" element={<AllCollection />} />
                <Route path="/collection/:id" element={<Collection />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;