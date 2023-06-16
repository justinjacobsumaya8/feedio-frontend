import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ children }) => {
    const dropdownRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, setVisible]);

    return (
        <div ref={dropdownRef} className="relative">
            {children({ visible, setVisible })}
        </div>
    );
};

Dropdown.Button = ({ visible, setVisible, children, className }) => {
    return (
        <button type="button" className={className} onClick={() => setVisible(!visible)}>
            {children}
        </button>
    )
};

Dropdown.Actions = ({ visible, children, className }) => {
    return (
        <div className={`absolute right-0 rounded-lg border border-lavender-gray bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${className ?? ""} ${!visible ? 'hidden' : ''
            }`}
        >
            {children}
        </div>
    )
};

export default Dropdown;
