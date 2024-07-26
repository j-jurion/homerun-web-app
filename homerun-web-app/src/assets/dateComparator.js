export const compareToToday = (date) => {
    const today = new Date();
    const dateFormat = new Date(Date.parse(date));

    if (dateFormat.getFullYear() > today.getFullYear()) {
        return 1
    } else if (dateFormat.getFullYear() < today.getFullYear()) {
        return -1
    }

    // Years are equal

    if (dateFormat.getMonth() > today.getMonth()) {
        return 1
    } else if (dateFormat.getMonth() < today.getMonth()) {
        return -1
    }

    // Mongths are equal
    
    if (dateFormat.getDate() > today.getDate()) {
        return 1
    } else if (dateFormat.getDate() < today.getDate()) {
        return -1
    } else {
        return 0
    }
}