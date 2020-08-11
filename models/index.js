const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

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

// Create a Many-to-Many Association
// Now we need to associate User and Post to one another in a way that when we query Post, we can see a total of how many votes a user creates; and when we query a User, we can see all of the posts they've voted on. You might think that we can use .hasMany() on both models, but instead we need to use .belongsToMany().

// With these two .belongsToMany() methods in place, we're allowing both the User and Post models to query each other's information in the context of a vote. If we want to see which users voted on a single post, we can now do that. If we want to see which posts a single user voted on, we can see that too. This makes the data more robust and gives us more capabilities for visualizing this data on the client-side.

// Notice the syntax. We instruct the application that the User and Post models will be connected, but in this case through the Vote model. We state what we want the foreign key to be in Vote, which aligns with the fields we set up in the model. We also stipulate that the name of the Vote model should be displayed as voted_posts when queried on, making it a little more informative.

// Furthermore, the Vote table needs a row of data to be a unique pairing so that it knows which data to pull in when queried on. So because the user_id and post_id pairings must be unique, we're protected from the possibility of a single user voting on one post multiple times.  This layer of protection is called a foreign key constraint.

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

// even though we're connecting the Post and User models together through the Vote model, there actually is no direct relationship between Post and Vote or User and Vote. If we want to see the total number of votes on a post, we need to directly connect the Post and Vote models.   connect User to Vote directly as well

// By also creating one-to-many associations directly between these models, we can perform aggregated SQL functions between models. In this case, we'll see a total count of votes for a single post when queried. This would be difficult if we hadn't directly associated the Vote model with the other two.

Vote.belongsTo(User, {
  foreignKey: 'user_id'
})

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
})

User.hasMany(Vote, {
  foreignKey: 'user_id'
})

Post.hasMany(Vote, {
  foreignKey: 'post_id'
})




module.exports = { User, Post, Vote };

// Previously, we created the associations between models on the database layer in the schema using SQL. In that case, we had to drop the table and then create it again so the associations would be implemented.


// Do we have to do the same drop/create process to the tables because we created the associations on the application layer this time?

// Yes, we do. These association changes will not take affect in the User table, because there isn't a way to make changes to the table dynamically. We will need to drop the table and create a new one in order for the associations to take affect. But Sequelize does have a way to dynamically drop the table and create a new one to overwrite existing tables and establish the new associations.


// Navigate to the server.js file and locate the database connection at the bottom of the file.

// In the sync method, there is a configuration parameter { force: false }. If we change the value of the force property to true, then the database connection must sync with the model definitions and associations. By forcing the sync method to true, we will make the tables re-create if there are any association changes.



