import Alert from "../../common/Alert";

export default function Layout({ children }) {
    return (
        <main className="bg-gray-50">
            <Alert />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <button type="button" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2 rounded-lg" src="/images/feedio-logo.jpg" alt="logo" />
                    Feedio
                </button>
                {children}
            </div>
        </main>
    );
};