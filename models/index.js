const User = require('./User');
const Post = require('./Post');

// We define relationships between tables (our model associations) here...

// a user can make many posts. With Sequelize, we can use JavaScript to explicitly create this relation. This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.


// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// We also need to make the reverse association by adding the following statement.  In this statement, we are defining the relationship of the Post model to the User. The constraint we impose here is that a post can belong to one user, but not many users. Again, we declare the link to the foreign key, which is designated at user_id in the Post model.

Post.belongsTo(User, {
  foreignKey: 'user_id',
});



module.exports = { User, Post };

// Previously, we created the associations between models on the database layer in the schema using SQL. In that case, we had to drop the table and then create it again so the associations would be implemented.


// Do we have to do the same drop/create process to the tables because we created the associations on the application layer this time?

// Yes, we do. These association changes will not take affect in the User table, because there isn't a way to make changes to the table dynamically. We will need to drop the table and create a new one in order for the associations to take affect. But Sequelize does have a way to dynamically drop the table and create a new one to overwrite existing tables and establish the new associations.


// Navigate to the server.js file and locate the database connection at the bottom of the file.

// In the sync method, there is a configuration parameter { force: false }. If we change the value of the force property to true, then the database connection must sync with the model definitions and associations. By forcing the sync method to true, we will make the tables re-create if there are any association changes.



