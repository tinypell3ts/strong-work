type ButtonProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'submit';
};

export default function Button({ children, onClick, ...rest }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            {...rest}
            className="border px-5 py-2 my-5 mx-2 text-white rounded-md opacity-75 hover:opacity-100"
        >
            {children}
        </button>
    );
}
