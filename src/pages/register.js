import { PageTitle } from "src/components/common/PageTitle";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, setConfirmPassword, setEmail, setFullName, setHasAgreedToTerms, setPassword } from "src/redux/slices/registration.slice";
import { register } from "src/redux/actions/registration.action";

import Layout from "src/components/layouts/frontend/Layout";
import BlockLoader from "src/components/common/BlockLoader";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isLoading,
        fullName,
        email,
        password,
        confirmPassword,
        hasAgreedToTerms
    } = useSelector((state) => state.registration);

    useEffect(() => {
        PageTitle({
            title: "Register"
        });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(register()).then((response) => {
            dispatch(reset());
            navigate("/", { replace: true });
        }).catch((error) => {
            //
        });
    };

    const onChangeFullName = (event) => {
        dispatch(setFullName(event.target.value));
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

    const onChangeHasAgreedToTerms = (event) => {
        const { checked: isChecked } = event.target;
        dispatch(setHasAgreedToTerms(isChecked));
    };

    return (
        <Layout>
            <BlockLoader blocking={isLoading} className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="full-name" className="block mb-2 text-sm font-medium text-gray-900">Your full name</label>
                            <input
                                type="text"
                                id="full-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={onChangeFullName}
                                required
                            />
                        </div>
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
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={password}
                                onChange={onChangePassword}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                                required
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                    value={hasAgreedToTerms}
                                    onChange={onChangeHasAgreedToTerms}
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500">I accept the <button type="button" className="font-medium text-primary-600 hover:underline">Terms and Conditions</button></label>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline">Login here</Link>
                        </p>
                    </form>
                </div>
            </BlockLoader>
        </Layout>
    );
};
