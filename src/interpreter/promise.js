export function promiseObject(value) {
    return {
        state : "fulFilled",
        value : value,
        callbacks : []
    }
}