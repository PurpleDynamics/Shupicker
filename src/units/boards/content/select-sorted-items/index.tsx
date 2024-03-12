import { URL_PARAM_PERSONNEL } from '@/constants'
import { useManageUrlArray } from '@/hooks'
import { DIRECTION_COLUMN } from '@/libs/styled-components/css-utils'
import { COLOR } from '@/libs/styled-components/reference-tokens'
import { PersonnelType } from '@/types'
import { BoardBase, BoardHeader } from '@/units/boards'
import { faCheck, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import styled from 'styled-components'
import { SelectableCard } from './components'

const SelectSortedItems = () => {
	const [selectedIdArray, setSelectedIdArray] = useState<Array<number>>([])
	const { getArray: getPersonnelArray } = useManageUrlArray<PersonnelType>(URL_PARAM_PERSONNEL)

	const onHandleSelectedIdArray = (id: number) => {
		if (selectedIdArray.includes(id)) {
			const newArray = selectedIdArray.filter((elem) => elem !== id)
			setSelectedIdArray(newArray)
		} else {
			setSelectedIdArray((prev) => [...prev, id])
		}
	}

	return (
		<BoardBase>
			<BoardHeader
				sectionName="👆 정렬 & 선택"
				iconButtonDataArray={[
					{
						iconData: faSortAmountDownAlt
					},
					{
						iconData: faCheck,
						hoverBgColor: COLOR.system.confirm,
						hoverIconColor: COLOR.grayScale[150]
					}
				]}
			/>
			<S.VerticalScrollContainer>
				{getPersonnelArray().map((personnel) => {
					return (
						<SelectableCard
							key={personnel.id}
							isSelected={selectedIdArray.includes(personnel.id)}
							{...{ personnel }}
							onClickCard={() => {
								onHandleSelectedIdArray(personnel.id)
							}}
						/>
					)
				})}
			</S.VerticalScrollContainer>
		</BoardBase>
	)
}

export default SelectSortedItems

const VerticalScrollContainer = styled.div`
	${DIRECTION_COLUMN}
	gap: 1rem;

	width: 100%;
	height: 34vh;
	max-height: 100%;

	overflow-y: scroll;
	overflow-x: hidden;
`

const S = {
	VerticalScrollContainer
}
