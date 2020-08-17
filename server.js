// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('./config/connection');
// const path = require('path');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
// const session = require('express-session');

// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sess = {
// 	// secret: process.env.SESS_SECRET,
// 	secret            : 'Super secret secret',
// 	cookie            : {},
// 	resave            : false,
// 	saveUninitialized : true,
// 	store             : new SequelizeStore({
// 		db : sequelize
// 	})
// };

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // turn on routes
// app.use(routes);

// app.use(session(sess));

// // sequelize.sync({ force: true }).then(() => {
// sequelize.sync({ force: false }).then(() => {
// 	app.listen(PORT, () => console.log('Now listening'));
// });

const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up express session and connect session to Sequelize db
const sess = {
    secret: "superdupertopsecret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

// sequelize.sync({ force: true }).then(() => {
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});