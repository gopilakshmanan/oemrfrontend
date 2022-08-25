import _ from 'lodash'

const ValidationMethods = {
    required: (field, value) => {
        if (!value.toString().trim().length) {
            return `This ${field} field is required.`
        }
    },
    isTimeOnly: (field, value) => {
        const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (value.toString().trim().length) {
            if (!re.test(value)) {
                return `Enter Number Only.`
            }
        }
    },
    requireddrop: (field, value) => {
        if (value === "0" || value === "-1") {
            return `This ${field} field is required.`
        }
    }
}

export const ElementsToValidate = (form) => {
    const formElements = document.getElementById(form)
    return formElements.querySelectorAll('[validations]')
}

export const Validate = (element, errors) => {
    const target = element
    const field = target.name
    const value = target.value
    let validations = element.getAttribute('validations')
    validations = validations.split(',')

    for (let validation of validations) {
        validation = validation.split(':')
        const rule = validation[0]
        const error = validationMethods[rule](field, value)
        errors[field] = errors[field] || {}
        if (error) {
            document.getElementById(field).style.borderColor = "red"
            errors[field][rule] = error
        } else {
            document.getElementById(field).style.borderColor = "#ced4da"
            if (_.isEmpty(errors[field])) {
                delete errors[field]
            } else {
                delete errors[field][rule]
            }
        }
    }

    return errors
}