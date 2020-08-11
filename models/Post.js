const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init({
	id              : {
		type          : DataTypes.INTEGER,
		allowNull     : false,
		primaryKey    : true,
		autoIncrement : true
	},
	title           : {
		type      : DataTypes.STRING,
		allowNull : false
	},
	post_url        : {
		type      : DataTypes.STRING,
		allowNull : false,
		validate  : {
			isURL : true
		}
	},
	user_id         : {
    type       : DataTypes.INTEGER,
    // define user_id as the foreign key of the user table
		references : {
			model : 'user',
			key   : 'id'
		}
  },
},
{
  // configure metadata, including naming conventions
	sequelize,
	freezeTableName : true,
	underscored     : true,
	modelName       : 'post'
});

module.exports = Post;