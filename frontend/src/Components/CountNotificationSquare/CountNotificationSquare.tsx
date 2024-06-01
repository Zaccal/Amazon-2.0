interface ICountNotificationSquare {
	count: number
}

const CountNotificationSquare = ({ count }: ICountNotificationSquare) => {
	return (
		<>
			<div className="absolute bg-accent flex items-center justify-center w-4 h-4 -right-2 -top-2 z-10 rounded-full">
				<span className="text-sm font-bold">
					{count > 99 ? '99+' : count}
				</span>
			</div>
		</>
	)
}

export default CountNotificationSquare
