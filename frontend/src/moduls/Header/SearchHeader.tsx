import { Input } from '@nextui-org/react'
import { KeyboardEvent, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'

const SearchHeader = () => {
	const { searchTerm } = useTypedSelector(state => state.search)
	const [searchValue, setSearchValue] = useState(searchTerm)
	const { onChangeSearch } = useActions()

	const searchHandler = (
		event: KeyboardEvent<HTMLInputElement> | KeyboardEvent
	) => {
		if (event.key === 'Enter') {
			onChangeSearch(searchValue)
		}
	}

	return (
		<>
			<Input
				classNames={{
					base: 'w-full h-10',
					mainWrapper: 'h-full',
					input: 'text-small',
					inputWrapper:
						'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
				}}
				placeholder="Type to search..."
				size="sm"
				value={searchValue}
				onChange={event => {
					setSearchValue(event.target.value)
				}}
				onKeyDown={searchHandler}
				startContent={<CiSearch size={18} />}
				type="search"
			/>
		</>
	)
}

export default SearchHeader
