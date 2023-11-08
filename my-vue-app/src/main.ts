
import {
    format, 
    getDaysInMonth, 
    startOfMonth, 
    lastDayOfMonth, 
    getDay, 
    getDate,
    getWeekOfMonth

} from 'date-fns';

const clock = document.querySelector(".calendarContainer__clockContainer__clock")
const days = Array.from(document.querySelectorAll(".calendarContainer__calendar__listContainer__dateList__date"))
console.log("days element: ", days)
const monthElement = document.querySelector(".calendarContainer__calendar__Month")
const prevButton = document.getElementById("Prev")
const nextButton = document.getElementById("Next")

const date = new Date()
const today = getDate(date)
const week = getWeekOfMonth(date)
console.log("current week index: ", week) 
const month = format(date, "MMMM")
const daysInMonth = getDaysInMonth(date)
const firstDayOfMonth = getDay(startOfMonth(date))
const endOfMonth = getDay(lastDayOfMonth(date)) 
const lastDayOfLastMonth = getDate(startOfMonth(date).setHours(-1))
const weekLength = 7

console.log("amount of days in month: ", daysInMonth)
console.log("todays date: ", today)
console.log("first day of the month(day of week): ", firstDayOfMonth)
console.log("last day of the month(day of week): ", endOfMonth)
console.log("last date of the last month: ", lastDayOfLastMonth)

setInterval(() => clock.textContent = format(new Date(), "HH:mm:ss"), 1)

monthElement.textContent = month 

const createWeeksArray = (monthStart: number, prevMonthEnd: number, monthLength: number, weekLength:number) => {
    const daysArray = []
    
    for(let i = monthStart; i > 0; i--) {
        daysArray.push(" ")
    }
    
    for(let i = 1; i <= monthLength; i++) {
        daysArray.push(i)
    }
   
    const chunks = [];
        
    for (let i = 0; i < daysArray.length; i += weekLength) {
        const chunk = daysArray.slice(i, i + weekLength);
        chunks.push(chunk);
    }
    
    return chunks
}    

const weeksArray = createWeeksArray(firstDayOfMonth, lastDayOfLastMonth, daysInMonth, weekLength)

console.log("array of days: ", weeksArray)

const nubmerOfWeeks = weeksArray.length

console.log("amount of weeks: ", nubmerOfWeeks)

let currWeekIndex = week -1

days.forEach((day, i) => day.textContent = `${weeksArray[currWeekIndex][i]}`)

nextButton.addEventListener("click", () => {
    currWeekIndex = currWeekIndex < nubmerOfWeeks -1 ? currWeekIndex + 1 : currWeekIndex
    days.forEach((day, i) => {
        day.textContent =  weeksArray[currWeekIndex][i] === undefined ? " " : `${weeksArray[currWeekIndex][i]}`
        console.log(currWeekIndex)
        })
    })

prevButton.addEventListener("click", () => {
    currWeekIndex = currWeekIndex > 0 ? currWeekIndex -1 : currWeekIndex
    days.forEach((day, i) => day.textContent = `${weeksArray[currWeekIndex][i]}`)
    console.log(currWeekIndex)
})

