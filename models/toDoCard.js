module.exports = (sequelize, DataTypes) => {
    const ToDoCard = sequelize.define('ToDoCard', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING
        },
        person: {
            type: DataTypes.ENUM('Ale', 'Eric', 'Pol'),
            allowNull: false
        }
    });

    return ToDoCard;
}