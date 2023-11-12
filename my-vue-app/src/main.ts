
import {
    format, 
    getDaysInMonth, 
    startOfMonth, 
    lastDayOfMonth, 
    getDay, 
    getDate,
} from 'date-fns';

const clock = document.querySelector(".calendarContainer__clockContainer__clock")
const monthElement = document.querySelector(".calendarContainer__calendar__Month")
const prevButton = document.getElementById("Prev")
const nextButton = document.getElementById("Next")

const date = new Date()
// const date = new Date(2023, 11,9)
const today = getDate(date)
const month = format(date, "MMMM")
const daysInMonth = getDaysInMonth(date)
const newDay = getDay(startOfMonth(date)) === 0 ? 7 : getDay(startOfMonth(date))
const firstDayOfMonth = newDay -1
const endOfMonth = getDay(lastDayOfMonth(date)) 
const lastDayOfLastMonth = getDate(startOfMonth(date).setHours(-1))
const weekLength = 7

console.log("amount of days in month: ", daysInMonth)
console.log("todays date: ", today)
console.log("first day of the month(day of week): ", firstDayOfMonth)
console.log("last day of the month(day of week): ", endOfMonth)
console.log("last date of the last month: ", lastDayOfLastMonth)

setInterval(() => {
    if(clock) clock.textContent = format(new Date(), "HH:mm:ss"), 1
})

if(monthElement)monthElement.textContent = month 

const createWeeksArray = (monthStart: number, prevMonthEnd: number, monthLength: number, weekLength:number) => {
    const daysArray = []
    
    for(let i = monthStart; i > 0 ; i--) {
        console.log("first loop: ",i, prevMonthEnd -i + 1) 
        daysArray.push(prevMonthEnd - i +1)
    }
    
    for(let i = 1; i <= monthLength; i++) {
        daysArray.push(i)
    }

    if(endOfMonth !== 0) {
        for(let i = endOfMonth; i < weekLength; i++) {
            daysArray.push(i - endOfMonth + 1)
        }
    }
    
    const chunks = [];
        
    for (let i = 0; i < daysArray.length; i += weekLength) {
        const chunk = daysArray.slice(i, i + weekLength);
        chunks.push(chunk);
    }
    
    return chunks
} 

const arrayOfWeeks = createWeeksArray(firstDayOfMonth, lastDayOfLastMonth, daysInMonth, weekLength)

console.log("array of days: ", arrayOfWeeks)

const nubmerOfWeeks = arrayOfWeeks.length

console.log("amount of weeks: ", nubmerOfWeeks)

const currentWeek = arrayOfWeeks.findIndex((week) => week.includes(today))

let displayedWeek = currentWeek

console.log(displayedWeek)

const appendDates = (array: number[][], index: number) => {
    
    const dateList = document.querySelector(".calendarContainer__calendar__listContainer__dateList")
    const newDateList = document.createElement("ul")
    newDateList.classList.add("calendarContainer__calendar__listContainer__dateList")

    array[index].forEach((day) => {
        const dateCell = document.createElement("li")
        dateCell.classList.add("calendarContainer__calendar__listContainer__dateList__date")
        const node = document.createTextNode(`${day}`)
        dateCell.appendChild(node)
        const date = Number(dateCell.textContent)
    
        if(displayedWeek < currentWeek || displayedWeek === currentWeek && date < today) {
            dateCell.style.color = "gray"
        }
    
        if(date === today) {
            dateCell.style.color = "DarkGreen"
        }
    
        if(date > today && date <= today + 7) {
            dateCell.style.color = "#7FFF00"
        }
    
        newDateList.appendChild(dateCell)
    })

    if(dateList) dateList.replaceWith(newDateList)
} 

appendDates(arrayOfWeeks, displayedWeek)

if(nextButton) {
    nextButton.addEventListener("click", () => {
        displayedWeek = displayedWeek < nubmerOfWeeks -1 ? displayedWeek + 1 : displayedWeek
        console.log(displayedWeek)
        appendDates(arrayOfWeeks, displayedWeek) 
    })
}


if(prevButton) {
    prevButton.addEventListener("click", () => {
        displayedWeek = displayedWeek > 0 ? displayedWeek -1 : displayedWeek
        console.log(displayedWeek)
        appendDates(arrayOfWeeks, displayedWeek)
    })
}



















































