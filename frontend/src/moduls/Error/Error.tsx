import { DefaultError } from '@tanstack/react-query'
import { MdReportGmailerrorred } from 'react-icons/md'

interface IError {
	error: DefaultError
}

const Error = ({ error }: IError) => {
	return (
		<div className="w-full py-64">
			<div className="">
				<MdReportGmailerrorred
					className="mx-auto mb-4 text-7xl"
					color="red"
				/>
				<h3 className="text-2xl text-center">
					Please restart page or check internet connection.
				</h3>
				<h1 className="text-3xl text-center text-text">
					{error.name}: {error.message}
				</h1>
			</div>
		</div>
	)
}

export default Error
