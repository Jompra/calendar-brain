const router = require('express').Router()
const events = require('../controllers/events')

router.route('/events/:id')
  .get(events.single)
  .post(events.update)
  .delete(events.delete)

router.route('/events')
  .get(events.index)
  .post(events.create)


module.exports = router