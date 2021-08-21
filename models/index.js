const Sequelize = require('sequelize');
const dbConfig = require('config').get('dbConfig')



const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        define: {
            "createdAt": "createdat",
            "updatedAt": "updatedat",
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
  })
  .catch(err => {
    console.error('DB Unable to connect to the database:', err);
  });

console.log('Create DB object (connection)')
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

const user = require("./user")(sequelize, Sequelize)
const token = require("./token")(sequelize, Sequelize)
const link = require('./link')(sequelize, Sequelize)




user.hasMany(link, {
    as: 'links',
    foreignkey: 'userId',
})

link.belongsTo(user, {
    foreignkey: 'userId',
    as:'user'
})



module.exports = {
    db,
    User: user,
    Token: token,
    Link: link
}