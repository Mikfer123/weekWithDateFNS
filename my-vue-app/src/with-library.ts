import { DAYS_IN_WEEK } from './constants';
import { addToClass } from './helpers';
import {
    format, 
    getDaysInMonth, 
    startOfMonth, 
    lastDayOfMonth, 
    getDay, 
    getDate,
} from 'date-fns';

const dateListClassName = ".calendarContainer__calendar__listContainer__dateList"
const listContainerClassName = ".calendarContainer__calendar__listContainer"
const clockElement = document.querySelector(".calendarContainer__clockContainer__clock")
const monthElement = document.querySelector(".calendarContainer__calendar__Month")
const prevButton = document.getElementById("Prev")
const nextButton = document.getElementById("Next")

const currentDate = new Date()
const todaysDate = getDate(currentDate)
const currentMonth = format(currentDate, "MMMM")


setInterval(() => {
    if(clockElement) clockElement.textContent = format(new Date(), "HH:mm:ss"), 1
})

if(monthElement) monthElement.textContent = `${currentMonth}` 

const createArrayOfWeeks = (date:Date) => {
    
    const currentMonthLength = getDaysInMonth(date)
    const startFromMonday = getDay(startOfMonth(date)) === 0 ? 7 : getDay(startOfMonth(date))
    const firstWeekDayOfMonth = startFromMonday -1
    const lastWeekDayOfMonth = getDay(lastDayOfMonth(date)) 
    const lastMonthsLength = getDate(startOfMonth(date).setHours(-1))
    const arrayOfMonthDays = []
    
    for(let i = firstWeekDayOfMonth; i > 0 ; i--) {
        arrayOfMonthDays.push(lastMonthsLength - i +1)
    }
    
    for(let i = 1; i <= currentMonthLength; i++) {
        arrayOfMonthDays.push(i)
    }

    if(lastWeekDayOfMonth !== 0) {
        for(let i = lastWeekDayOfMonth; i < DAYS_IN_WEEK; i++) {
            arrayOfMonthDays.push(i - lastWeekDayOfMonth + 1)
        }
    }
    
    const chunksArray = [];
        
    for (let i = 0; i < arrayOfMonthDays.length; i += DAYS_IN_WEEK) {
        const chunk = arrayOfMonthDays.slice(i, i + DAYS_IN_WEEK);
        chunksArray.push(chunk);
    }
    
    return chunksArray
} 

const arrayOfWeeks = createArrayOfWeeks(currentDate)
const weeksInMonth = arrayOfWeeks.length
const currentWeek = arrayOfWeeks.findIndex((week) => week.includes(todaysDate))

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

        if(displayedWeek < currentWeek || displayedWeek === currentWeek && day < todaysDate) {
            addToClass(dateCell, "calendarContainer__calendar__listContainer__dateList__date--gray")
        }
    
        if(day === todaysDate) {
            addToClass(dateCell, "calendarContainer__calendar__listContainer__dateList__date--darkGreen")
        }
    
        if(day > todaysDate && day <= todaysDate + 7) {
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

