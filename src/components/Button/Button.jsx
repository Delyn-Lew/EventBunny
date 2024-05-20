function Button({ children, onClick, type }) {
	return (
		<button
			className="transition-all drop-shadow-lg bg-white border-2 border-transparent p-2 px-5 rounded-md hover:border-slate-300 hover:rounded-lg active:bg-slate-300 focus-visible:bg-slate-300 shadow-inner cursor-pointer text-center font-medium text-slate-700"
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
}

export default Button;
