import type { PersonnelInfoType } from '@/types'
import { arrayDecoder } from '@/utils'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useDecodeUrl = () => {
	const [params] = useSearchParams()
	const [personnelArray, setPersonnelArray] = useState<PersonnelInfoType[]>([])

	useEffect(() => {
		const encodedInfo = params.get('encodedInfo')
		if (!encodedInfo) return
		setPersonnelArray(arrayDecoder<PersonnelInfoType>(encodedInfo))
	}, [])

	return { personnelArray }
}