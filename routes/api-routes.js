// Routes
// =============================================================
const Event = require('../controller/eventController');
const AccessMiddleware = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Retrieves all events with a date field of today or later
    app.get('/api/event', (req, res) => {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        console.log(date);
        Event.findAllWhere(req, res, {date: {$gte: date}});
    });

    // Retrieves all events with a date field of 'startdate' or later
    app.get('/api/event/:startdate', AccessMiddleware.hasAdminAccess, (req, res) => {
        Event.findAllWhere(req, res, {date: {$gte: Date.parse(req.params.startdate)}});
    });

    // Create a new event
    // admin check for this route
    app.post('/api/event', AccessMiddleware.hasAdminAccess, (req, res) => {
        console.log("api-routes.js, api.post");
        Event.create(req, res)
    });
    
    // Update an existing event with the id specified in the 'id' param
    // admin check for this route
    app.put('/api/event/:id', AccessMiddleware.hasAdminAccess, (req, res) => {
        Event.update(req, res);
    });

    // Delete an existing event with the id specified in the 'id' param
    // admin check for this route
    app.delete('/api/event/:id', AccessMiddleware.hasAdminAccess, (req, res) => {
        Event.remove(req, res);
    });
    // create endpoint for favorites for user
    app.post('/api/favorites/event', AccessMiddleware.hasAccess, (req, res) => {
        Event.create(req, res);
    });
    app.get('/api/favorites', AccessMiddleware.hasAccess, (req, res) => {
        Event.findAllWhere(req, res);
    });
};
