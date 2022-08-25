const SessionTimedout = () => {
    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Oops!</h1>
            </div>

            <div>
                <h5>Your session seems to be timed-out. Please login again.</h5>
            </div>
        </div>
    )
}

export default SessionTimedout