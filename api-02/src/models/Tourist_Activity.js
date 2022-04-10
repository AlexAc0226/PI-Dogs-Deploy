const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('tourist_activity', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    difficulty:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            len: [1,5],
            isNumeric: true,
            min: 1,
            max: 5
        }
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    season:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            isIn: [['summer', 'winter', 'fall', 'spring', 'Summer', 'Winter', 'Fall', 'Spring']]
        }
    } 
  });
};
