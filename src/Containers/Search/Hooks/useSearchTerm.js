import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useSearchTerm = () => {
  const storedSearchTerm = useSelector(state => {
    return state.search.searchTerm
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log(storedSearchTerm)
    setSearchTerm(storedSearchTerm)
  }, [storedSearchTerm])

  return searchTerm
}
