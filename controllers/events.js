const Event = require('../models/event')

const eventIndex = async (req, res) => {
  try {
    console.log(req.body)
    const events = await Event.find({ 'startDateTime': { '$gte': req.body.start, '$lt': req.body.end } })
    res.status(200).json(events)
  } catch (err) {
    res.status(404).json(err)
  }
}

const eventCreate = async (req, res) => {
  const recurringTags = ['Daily', 'Weekly', 'Weekdays', 'Monthly', 'X-Day-Of-Month']
  try {
    console.log(req.body)
    const createdEvent = await Event.create(req.body)
    res.status(201).json(createdEvent)
  } catch (err) {
    console.log(err)
    res.status(404).json(err)
  }
}

const getSingleEvent = async (req, res) => {
  const eventId = req.params.id
  try {
    console.log(req.params)
    const singleEvent = await Event.findById(eventId)
    res.status(200).json(singleEvent)
  } catch (err) {
    res.status(404).json(err)
  }
}

const updateEvent = async (req, res) => {
  const eventId = req.params.id
  try {
    console.log(eventId)
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true })
    res.status(200).json(updatedEvent)
  } catch (err) {
    res.status(404).json(err)
  }
}

const deleteEvent = async (req, res) => {
  const eventId = req.params.id
  try {
    await Event.findByIdAndDelete(eventId)
    res.status(200).json(`Successfully Deleted Event ${req.params.id}`)
  } catch (err) {
    res.status(404).json(err)
  }
}

module.exports = {
  index: eventIndex,
  create: eventCreate,
  single: getSingleEvent,
  update: updateEvent,
  delete: deleteEvent
}
