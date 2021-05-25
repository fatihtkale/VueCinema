'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Userlogin, {
              targetKey: 'id',
              foreignKey: {
                name:"userId",
                field: 'userId',
              }
            })
        }
    };
    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthday:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};