import padTime from "../../helpers/padTime";

// e.g. 90 to "01:30"
const formatMinutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;

    return `${padTime(hours)}:${padTime(min)}`;
};

// e.g. "01:30" to 90
const parseStringToMinutes = (string) => {
    const parts = string.split(":");
    if (parts.length === 2) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        return hours * 60 + minutes;
    } else {
        return 0;
    }
};

export { formatMinutesToString, parseStringToMinutes };
