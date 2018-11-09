'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nickName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: true
  });
  User.associate = function(models) {
    User.hasMany(models.Result);
  };

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