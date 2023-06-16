import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageTitle } from "src/components/common/PageTitle";
import { useDispatch, useSelector } from "react-redux";

import Layout from "src/components/layouts/frontend/Layout";
import BlockLoader from "src/components/common/BlockLoader";
import { login } from "src/redux/actions/authentication.action";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const passwordRef = useRef();

    const { isLoggingIn } = useSelector((state) => state.authentication);

    useEffect(() => {
        PageTitle({
            title: "Login"
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await dispatch(login(
                emailRef.current.value,
                passwordRef.current.value
            ));
            navigate(from, { replace: true });
        } catch (error) {
            //
        }
    };

    return (
        <Layout>
            <BlockLoader blocking={isLoggingIn} className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <Link to="/password/reset" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                        </p>
                    </form>
                </div>
            </BlockLoader>
        </Layout>
    );
}