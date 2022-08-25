import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

const useDefaultGlobalFilter = () => {
    const GlobalFilter = ({ filter, setFilter }) => {
        const [value, setValue] = useState(filter)
        const onChange = useAsyncDebounce(value => {
            setFilter(value || undefined)
        }, 1000)
        return (
            <div className='d-flex justify-content-end'>
                <input
                    value={value || ''}
                    placeholder='Search all fields...'
                    className='form-control'
                    onChange={e => {
                        setValue(e.target.value)
                        onChange(e.target.value)
                    }}
                />
            </div>
        )
    }

    return GlobalFilter
}

export default useDefaultGlobalFilter