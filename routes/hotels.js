var express = require('express');
var router = express.Router();
var db = require("../models")
var HotelService = require("../services/HotelService")
var hotelService = new HotelService(db)
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

/* POST create a hotel. */
router.post('/', jsonParser, async function(req, res, next) {
  let Name = req.body.Name;
  let Location = req.body.Location;
  await hotelService.create(Name, Location);
  res.end()
});


/* DELETE a hotel. */
router.delete('/', jsonParser, async function(req, res, next) {
  let id = req.body.id;
  await hotelService.deleteHotel(id);
  res.end()
});

/* GET hotels listing. */
router.get('/', async function(req, res, next) {
  const hotels = await hotelService.get()
  res.render('hotels', { title: 'Hotels', hotels: hotels });
});

/* GET hotels ratings*/
router.get('/:hotelId', async function(req, res, next) {
  const hotel = await hotelService.getHotelDetails(req.params.hotelId);
  res.render('hotelDetails', { hotel: hotel });
});

/* Post ratings */
router.post('/:hotelId/rate', jsonParser, async function(req, res, next) {
  let value = req.body.Value;
  await hotelService.makeARate(1, req.params.hotelId, value);
  res.end()
});


module.exports = router;