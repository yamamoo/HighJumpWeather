'use strict';


var IndexModel = require('../models/index');
var CityModel = require('../models/cityModel');


module.exports = function (router) {

    router.get('/', function(req, res) {
    	res.redirect('/weather');
    });

    router.get('/weather', function (req, res) {

    	// Print all parameters passed to the server
    	var parameters = req.query;
    	console.log('Parameters passed to the server:');
    	var i = 0;
    	for (var key in parameters) {
    		if (parameters.hasOwnProperty(key)) {
    			console.log('['+i+']', key+'='+parameters[key]);
    			i++;
    		}
    	}

		// Get the weather data into city model objects
		var model = {
			cities : CityModel.populate()
		};

        // Pass the city model to the page template
        res.render('index', model);
        
    });

    router.post('/weather', function(req, res) {
    	console.log('PUT received. Ignoring.');
		res.redirect('/weather');
    });

};
