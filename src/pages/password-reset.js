import { useEffect } from "react";
import { PageTitle } from "src/components/common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmPassword, setEmail, setPassword } from "src/redux/slices/forgotPassword.slice";
import { submitReset } from "src/redux/actions/forgotPassword.action";

import Layout from "src/components/layouts/frontend/Layout";
import BlockLoader from "src/components/common/BlockLoader";
import { useNavigate, useParams } from "react-router-dom";

export default function PasswordReset() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useParams();
    const { isLoading, email, password, confirmPassword } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        PageTitle({
            title: "Password Reset"
        });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(submitReset(token)).then((response) => {
            navigate("/", { replace: true });
        }).catch((error) => {
            //
        });
    };

    const onChangeEmail = (event) => {
        dispatch(setEmail(event.target.value));
    };

    const onChangePassword = (event) => {
        dispatch(setPassword(event.target.value));
    };

    const onChangeConfirmPassword = (event) => {
        dispatch(setConfirmPassword(event.target.value));
    };

    return (
        <Layout>
            <BlockLoader blocking={isLoading} className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Reset Password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                value={email}
                                onChange={onChangeEmail}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="••••••••"
                                value={password}
                                onChange={onChangePassword}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password-confirmation" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input
                                type="password"
                                id="password-confirmation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
                    </form>
                </div>
            </BlockLoader>
        </Layout>
    );
};