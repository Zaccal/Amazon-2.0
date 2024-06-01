const Thanks = () => {
	return (
		<div className="mx-auto mt-10">
			<h1 className="text-center">Thanks for order!</h1>
			<p className="text-center">
				You can see your orders{' '}
				<a
					className="text-blue-500"
					href="http://localhost:5173/orders"
				>
					here
				</a>
			</p>
		</div>
	)
}

export default Thanks
