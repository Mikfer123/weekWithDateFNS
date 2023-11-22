
import {DAYS_IN_WEEK, MONTH_NAMES} from "./constants"
import {getMonthLength, getFirstWeekDayOfMonth, getLastWeekDayOfMonth, getDateDetails, addToClass} from "./helpers"

const dateListClassName = ".calendarContainer__calendar__listContainer__dateList"
const listContainerClassName = ".calendarContainer__calendar__listContainer"
const clockElement = document.querySelector(".calendarContainer__clockContainer__clock")
const monthElement = document.querySelector(".calendarContainer__calendar__Month")
const prevButton = document.getElementById("Prev")
const nextButton = document.getElementById("Next")

const currentDate = new Date()

const createClock = () => {
    const date = new Date() 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(() => {
    if(clockElement) clockElement.textContent = createClock()
}, 1)

if(monthElement)monthElement.textContent = MONTH_NAMES[getDateDetails(currentDate).currentMonth] 

const createArrayOfWeeks = (year: number, month: number, weekLength: number) => {
    const currentMonthLength = getMonthLength(year, month +1)
    const startFromMonday = getFirstWeekDayOfMonth(year, month) === 0 ? DAYS_IN_WEEK : getFirstWeekDayOfMonth(year, month)
    const firstWeekDayOfMonth = startFromMonday -1
    const lastWeekDayOfMonth = getLastWeekDayOfMonth(year, month, currentMonthLength)
    const lastMonthsLength = getMonthLength(year, month)

    const arrayOfMonthDays = []
    
    for(let i = firstWeekDayOfMonth; i > 0 ; i--) {
        arrayOfMonthDays.push(lastMonthsLength - i +1)
    }
    
    for(let i = 1; i <= currentMonthLength; i++) {
        arrayOfMonthDays.push(i)
    }

    if(lastWeekDayOfMonth !== 0) {
        for(let i = lastWeekDayOfMonth; i < weekLength; i++) {
            arrayOfMonthDays.push(i - lastWeekDayOfMonth + 1)
        }
    }
    
    const chunksArray = [];
        
    for (let i = 0; i < arrayOfMonthDays.length; i += weekLength) {
        const chunk = arrayOfMonthDays.slice(i, i + weekLength);
        chunksArray.push(chunk);
    }
    
    return chunksArray
} 

const arrayOfWeeks = createArrayOfWeeks (getDateDetails(currentDate).currentYear, getDateDetails(currentDate).currentMonth, DAYS_IN_WEEK)

const weeksInMonth = arrayOfWeeks.length
const currentWeek = arrayOfWeeks.findIndex((week) => week.includes(getDateDetails(currentDate).todaysDate))

let displayedWeek = currentWeek

const appendDates = (weeksArray: number[][], weekIndex: number, listClassName: string, containerClassName: string) => {
    const listContainer = document.querySelector(containerClassName)  
    const currentDateList = document.querySelector(listClassName)

    if (![listContainer, currentDateList]) return

    const newDateList = document.createElement("ul")
    addToClass(newDateList,"calendarContainer__calendar__listContainer__dateList")

    weeksArray[weekIndex].forEach((day) => {
        const dateCell = document.createElement("li")
        addToClass(dateCell, "calendarContainer__calendar__listContainer__dateList__date") 
        dateCell.textContent = `${day}`

        if(displayedWeek < currentWeek || displayedWeek === currentWeek && day < getDateDetails(currentDate).todaysDate) {
            addToClass(dateCell, "calendarContainer__calendar__listContainer__dateList__date--gray")
        }
    
        if(day === getDateDetails(currentDate).todaysDate) {
            addToClass(dateCell, "calendarContainer__calendar__listContainer__dateList__date--darkGreen")
        }
    
        if(day > getDateDetails(currentDate).todaysDate && day <= getDateDetails(currentDate).todaysDate + 7) {
            addToClass(dateCell, "calendarContainer__calendar__listContainer__dateList__date--lightGreen")
        }
    
        newDateList.appendChild(dateCell)
    })
 
    if(currentDateList) {
       currentDateList.replaceWith(newDateList)
    } else {
        listContainer.appendChild(newDateList)
    } 
} 

appendDates(arrayOfWeeks, displayedWeek, dateListClassName, listContainerClassName)

if(nextButton) {
    nextButton.addEventListener("click", () => {
        displayedWeek = displayedWeek < weeksInMonth -1 ? displayedWeek + 1 : displayedWeek
        appendDates(arrayOfWeeks, displayedWeek, dateListClassName, listContainerClassName)
    })
}

if(prevButton) {
    prevButton.addEventListener("click", () => {
        displayedWeek = displayedWeek > 0 ? displayedWeek -1 : displayedWeek
        appendDates(arrayOfWeeks, displayedWeek, dateListClassName, listContainerClassName)
    })
}