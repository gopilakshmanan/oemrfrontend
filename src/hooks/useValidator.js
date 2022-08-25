import { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator'

const Messages = {
    required: 'This value is required.',
    min: 'This value is invalid.',
    max: 'This value is invalid.',
}

const useValidator = () => {
    const [show, setShow] = useState(false)
    const validator = new SimpleReactValidator({
        className: 'col-sm-12 px-0 text-danger',
        messages: Messages
    })

    if (show) {
        validator.showMessages()
    }

    return [validator, setShow]
}

export default useValidator