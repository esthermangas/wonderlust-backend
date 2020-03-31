const auth = require('./auth');
const user = require('./user');
const place = require('./places');
const booking = require('./bookings');
const search = require('./search');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/place', authenticate, place);
    app.use('/api/booking', authenticate, booking);
    app.use('/api/search', authenticate, search);
};