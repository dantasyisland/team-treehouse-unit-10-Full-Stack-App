const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Please enter a title for your course`
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please enter a course description'
          }
        }
      },
      estimatedTime: {
        type: DataTypes.STRING,
        allowNull: true
      },

      materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: true
      }

      // USERID CREATED IN MODEL ASSOCIATIONS WITH THE FOREIGNKEY PROPERTY
    },
    {
      sequelize,
      modelName: 'Course'
    }
  );

  // Add association to user model
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  };
  return Course;
};
