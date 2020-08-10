const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
	// Access our User model and run .findAll() method. .findAll() is one of the Model class's methods. The .findAll() method lets us query all of the users from the user table in the database, and is the JavaScript equivalent of the following SQL query:
	// SELECT * FROM users;

	User.findAll({
    // don't send password value back to client!  we provide an attributes key and instruct the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
    attributes: { exclude: ['password'] }
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
	});
});

// GET /api/users/1
router.get('/:id', (req, res) => {
	// In this case, we're using the where option to indicate we want to find a user where its id value equals whatever req.params.id is, much like the following SQL query:
	// SELECT * FROM users WHERE id = 1

	User.findOne({
    attributes: { exclude: ['password'] },
		where : {
			id : req.params.id
		}
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/users
router.post('/', (req, res) => {
	// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
	// To insert data, we can use Sequelize's .create() method. Pass in key/value pairs where the keys are what we defined in the User model and the values are what we get from req.body. In SQL, this command would look like the following code:
	// INSERT INTO users
	// (username, email, password)
	// VALUES
	// ("Lernantino", "lernantino@gmail.com", "password1234");

	User.create({
		username : req.body.username,
		email    : req.body.email,
		password : req.body.password
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
	// expects { username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'
	// This .update() method combines the parameters for creating data and looking up data. We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used.
	// The associated SQL syntax would look like the following code:
	// UPDATE users
	// SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
	// WHERE id = 1;

	// if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead of the explicit version seen above in the .create example
	User.update(req.body, {
		where : {
			id : req.params.id
		}
	})
		.then((dbUserData) => {
			if (!dbUserData[0]) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
	// To delete data, use the .destroy() method and provide some type of identifier to indicate where exactly we would like to delete data from the user database table.
	User.destroy({
		where : {
			id : req.params.id
		}
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;

// We're using an Express.js router again to help us keep the routes organized. We're even using the four main methods for an API: GET, POST, PUT, and DELETE.  These endpoints for the server are going to be accessible at the /api/users URL. When we create posts and comments later, we'll make those endpoints accessible at /api/posts and /api/comments

// This naming convention along with the use of the HTTP methods follow a famous API architectural pattern called REST, or Representational State Transfer. APIs built following this pattern are what's known as RESTful APIs.

// There are a number of guidelines that go into creating a RESTful API, and many are quite abstract and take time to truly grasp. Still, there are three guidelines we can put to use:

// Name your endpoints in a way that describes the data you're interfacing with, such as /api/users.

// Use HTTP methods like GET, POST, PUT, and DELETE to describe the action you're performing to interface with that endpoint; for example, GET /api/users means you should expect to receive user data.

// Use the proper HTTP status codes like 400, 404, and 500 to indicate errors in a request.

// https://sequelize.org/v5/manual/models-usage.html#data-retrieval---finders
// https://sequelize.org/v5/manual/querying.html

// Note that Sequelize's offerings are twofold. For us, the developers, we get to use object-oriented principles to model and manipulate the data. This makes our lives easier as these actions and concepts are more geared toward a language like JavaScript. This is the side we get to interface with.

// The other side of this is that after we interface with Sequelize, the library interprets our request to it and goes ahead to convey the request to the database and return to us with a response. This means we don't have to directly work with the SQL database, for the most part.
