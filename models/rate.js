
module.exports = (sequelize, Sequelize) => {
    const Rate = sequelize.define("Rate", {
        Value: {
            type: Sequelize.DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        timestamps: false
    });

    Rate.associate = function(models) {
        Rate.belongsTo(models.User, { foreignKey: "UserId" });
        Rate.belongsTo(models.Hotel, { foreignKey: "HotelId" });
    };

    return Rate;
};
