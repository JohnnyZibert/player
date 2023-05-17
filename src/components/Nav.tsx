import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch } from 'react'

interface IProps {
  isOpenLibrary: boolean
  setIsOpenLibrary: Dispatch<boolean>
}

export const ToggleLibrary = ({ isOpenLibrary, setIsOpenLibrary }: IProps) => {
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setIsOpenLibrary(!isOpenLibrary)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  )
}
