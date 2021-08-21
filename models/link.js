module.exports = (sequelize, Sequelize) => {

    const Link = sequelize.define("links", {
      code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      link_to: {
        allowNull: false,
        type: Sequelize.STRING
      },
      link_redirect: {
        allowNull: false,
        type: Sequelize.STRING
      },
      counter: {
        allowNull: true,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        
        references: {
          model: 'users',
          key: '_id'
        },
        field: 'userId'
      }
    }, {
      underscored: false
    })


  
    return Link
  }