'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: true
  });
  User.associate = function(models) {
    User.hasMany(models.results);
  };


  User.giveEmail = async (email) => {
    return await User.findAll({
      where:{
        email: email
    }})
  }

  User.giveId = async (id) => {
    return await User.findAll({
      where: {
        id: id
      }
    })
  }
  User.checkUser = async (nickName, userEmail, userPassword) => {
    let arrOfUsers = await User.findAll({
      where: {
        nickName: nickName,
        email: userEmail,
        password: userPassword
      }
    })
    return arrOfUsers
  }  
  return User;
};