const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

class HotelService {
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
        this.Rate = db.Rate;
        this.User = db.User;
    }

    // Create a hotel
    async create(name, location) {
        return sequelize.query(
            "INSERT INTO hotels (Name, Location) VALUES (:Name, :Location)",
            {
                replacements: { Name: name, Location: location }
            }
        );
    }

    // Get all hotels
    async get() {
        return sequelize.query(
            "SELECT * FROM hotels",
            { type: QueryTypes.SELECT }
        );
    }

    // Delete a hotel
    async deleteHotel(hotelId) {
        return sequelize.query(
            "DELETE FROM hotels WHERE id = :hotelId",
            { replacements: { hotelId } }
        );
    }

    // Get hotel details
    async getHotelDetails(hotelId) {
        const hotel = await sequelize.query(
            `
            SELECT 
                h.id,
                h.Name,
                h.Location,
                ROUND(AVG(r.Value), 1) AS AvgRate
            FROM hotels h
            LEFT JOIN rates r ON h.id = r.HotelId
            WHERE h.id = :hotelId
            `,
            {
                replacements: { hotelId },
                type: QueryTypes.SELECT
            }
        );

        const userRateCount = await sequelize.query(
            `
            SELECT COUNT(*) AS Rated
            FROM rates
            WHERE HotelId = :hotelId AND UserId = :userId
            `,
            {
                replacements: { hotelId, userId: 1 },
                type: QueryTypes.SELECT
            }
        );

        hotel[0].Rated = userRateCount[0].Rated > 0;
        return hotel[0];
    }

    // Rate a hotel
    async makeARate(userId, hotelId, value) {
        return sequelize.query(
            `
            INSERT INTO rates (Value, HotelId, UserId)
            VALUES (:value, :hotelId, :userId)
            `,
            {
                replacements: { userId, hotelId, value }
            }
        );
    }
}

module.exports = HotelService;
