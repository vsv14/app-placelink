module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("users", {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        
      },
      _uuid: {
        allowNull: true,
        type: Sequelize.UUID
      },
      uname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      upass: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }, {
      underscored: false
    })
  
    return User
  }