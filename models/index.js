const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {
    dialect: 'mysql',
    logging: false,
    //ssl: { rejectUnauthorized: false}
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ToDoCard = require ('./toDoCard.js')(sequelize, Sequelize);
db.Today = require('./Today.js')(sequelize, Sequelize);

db.sequelize.sync()
    .then(()=>{
        console.log('Database synced!');
    })
    .catch((err)=>{
        console.log('err syncing db: '+err);
    })

module.exports = db;