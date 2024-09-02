module.exports = (sequelize, DataTypes) => {
    const Today = sequelize.define('Today', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING
        }
    });

    return Today;
}