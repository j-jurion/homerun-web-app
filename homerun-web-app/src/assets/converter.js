export const timeToString = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export const speedToKmph = (kilometersPerSeconds) => {
    return kilometersPerSeconds.toFixed(1);
}

export const paceToMin = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
}