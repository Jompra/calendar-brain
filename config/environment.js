const port = process.env.port || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/calendar-brain'
const dbSettings =  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }

module.exports = {
  dbURI,
  port,
  dbSettings
}