const monthNames = [
    "", // index 0 not used
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export function getMonthRangeLabelWithName(
    startMonth: number,
    startYear: number,
    endMonth: number,
    endYear: number
): string {
    const start = `${monthNames[startMonth]} (${String(startMonth).padStart(2, "0")}/${startYear})`;
    const end = `${monthNames[endMonth]} (${String(endMonth).padStart(2, "0")}/${endYear})`;
    return `${start} - ${end}`;
}

export function getMonthRangeLabel(startMonth: number, startYear: number, endMonth: number, endYear: number): string {
    return `${startMonth.toString().padStart(2, "0")}/${startYear} - ${endMonth.toString().padStart(2, "0")}/${endYear}`;
}

