import Config from "../../config/Config.json"

const Thankyou = () => {
    return (
        <section>
            <h1>Thank you</h1>
            <br />
            <p>Thank you for booking an appointment.</p>
            <p>Please be at the facility 10 minutes before the appointment.</p>
            <p>In case you are unable to make the appointment, please inform us by calling <a href={'tel:' + Config.contactPhone}>{Config.contactPhone}</a> or email us at <a href={'mailto:' + Config.contactEmail}>{Config.contactEmail}</a></p>
        </section>
    )
}

export default Thankyou