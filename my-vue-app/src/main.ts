
import {
    format, 
    getDaysInMonth, 
    startOfMonth, 
    lastDayOfMonth, 
    getDay, 
    getDate,
    getWeekOfMonth,
    nextWednesday

} from 'date-fns';

const clock = document.querySelector(".calendarContainer__clockContainer__clock")
const days = Array.from(document.querySelectorAll(".calendarContainer__calendar__listContainer__dateList__date"))
console.log("days element: ", days)
const monthElement = document.querySelector(".calendarContainer__calendar__Month")
const prevButton = document.getElementById("Prev")
const nextButton = document.getElementById("Next")

// const date = new Date()
const date = new Date(2023, 9,9)
const today = getDate(date)
const month = format(date, "MMMM")
const daysInMonth = getDaysInMonth(date)
const firstDayOfMonth = getDay(startOfMonth(date)) +1
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
        console.log("first loop: ",i, prevMonthEnd -i + 1) 
        daysArray.push(prevMonthEnd - i +1)
    }
    
    for(let i = 1; i <= monthLength; i++) {
        daysArray.push(i)
    }

    for(let i = endOfMonth; i < 6; i++) {
        daysArray.push(i - endOfMonth + 1)
    }
   
    const chunks = [];
        
    for (let i = 0; i < daysArray.length; i += weekLength) {
        const chunk = daysArray.slice(i, i + weekLength);
        chunks.push(chunk);
    }
    
    return chunks
} 

createWeeksArray(firstDayOfMonth, lastDayOfLastMonth, daysInMonth, weekLength)

const weeksArray = createWeeksArray(firstDayOfMonth, lastDayOfLastMonth, daysInMonth, weekLength)

console.log("array of days: ", weeksArray)



const nubmerOfWeeks = weeksArray.length

console.log("amount of weeks: ", nubmerOfWeeks)

const week = weeksArray.findIndex((week) => week.includes(today))

let currWeekIndex = week

console.log(currWeekIndex)

const appendDates = (array, index) => {
    
    const dateList = document.querySelector(".calendarContainer__calendar__listContainer__dateList")
    const newDateList = document.createElement("ul")
    newDateList.classList.add("calendarContainer__calendar__listContainer__dateList")

    array[index].forEach((day) => {
        const date = document.createElement("li")
        date.classList.add("calendarContainer__calendar__listContainer__dateList__date")
        const node = document.createTextNode(`${day}`)
        date.appendChild(node)
    
        if(currWeekIndex < week || currWeekIndex === week && date.textContent as number < today) {
            date.style.color = "gray"
        }
    
        if(date.textContent === `${today}`) {
            date.style.color = "DarkGreen"
        }
    
        if(date.textContent as number > today && date.textContent as number <= today + 7) {
            date.style.color = "#7FFF00"
        }
    
        newDateList.appendChild(date)
    })

    dateList.replaceWith(newDateList)
} 

appendDates(weeksArray, currWeekIndex)

nextButton.addEventListener("click", () => {
    currWeekIndex = currWeekIndex < nubmerOfWeeks -1 ? currWeekIndex + 1 : currWeekIndex
    console.log(currWeekIndex)
    appendDates(weeksArray, currWeekIndex) 
})


prevButton.addEventListener("click", () => {
    currWeekIndex = currWeekIndex > 0 ? currWeekIndex -1 : currWeekIndex
        console.log(currWeekIndex)
    appendDates(weeksArray, currWeekIndex)
})



















































