// https://sequelize.org/v5/manual/models-definition.html

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
	{
		// TABLE COLUMN DEFINITIONS GO HERE

		// define an id column
		id       : {
			// use the special Sequelize DataTypes object to provide what type of data it is
			type          : DataTypes.INTEGER,
			// this is the equivalent of SQL's 'NOT NULL' option
			allowNull     : false,
			// instruct that this is the Primary Key
			primaryKey    : true,
			// turn on auto increment
			autoIncrement : true
		},

		// define a username column
		username : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		// define an email column
		email    : {
			type      : DataTypes.STRING,
			allowNull : false,
			// there cannot be any duplicate email values in this table
			unique    : true,
			// if allowNull is set to false, we can run our data through validators before creating the table data
			validate  : {
				isEmail : true
			}
		},
		// define a password column
		password : {
			type      : DataTypes.STRING,
			allowNull : false,
			validate  : {
				// this means the password must be at least four characters long
				len : [ 4 ]
			}
		}
	},
	{
		// TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)

		// pass in our imported sequelize connection (the direct connection to our database)
		sequelize,
		// don't automatically creaet createdAt/updatedAt timestamp fields
		timestamps      : false,
		// don't pluralize name of database table
		freezeTableName : true,
		// use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
		underscored     : true,
		// make it so our model name stays lowercase in the database
		modelName       : 'user'
	}
);

module.exports = User;

// First, we imported the Model class and DataTypes object from Sequelize. This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.

// Once we create the User class, we use the .init() method to initialize the model's data and configuration, passing in two objects as arguments. The first object will define the columns and data types for those columns. The second object it accepts configures certain options for the table. Learn more in the Sequelize documents for model configuration (Links to an external site.).

// we've set up the User model to have four columns. If we didn't define the model to have a primaryKey option set up anywhere, Sequelize would create one for us, but it's best we explicitly define all of the data. You never know who else is going to look at your code and try to understand your work!

// Each column's definition gets its own type definition, in which we use the imported Sequelize DataTypes object to define what type of data it will be. We can also apply other options found in SQL, such as allowNull, which is NOT NULL in SQL, and autoIncrement, which is AUTO INCREMENT in MySQL.

// Sequelize's built-in validators are another great feature. We can use them to ensure any email data follows the pattern of an email address (i.e., <string>@<string>.<string>) so no one can give us incorrect data. There are a lot of prebuilt validators we can use from Sequelize, but you can also make your own, 

// Lastly, export the newly created model so we can use it in other parts of the app.

// Every time we extend a class from the Sequelize Model class, that new class (or model, in this case) inherits a number of methods for creating, reading, updating, and deleting data from a database. The .init() method we execute after is the part that actually provides context as to how those inherited methods should work.
