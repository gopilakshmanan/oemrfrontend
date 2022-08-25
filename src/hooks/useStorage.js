import { useState, useEffect } from "react"

export const getLocalStorageValue = (key, defaultValue) => {
    const saved = localStorage.getItem(key)
    const initial = JSON.parse(saved)
    return initial || defaultValue
}

export const setLocalStorageValue = (key, defaultValue) => {
    localStorage.setItem(key, JSON.stringify(defaultValue))
}

export const clearLocalStorage = () => {
    localStorage.clear()
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getLocalStorageValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}


export const useRemoteStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getLocalStorageValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}