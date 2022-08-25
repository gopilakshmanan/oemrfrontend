import React, { useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { format } from 'date-fns'
import useDefaultGlobalFilter from '../../hooks/useDefaultGlobalFilter'
import TablePagnation from '../layout/TablePagnation'
import Config from '../../config/Config.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSort, faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons"
import * as AppointmentConstants from '../../constants/AppointmentConstants'
import { ColumnFilter } from '../../constants/TableConstants'
import * as CommonConstants from '../../constants/CommonConstants'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import useEncounterProps from '../../hooks/useEncounterProps'

const WaitingRoom = ({ isLoading, data }) => {
    const defaultColumnFilter = ColumnFilter
    const GlobalFilter = useDefaultGlobalFilter()
    const navigate = useNavigate()
    const { setEncProps } = useEncounterProps()

    const handleCSClick = (row) => {
        navigate('/cs', { state: {
            aid: row.original.pc_eid,
            puuid: row.original.puuid
        } })
    }
    const handleEClick = (row) => {
        setEncProps({
            aid: row.original.aid,
            pid: row.original.pid,
            puuid: row.original.puuid,
            eid: row.original.eid,
            euuid: row.original.euuid,
        })
        navigate('/enc', { state: {
            apptDt: row.original.pc_eventDate,
            apptTm: row.original.pc_startTime,
            rov: row.original.pc_hometext,
            providername: Config.displayPersonNameFormat.replace('fname', row.original.providerlname).replace("lname", row.original.providerlname),
        } })
    }

    const columns = useMemo(() => [
        {
            Header: 'Time',
            accessor: 'pc_startTime',
            Cell: ({ value }) => {
                return value.substring(0, 5)
            },
            sortType: (RowA, RowB, columnId, desc) => {
                let a = new Date()
                a.setHours(RowA.values[columnId].split(':')[0])
                a.setMinutes(RowA.values[columnId].split(':')[1])
                let b = new Date()
                b.setHours(RowB.values[columnId].split(':')[0])
                b.setMinutes(RowB.values[columnId].split(':')[1])
                return a - b
            },
            Filter: defaultColumnFilter,
        },
        {
            Header: 'Patient Name',
            accessor: 'fname',
            Cell: ({ row }) => {
                return Config.displayPersonNameFormat.replace('fname', row.original.fname).replace("lname", row.original.lname)
            },
            Filter: defaultColumnFilter,
        },
        {
            Header: 'Pt. Date of Birth',
            accessor: 'DOB',
            Cell: ({ value }) => {
                return format(new Date(value), Config.dateFormat)
            },
            sortType: (RowA, RowB, columnId, desc) => {
                return new Date(RowA.values[columnId]) - new Date(RowB.values[columnId])
            },
            Filter: defaultColumnFilter,
        },
        {
            Header: 'Pt. Phone',
            accessor: 'phone_cell',
            Filter: defaultColumnFilter,
        },
        {
            Header: 'Status',
            accessor: 'pc_apptstatus',
            Cell: ({ value }) => {
                return AppointmentConstants.GET_LABEL(value)
            },
            sortType: (RowA, RowB, columnId, desc) => {
                return AppointmentConstants.GET_LABEL(RowA.values[columnId]).localeCompare(AppointmentConstants.GET_LABEL(RowB.values[columnId]))
            },
            Filter: ({ filter, onChange }) => {
                return <select className='form-control'
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ""}
                >
                    <option value=''>All</option>
                    {
                        AppointmentConstants.OPTIONS.map((opt, index) => {return <option key={index} value={opt.key}>{opt.value}</option>})
                    }
                </select>
            },
        },
        {
            Header: 'Reason for Visit',
            accessor: 'pc_hometext',
            Filter: defaultColumnFilter,
        },
        {
            Header: 'Provider Name',
            accessor: 'providerfname',
            Cell: ({ row }) => {
                return Config.displayPersonNameFormat.replace('fname', row.original.providerfname).replace("lname", row.original.providerlname)
            },
            Filter: defaultColumnFilter,
        },
        // eslint-disable-next-line
    ], [])
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: 'action',
                Header: <div className='text-center'>Action</div>,
                Cell: ({ row }) => (
                    <>
                        <button className='btn btn-primary mr-1 mb-1' onClick={() => handleCSClick(row)}>
                            CS
                        </button>
                        <button className='btn btn-primary' onClick={() => handleEClick(row)} disabled={row.original.pc_apptstatus!=='@'}>
                            E
                        </button>
                    </>
                ),
            }
        ])
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        gotoPage,
        pageCount,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { 
            hiddenColumns: ['pc_eid'],
            sortBy: [
                {
                    id: 'pc_startTime',
                    desc: false
                }
            ]
        },
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        tableHooks,
        usePagination
    )
    const { globalFilter, pageIndex, pageSize } = state

    return (
        <div className='waiting-room'>
            <CommonConstants.MultiSortTip />
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table className='table table-striped table-hover border-bottom' {...getTableProps()}>
                <thead className="thead-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th key={column.id}>
                                    <div className='noselect' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <>
                                            {column.canSort 
                                                ? column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <span className='ml-1'><FontAwesomeIcon icon={faSortDesc} /></span>
                                                        : <span className='ml-1'><FontAwesomeIcon icon={faSortAsc} /></span>
                                                    : <span className='ml-1'><FontAwesomeIcon icon={faSort} /></span>
                                                : null}
                                        </>
                                    </div>

                                    <>{column.canFilter ? column.render('Filter') : null}</>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    {isLoading
                        ? <tr><td colSpan={8} className='text-center'><div className='d-flex justify-content-center'><Spinner animation="border" size="sm" as="span" /></div></td></tr>
                            : data.length === 0
                                ? <tr><td colSpan={8} className='text-center'>No record(s) to display</td></tr>
                                : null}
                </tbody>
            </table>
            <TablePagnation 
                pageIndex={ pageIndex }
                pageOptions={ pageOptions }
                gotoPage={gotoPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
            />
        </div>
    )
}

export default WaitingRoom