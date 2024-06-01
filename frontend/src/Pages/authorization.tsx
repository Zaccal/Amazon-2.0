/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Input, Link } from '@nextui-org/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import useActions from '../hooks/useActions'

interface IInput {
	email: string
	password: string
}

const authorization = () => {
	const nav = useNavigate()
	const [isRegister, setIsRegister] = useState(true)
	const [AuthErrors, setAuthErrors] = useState([])
	const actions = useActions()
	const location = useLocation()
	const fromPage = location.state?.from || '/'
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IInput>()

	const onSubmit: SubmitHandler<IInput> = async data => {
		try {
			if (isRegister) {
				try {
					actions.register(data)
				} catch (error) {
					console.log(error)
				}
			} else {
				actions.login(data)
			}
			nav(fromPage)
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="shadow-xl mx-auto mt-24 rounded-lg bg-primary border px-6 py-3 max-w-2xl"
			>
				<h1 className="mb-4 text-xl font-bold">
					{isRegister ? 'Sign in' : 'Log in'}
				</h1>
				<Input
					{...register('email', {
						required: true,
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'invalid email address'
						}
					})}
					type="email"
					label="Email"
					isInvalid={errors.email?.message ? true : false}
					errorMessage={errors.email?.message}
				/>
				<Input
					{...register('password', {
						required: true,
						minLength: {
							value: 6,
							message:
								'Password must not be less than 6 characters '
						}
					})}
					isInvalid={errors.password?.message ? true : false}
					type="password"
					label="Password"
					errorMessage={errors.password?.message}
					className="my-4"
				/>
				<Button type="submit" className="w-full" variant="bordered">
					{isRegister ? 'Sign in' : 'Log in'}
				</Button>
				<Link
					onClick={() => setIsRegister(prev => !prev)}
					className="text-text mt-4 cursor-pointer"
				>
					{isRegister
						? 'Already have account?'
						: "Don't have account?"}
				</Link>
			</form>
		</div>
	)
}

export default authorization
