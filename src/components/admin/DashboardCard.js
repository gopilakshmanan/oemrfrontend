import useHasRole from "../../hooks/useHasRole"
import Spinner from 'react-bootstrap/Spinner'
import useAuth from '../../hooks/useAuth'

const DashboardCard = ({ isLoading, data, status}) => {
    const { auth } = useAuth()
    const hasRole = useHasRole()
    const borderClassName = hasRole('MD') ? 'border-left-success' : 'border-left-primary'
    const title = status === '-'
        ? "Today's Appointments"
        : status === '@'
            ? 'Checked-In' 
            : status === '>'
                ? 'Checked-Out' : 'No Show'

    const count = status === "-" 
        ? data.length 
        : hasRole('MD') 
            ? data.filter(e => e.pc_apptstatus === '@' && e.pc_aid === auth.id).length 
            : data.filter(e => e.pc_apptstatus === status).length
    
    return (
        <div className={"mb-4 col-md-6 col-lg-3 " + (hasRole('MA') || hasRole('ADMIN') ? "d-block" : "d-none")}>
            <div className={"card shadow h-100 py-2 " + borderClassName}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                {title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {isLoading
                                    ? <Spinner animation="border" size="sm" as="span" />
                                    : count}
                            </div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard