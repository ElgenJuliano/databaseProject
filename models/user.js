module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        FirstName: Sequelize.DataTypes.STRING,
        LastName: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });
    User.associate = function(models) {
    User.belongsToMany(models.Hotel, {
        through: models.Rate,
        foreignKey: "UserId",
        otherKey: "HotelId"
    });

    User.belongsToMany(models.Room, {
        through: models.Reservation,
        foreignKey: "UserId",
        otherKey: "RoomId"
    });
};
    return User
}