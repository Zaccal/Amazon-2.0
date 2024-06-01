import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { EnumProductSort } from '../../service/Product/Porduct.types'
import { TypeSetState } from '../../types/setState.type'

interface ISortDropdown {
	selectedSort: EnumProductSort
	setSelectedSort: TypeSetState<EnumProductSort>
}

const SortDropdown = ({ selectedSort, setSelectedSort }: ISortDropdown) => {
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="bordered" className="capitalize">
					{selectedSort}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Single selection example"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selectedSort}
				onSelectionChange={(key: { anchorKey: EnumProductSort }) =>
					setSelectedSort(key.anchorKey)
				}
			>
				<DropdownItem key={EnumProductSort.HIGH_PRICE}>
					High-price
				</DropdownItem>
				<DropdownItem key={EnumProductSort.LOW_PRICE}>
					Low-price
				</DropdownItem>
				<DropdownItem key={EnumProductSort.NEWEST}>newest</DropdownItem>
				<DropdownItem key={EnumProductSort.OLDEST}>oldest</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}

export default SortDropdown
