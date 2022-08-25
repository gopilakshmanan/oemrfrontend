import { useMemo } from "react"

export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <input
            value={filterValue || ''}
            className='form-control'
            placeholder={'Search ' + column.Header}
            onChange={e => setFilter(e.target.value)}
            style={column.minWidth ? {minWidth:column.minWidth} : null}
        />
    )
}

export const ColumnsFilter = () => {
    const defaultColumnsFilter = useMemo(
        () => ({
            Filter: ColumnFilter
        }),
        []
    )

    return defaultColumnsFilter
}