const areDatesEqual = (date1, date2) => {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        return true;
    }

    return false;
}


// https://stackoverflow.com/questions/8224459/how-to-create-a-date-object-from-string-in-javascript
export const getFormattedDate = (value) => {
    const timeStamp = Date.parse(value);
    const date = new Date(timeStamp);
    if (areDatesEqual(date, new Date())) {
        return `${date.getHours()}:${date.getMinutes()}`;
    } else {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
}