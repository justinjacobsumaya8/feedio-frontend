import Alert from "src/components/common/Alert";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <>
            <Alert />
            <div className="main-body relative">
                <Sidebar />
                <div className="flex h-screen pt-0 pl-0 lg:pl-72 transition-all 2xl:pl-72 static">
                    <div className="w-full overflow-y-auto px-[1em] lg:px-[10em] py-[4em]">{children}</div>
                </div>
            </div>
        </>
    );
};