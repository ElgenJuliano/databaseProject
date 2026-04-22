module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define('Reservation', {
        StartDate: Sequelize.DataTypes.DATE,
        EndDate: Sequelize.DataTypes.DATE
    }, {
        timestamps: false,
        hasTrigger: true
    });

    
Reservation.associate = function(models) {
    Reservation.belongsTo(models.User, { foreignKey: "UserId" });
    Reservation.belongsTo(models.Room, { foreignKey: "RoomId" });
};

    return Reservation;
};
