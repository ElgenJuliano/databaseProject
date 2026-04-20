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

module.exports = router;