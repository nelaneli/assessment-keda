//user model
module.exports = (sequelize, DataTypes) => {
    const Record = sequelize.define( "record", {
        vehicle_no: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
        },
        total_amount: {
            type: DataTypes.INTEGER,
        }
    }, {timestamps: true}, )
    return Record
}