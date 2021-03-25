const mongoose = require('mongoose')
const recurranceTypes = ['ONCE', 'DAILY', 'WEEKLY', 'WEEKDAYS', 'MONTHLY', 'YEARLY', 'X-DAY-OF-MONTH', 'EVERY-X-WEEKS']

const eventSchema = new mongoose.Schema({
  'name': { type: String, required: true },
  'location': { type: String },
  'startDateTime': { type: Date, required: true },
  'duration': { type: Number, required: true },
  // 'timezone': { type: String, required: true },
  'recurrence': { type: String, default: 'ONCE', enum: recurranceTypes },
  'recurrenceEnds': { type: Date, required: function () {
    return this.recurrence !== 'ONCE' 
  } },
  'description': { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('Entry', eventSchema)