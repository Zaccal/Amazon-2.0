import { ReactElement } from 'react'

type TypeSizeContainer =
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl'
	| '6xl'
	| '7xl'
	| 'lg'
	| 'md'
	| 'sm'

interface IContainer {
	children?: ReactElement | ReactElement[]
	size?: TypeSizeContainer
	className?: string
}

const Container = ({ children, size, className }: IContainer) => {
	return (
		<div className={`${className} max-w-${size || 'xl'} px-4 mx-auto`}>
			{children}
		</div>
	)
}

export default Container
