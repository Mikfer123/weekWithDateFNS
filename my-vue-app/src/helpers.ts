
export const getMonthLength = (year: number, month: number) => new Date(year, month, 0).getDate()
export const getFirstWeekDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()
export const getLastWeekDayOfMonth = (year: number, month: number, lastDateOfMonth: number) => new Date(year, month, lastDateOfMonth).getDay()
export const getDateDetails = (date:Date) => {
    return {
        todaysDate: date.getDate(),
        currentYear: date.getFullYear(),
        currentMonth: date.getMonth()
    }
}
export const addToClass = (cell: Element, classname: string) => cell.classList.add(classname)