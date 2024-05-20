function SmallButton({ children, onClick, type, disabled }) {
	return (
		<button
			className="transition-all drop-shadow-lg bg-white border-2 border-transparent rounded-md hover:border-slate-300 hover:rounded-lg active:bg-slate-300 focus-visible:bg-slate-300 shadow-inner cursor-pointer text-center font-medium text-slate-700 text-xs disabled:cursor-not-allowed disabled:opacity-50"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default SmallButton;
