const mongoose = require('mongoose')
const { dbURI, dbSettings } = require('../config/environment')
const Event = require('../models/event')

let year = 2021
let month = 'apr'

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const months = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12'
}

readline.question('What Year would you like to fill?  >  ', yearInput => {
  yearInput = yearInput || '2020'
  const yearInt = parseInt(yearInput)
  if (yearInt >= 1000 && yearInt <= 9999) {
    year = yearInt
  }
  console.log(`You've chosen year ${year}`)

  readline.question('Which month would you like to fill? E.G. JAN, Feb, mar, all  >  ', monthInput => {
    monthInput = monthInput || 'feb'
    if (months.hasOwnProperty(monthInput.toLowerCase())) {
      month = monthInput.toLowerCase()
      console.log(`You've chosen month ${month}`)

      dropDb()
      pushToDb(createMonthEvents())
    }
    readline.close()
  })
})

async function dropDb(){
  const db = mongoose.createConnection(dbURI, dbSettings)
  await db.dropDatabase()
}

function createMonthEvents() {
  const monthEvents = []
  const daysInMonth = new Date(year, months[month], 0).getDate()

  for (let i = 1; i <= daysInMonth; i++) {
    const dayEvents = []
    const dayStart = new Date(year, months[month], i).getTime()
    const eventsPerDay = Math.floor(Math.random() * 8)

    for (let j = 0; j <= eventsPerDay; j++) {
      const randomMinutesInMilisecondsUpToAnHour = Math.floor(Math.random() * 60) * 60_000
      const randDuration = randomMinutesInMilisecondsUpToAnHour

      const startTime = dayEvents.length === 0 ? dayStart + randDuration : parseInt(dayEvents[j - 1].startDateTime) + randDuration

      dayEvents.push({
        startDateTime: `${startTime}`,
        name: `Day ${i} Event ${j}`,
        description: 'Test Description',
        duration: `${randDuration}`
      })
    }
    dayEvents.forEach(event => {
      monthEvents.push(event)
    })
  }
  return monthEvents
}

function pushToDb(events) {
  mongoose.connect(
    dbURI, dbSettings, async (err) => {
      if (err) return console.log(err)
      try {
        const createdEvents = await Event.create(events)
        console.log(`Created ${createdEvents.length} Events`)
        await mongoose.connection.close()
      } catch (err) {
        console.log('error', err)
      }
    }
  )
}
