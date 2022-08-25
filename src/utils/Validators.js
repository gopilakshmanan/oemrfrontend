import moment from 'moment'
const Validators = {
    anyOneCheckboxRequired: {
        message: 'This field is required.',
        rule: (val, params, validator) => {
            return params[0] === 'true'
        },
        required: true
    },
    fromTimeToTimeRequired: {
        message: 'This field is required.',
        rule: (val, params, validator) => {
            return (params[0].toString().trim().length + params[1].toString().trim().length) > 0
        },
        required: true
    },
    fromTimeToTimeIsValid: {
        message: 'This field is invalid.',
        rule: (val, params, validator) => {
            if (params[0].toString().trim().length === 5 && params[1].toString().trim().length === 5) {
                let beginningTime = moment(params[0].replace('`',':'), 'HH:mm')
                let endTime = moment(params[1].replace('`',':'), 'HH:mm')
                return beginningTime.isBefore(endTime)
            } else {
                return false
            }
        }
    },
    maxLength: {
        message: 'This field shall be less than :values in length.',
        rule: (val, params, validator) => {
            return val.length <= params
        },
        messageReplace: (message, params) => message.replace(':values', params),
    }
}

export const Messages =  {
    required: 'This value is required.',
    anyOneCheckboxRequired: 'This value is required.',
    fromTimeToTimeRequired: 'This value is required.',
    not_in: 'This value is invalid.',
    fromTimeToTimeIsValid: 'This value is invalid.',
    min: 'This value is invalid.',
    max: 'This value is invalid.',
}

export const ErrorMessageClassName = 'col-sm-12 px-0 text-danger'

export default Validators