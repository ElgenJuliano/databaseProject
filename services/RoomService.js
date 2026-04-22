const db = require("../models");

class RoomService {
    constructor() {
        this.Room = db.Room;
        this.User = db.User;
        this.Hotel = db.Hotel;
        this.Reservation = db.Reservation;
    }

    // Get all rooms
    async get() {
        return this.Room.findAll({
            include: [
                {
                    model: this.Hotel
                },
                {
                    model: this.User,
                    through: {
                        attributes: ["StartDate", "EndDate"]
                    }
                }
            ]
        });
    }

    // Get rooms for a specific hotel
    async getHotelRooms(hotelId) {
        return this.Room.findAll({
            where: { HotelId: hotelId },
            include: [
                {
                    model: this.Hotel
                },
                {
                    model: this.User,
                    through: {
                        attributes: ["StartDate", "EndDate"]
                    }
                }
            ]
        });
    }

    // Create a room
    async create(capacity, pricePerDay, hotelId) {
        return this.Room.create({
            Capacity: capacity,
            PricePerDay: pricePerDay,
            HotelId: hotelId
        });
    }

    // Delete a room
    async deleteRoom(roomId) {
        return this.Room.destroy({
            where: { id: roomId }
        });
    }

    // Rent a room
    async rentARoom(userId, roomId, startDate, endDate) {
        return this.Reservation.create({
            UserId: userId,
            RoomId: roomId,
            StartDate: startDate,
            EndDate: endDate
        });
    }
}

module.exports = RoomService;
