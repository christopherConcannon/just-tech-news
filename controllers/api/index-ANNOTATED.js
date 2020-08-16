const router = require('express').Router();

// collect endpoints
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

// prefixed names
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;


//  we're keeping the API endpoints nice and organized while allowing the API to be scalable. we can add API endpoints and use this file to collect them and give them their prefixed name. in user-routes.js we didn't use the word users in any routes because in this file we take those routes and implement them to another router instance, prefixing them with the path /users at that time.

