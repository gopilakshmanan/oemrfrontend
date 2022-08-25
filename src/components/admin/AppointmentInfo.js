import Config from '../../config/Config.json'
import { format } from 'date-fns'

const AppointmentInfo = ({ apptDt, apptTm, rov, providername }) => {
    return (
        <section className='row border-bottom border-dark bg-light py-2'>
            <div className='col-md-3'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Appointment Date</div>
                    <div className='text-center'>{format(new Date(apptDt), Config.dateFormat)}</div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Appointment Time</div>
                    <div className='text-center'>{apptTm.substring(0, 5)}</div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Reason for Visit</div>
                    <div className='text-center'>{rov}</div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Assigned Provider</div>
                    <div className='text-center'>{providername}</div>
                </div>
            </div>
        </section>
    )
}

export default AppointmentInfo