
class recurrance {
  constructor(start, end, eventDetails){
    this.start = start
    this.end = end
    this.eventDetails = eventDetails
    this.timeDifference = this.end.getTime() - this.start.getTime()
  }
  daily(){
    const millisecondsInDay = 86_400_000
    const daysToRepeat = Math.ceil(this.timeDifference / millisecondsInDay) + 1
    const events = []
    for (let i = 0; i < daysToRepeat; i++){
      events.push(this.eventDetails)
      if (i > 0) {
        const time = events[i].startDateTime.getTime()
        const newTime = time + millisecondsInDay
        events[i].startDateTime = new Date(newTime)
      }
    }
    return events
  }
  weekly(){
    const millisecondsInWeek = 604_800_000
    const weeksToRepeat = Math.ceil(this.timeDifference / millisecondsInWeek) + 1
    const events = []
    for (let i = 0; i < weeksToRepeat; i++){
      events.push(this.eventDetails)
      if (i > 0) {
        const time = events[i].startDateTime.getTime()
        const newTime = time + millisecondsInWeek
        events[i].startDateTime = new Date(newTime)
      }
    }
    return events
  }
}


const start = new Date()
const end = new Date('2021-03-28')
const exampleContents = {
  startDateTime: new Date(),
  name: 'test recurrance',
  description: 'Test Description',
  duration: '3600'
}
const repeat = new recurrance(start, end, exampleContents)

console.log(repeat.daily())


module.exports = {
  recurrance
}