const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init(
	{
		id : {
			type          : DataTypes.INTEGER,
			primaryKey    : true,
			autoIncrement : true
		},
    // What needs to go here...association?   with these columns in place, we can track the posts that users vote on. When a user votes on a post, we'll insert a new row of data to the table, which lists the primary key of the user and the primary key of the post they voted on.  We also need to instruct the User and Post models how they can query on one another through this Vote model.
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
	},
	{
		sequelize,
		timestamps      : false,
		freezeTableName : true,
		underscored     : true,
		modelName       : 'vote'
	}
);

module.exports = Vote;
