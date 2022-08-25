export const OPTIONS = [
    { key: '-', value: 'Booked' },
    { key: '@', value: 'Checked-In' },
    { key: '>', value: 'Checked-Out' },
    { key: '?', value: 'No-Show' },
]

export const GET_LABEL = (symbol) => {
    switch (symbol) {
        case '-':
            return 'Booked'
        case '@':
            return 'Arrived'
        case '>':
            return 'Checked-Out'
        case '?':
            return 'No-Show'
        default:
            return 'Unknown'
    }
}