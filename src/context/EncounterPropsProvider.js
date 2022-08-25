import { createContext, useState } from "react"
import { useLocalStorage } from "../hooks/useStorage"

const EncounterPropsContext = createContext({})

export const EncounterPropsProvider = ({ children }) => {
    const [encProps, setEncProps] = useLocalStorage('enc-props',{})

    return (
        <EncounterPropsContext.Provider value={{ encProps, setEncProps }}>
            {children}
        </EncounterPropsContext.Provider>
    )
}

export default EncounterPropsContext