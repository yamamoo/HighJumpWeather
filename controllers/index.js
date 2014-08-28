'use strict';


var IndexModel = require('../models/index');
var CityModel = require('../models/cityModel');


module.exports = function (router) {

    //var model = new IndexModel();


    router.get('/', function (req, res) {
        var model = {
        	cities : CityModel.populate()
        };
        res.render('index', model);
        
    });

};
