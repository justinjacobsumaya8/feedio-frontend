import { useEffect } from "react";
import { PageTitle } from "src/components/common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "src/redux/slices/forgotPassword.slice";
import { sendResetEmail } from "src/redux/actions/forgotPassword.action";

import Layout from "src/components/layouts/frontend/Layout";
import BlockLoader from "src/components/common/BlockLoader";

export default function ForgotPassword() {
    const dispatch = useDispatch();

    const { isLoading, email } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        PageTitle({
            title: "Password Reset"
        });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(sendResetEmail()).then((response) => {
            //
        }).catch((error) => {
            //
        });
    };

    const onChangeEmail = (event) => {
        dispatch(setEmail(event.target.value));
    };

    return (
        <Layout>
            <BlockLoader blocking={isLoading} className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Forgot password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <input
                                type="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Email Address"
                                value={email}
                                onChange={onChangeEmail}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Password Reset Link</button>
                    </form>
                </div>
            </BlockLoader>
        </Layout>
    );
};