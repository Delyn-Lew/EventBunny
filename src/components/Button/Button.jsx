function Button({ children, onClick, type, disabled }) {
	return (
		<button
			className="transition-all drop-shadow-lg bg-white border-2 border-transparent p-2 px-5 rounded-md hover:border-slate-300 hover:rounded-lg active:bg-slate-300 focus-visible:bg-slate-300 shadow-inner cursor-pointer text-center font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
