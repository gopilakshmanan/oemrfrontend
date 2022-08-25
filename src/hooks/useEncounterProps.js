import { useContext } from "react"
import EncounterPropsContext from "../context/EncounterPropsProvider"

const useEncounterProps = () => {
    return useContext(EncounterPropsContext)
}

export default useEncounterProps