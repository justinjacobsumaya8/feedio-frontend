export default function BlockLoader(props) {
    return (
        <>
            <div className={props.className}>
                <div className={`block-ui ${props.classNameBlockUi}`}>
                    {props.children}
                    {props.blocking && (
                        <div className="block-ui-container">
                            <div className="block-ui-overlay"></div>
                            <div className="block-ui-message-container">
                                <div className="block-ui-message">
                                    <div className="block-loader w-8 h-8 text-blue-500" role="status">
                                        <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
