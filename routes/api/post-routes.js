const router = require('express').Router();
const { Post, User } = require('../../models');

// Why did we include the User model for the post-routes?

// In a query to the post table, we would like to retrieve not only information about each post, but also the user that posted it. With the foreign key, user_id, we can form a JOIN, an essential characteristic of the relational data model.

// get all posts
router.get('/', (req, res) => {
	console.log('====================');
	Post.findAll({
		// Query configuration
		// account for attributes (columns) from Post table
    attributes : [ 'id', 'post_url', 'title', 'created_at' ],
    order: [['created_at', 'DESC']],
		// include the JOIN to the User table, selecting the username column from User.  Notice that the include property is expressed as an array of objects. To define this object, we need a reference to the model and attributes.
		include    : [
			{
				model      : User,
				attributes : [ 'username' ]
			}
		]
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	Post.findOne({
		where      : {
			id : req.params.id
		},
		attributes : [ 'id', 'post_url', 'title', 'created_at' ],
		include    : [
			{
				model      : User,
				attributes : [ 'username' ]
			}
		]
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	// expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
	Post.create({
		title    : req.body.title,
		post_url : req.body.post_url,
		user_id  : req.body.user_id
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	Post.update(
		{
			title : req.body.title
		},
		{
			where : {
				id : req.params.id
			}
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	Post.destroy({
		where : {
			id : req.params.id
		}
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
