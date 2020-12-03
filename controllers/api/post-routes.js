const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET /api/posts
// router.get('/', (req, res) => {
// 	console.log('====================');
// 	Post.findAll({
// 		attributes : [
// 			'id',
// 			'post_url',
// 			'title',
// 			'created_at',
// 			[
// 				sequelize.literal(
// 					'(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
// 				),
// 				'vote_count'
// 			]
// 		],
// 		order      : [ [ 'created_at', 'DESC' ] ],
// 		include    : [
// 			{
// 				model      : Comment,
// 				attributes : [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
// 				include    : {
// 					model      : User,
// 					attributes : [ 'username' ]
// 				}
// 			},
// 			{
// 				model      : User,
// 				attributes : [ 'username' ]
// 			}
// 		]
// 	})
// 		.then((dbPostData) => res.json(dbPostData))
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

// GET /api/posts/1
// router.get('/:id', (req, res) => {
// 	Post.findOne({
// 		where      : {
// 			id : req.params.id
// 		},
// 		attributes : [
// 			'id',
// 			'post_url',
// 			'title',
// 			'created_at',
// 			[
// 				sequelize.literal(
// 					'(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
// 				),
// 				'vote_count'
// 			]
// 		],
// 		include    : [
// 			{
// 				model      : Comment,
// 				attributes : [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
// 				include    : {
// 					model      : User,
// 					attributes : [ 'username' ]
// 				}
// 			},
// 			{
// 				model      : User,
// 				attributes : [ 'username' ]
// 			}
// 		]
// 	})
// 		.then((dbPostData) => {
// 			if (!dbPostData) {
// 				res.status(404).json({ message: 'No post found with this id' });
// 				return;
// 			}
// 			res.json(dbPostData);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

// POST /api/posts
router.post('/', withAuth, (req, res) => {
	Post.create({
		title    : req.body.title,
		post_url : req.body.post_url,
		user_id  : req.session.user_id
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT /api/posts/upvote --- post upvote -- called from public/javascript/upvote.js
router.put('/upvote', withAuth, (req, res) => {
	if (req.session) {
		// pass session id along with all destructured properties on req.body
		Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote })
			.then((updatedPostData) => res.json(updatedPostData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});

// PUT /api/posts/1
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

// DELETE /api/posts/1
router.delete('/:id', withAuth, (req, res) => {
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

// DELETE /api/users/1
// router.delete('/:id', withAuth, (req, res) => {
// 	Comment.destroy({
// 		where : {
// 			user_id : req.params.id
// 		}
// 	}).then(() => {
// 		User.destroy({
// 			where : {
// 				id : req.params.id
// 			}
// 		})
// 			.then((dbUserData) => {
// 				if (!dbUserData) {
// 					res.status(404).json({ message: 'No user found with this id' });
// 					return;
// 				}
// 				res.json(dbUserData);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				res.status(500).json(err);
// 			});
// 	});
// });
