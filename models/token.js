module.exports = (sequelize, Sequelize) => {

    const Token = sequelize.define("tokens", {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _useruid: {
        allowNull: false,
        type: Sequelize.UUID
      },
      _tuid: {
        allowNull: true,
        type: Sequelize.UUID
      }
    })
  
    return Token
  }