const TablePagnation = ({ pageIndex , pageOptions, gotoPage, pageSize, setPageSize, previousPage, nextPage, canPreviousPage, canNextPage, pageCount }) => {
    return (
        <div className='d-flex justify-content-between'>
            <div className="col-md">
                <div className="form-inline">
                    <span>
                        Page:{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                        {' | Show'}
                    </span>
                    <select className='form-control mx-1' value={pageSize} onChange={e => setPageSize(Number(e.target.value))} style={{textAlign:'right'}}>
                        {[5, 10, 25, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                    <span>
                        {' '} items per page
                    </span>
                </div>
            </div>
            <div className="col-md">
                <div className="justify-content-center form-inline">
                    <span>
                        Go to page: {' '}
                        <input
                            type='number'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                            style={{ width: '50px', textAlign:'right' }}
                            min={1}
                            max={pageSize + 1}
                            className='form-control'
                        />
                    </span>
                </div>
            </div>
            <div className="col-md">
                <div className="float-right">
                    <button className="btn btn-secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>First</button>
                    <button className="btn btn-secondary mx-1" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button className="btn btn-secondary mr-1" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button className="btn btn-secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last</button>
                </div>
            </div>
        </div>
    )
}

export default TablePagnation