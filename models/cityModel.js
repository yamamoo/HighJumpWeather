'use strict';

var httpsync = require('httpsync');
var util = require('util'); // for URL string formatting

var cityModel = function () {
	var results = {};

	var options = {
		url: '',
		method: 'GET',
		headers: {}
	};

	var api_key = '1f3fb5df37e5e3d4';
	var url_format = 'http://api.wunderground.com/api/' + api_key + '/conditions/q/%s.json';
	var DEBUG = 0;  // set this to 0 to use Weather Underground API
	                // or set this to non-zero to use dummy data
	
	var getCityWeather = function(city) {
		if (DEBUG == 0) {

			options.url = util.format(url_format, city);
			//console.log('DEBUG: Calling API', options.url);

			// Call Weather Underground REST API for current condition
			var req = httpsync.request(options);
			var res = req.end();
			//console.log(res.data);

			// Convert JSON response string to an object
			var obj = JSON.parse(res.data);

			//console.log(JSON.stringify(obj));

			if (obj === undefined || obj.current_observation === undefined) {
				// no valid weather data returned
				//console.log('No valid data returned for city', city);
				results[city] = undefined;
			} else {
				// Save city's full name, current weather and temperature in a dictionary
				results[city] = {
					name: obj.current_observation.display_location.full,
					weather: obj.current_observation.weather,
					temperature: obj.current_observation.temperature_string
				};
				//console.log('results = ' + JSON.stringify(results));
			}

		} else {
			
			// DEBUG START -->>
			// Hard-coded dummy JSON msg for debugging purpose
			var msg = '\
	{\n\
	  "response": {\n\
	  "version":"0.1",\n\
	  "termsofService":"http://www.wunderground.com/weather/api/d/terms.html",\n\
	  "features": {\n\
	  "conditions": 1\n\
	  }\n\
		}\n\
	  ,	"current_observation": {\n\
			"image": {\n\
			"url":"http://icons.wxug.com/graphics/wu2/logo_130x80.png",\n\
			"title":"Weather Underground",\n\
			"link":"http://www.wunderground.com"\n\
			},\n\
			"display_location": {\n\
			"full":"Timonium, MD",\n\
			"city":"Timonium",\n\
			"state":"MD",\n\
			"state_name":"Maryland",\n\
			"country":"US",\n\
			"country_iso3166":"US",\n\
			"zip":"21093",\n\
			"magic":"1",\n\
			"wmo":"99999",\n\
			"latitude":"39.43494034",\n\
			"longitude":"-76.65486145",\n\
			"elevation":"151.00000000"\n\
			},\n\
			"observation_location": {\n\
			"full":"Timonium, Maryland",\n\
			"city":"Timonium",\n\
			"state":"Maryland",\n\
			"country":"US",\n\
			"country_iso3166":"US",\n\
			"latitude":"39.430111",\n\
			"longitude":"-76.633057",\n\
			"elevation":"360 ft"\n\
			},\n\
			"estimated": {\n\
			},\n\
			"station_id":"KMDTIMON1",\n\
			"observation_time":"Last Updated on September 16, 5:10 PM EDT",\n\
			"observation_time_rfc822":"Tue, 16 Sep 2014 17:10:04 -0400",\n\
			"observation_epoch":"1410901804",\n\
			"local_time_rfc822":"Tue, 16 Sep 2014 17:11:37 -0400",\n\
			"local_epoch":"1410901897",\n\
			"local_tz_short":"EDT",\n\
			"local_tz_long":"America/New_York",\n\
			"local_tz_offset":"-0400",\n\
			"weather":"Overcast",\n\
			"temperature_string":"71.4 F (21.9 C)",\n\
			"temp_f":71.4,\n\
			"temp_c":21.9,\n\
			"relative_humidity":"52%",\n\
			"wind_string":"From the North at 3.0 MPH Gusting to 9.0 MPH",\n\
			"wind_dir":"North",\n\
			"wind_degrees":8,\n\
			"wind_mph":3.0,\n\
			"wind_gust_mph":"9.0",\n\
			"wind_kph":4.8,\n\
			"wind_gust_kph":"14.5",\n\
			"pressure_mb":"1016",\n\
			"pressure_in":"30.00",\n\
			"pressure_trend":"0",\n\
			"dewpoint_string":"53 F (12 C)",\n\
			"dewpoint_f":53,\n\
			"dewpoint_c":12,\n\
			"heat_index_string":"NA",\n\
			"heat_index_f":"NA",\n\
			"heat_index_c":"NA",\n\
			"windchill_string":"NA",\n\
			"windchill_f":"NA",\n\
			"windchill_c":"NA",\n\
			"feelslike_string":"71.4 F (21.9 C)",\n\
			"feelslike_f":"71.4",\n\
			"feelslike_c":"21.9",\n\
			"visibility_mi":"10.0",\n\
			"visibility_km":"16.1",\n\
			"solarradiation":"--",\n\
			"UV":"2","precip_1hr_string":"0.00 in ( 0 mm)",\n\
			"precip_1hr_in":"0.00",\n\
			"precip_1hr_metric":" 0",\n\
			"precip_today_string":"0.00 in (0 mm)",\n\
			"precip_today_in":"0.00",\n\
			"precip_today_metric":"0",\n\
			"icon":"cloudy",\n\
			"icon_url":"http://icons.wxug.com/i/c/k/cloudy.gif",\n\
			"forecast_url":"http://www.wunderground.com/US/MD/Timonium.html",\n\
			"history_url":"http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KMDTIMON1",\n\
			"ob_url":"http://www.wunderground.com/cgi-bin/findweather/getForecast?query=39.430111,-76.633057",\n\
			"nowcast":""\n\
		}\n\
	}\n\
			';
			var obj = JSON.parse(msg);
			results[city] = {
				name: obj.current_observation.display_location.full,
				weather: obj.current_observation.weather,
				temperature: obj.current_observation.temperature_string
			};
			//console.log('DEBUG: result['+city+'] = ', JSON.stringify(results[city]));
			// <<-- DEBUG END
			
		}
	}
	this.populate = function() {

		// Get Campbell weather
		getCityWeather('CA/Campbell');

		// Get Omaha weather
		getCityWeather('NE/Omaha');

		// Get Austin weather
		getCityWeather('TX/Austin');

		// Get Timonium weather
		getCityWeather('MD/Timonium');

		// create a return value as an array of city weather
		var arrayResult = new Array(0);
		for (var key in results) {
    		if (results.hasOwnProperty(key) && results[key] != undefined) {
    			arrayResult.push(results[key]);
    		}
    	}
		return arrayResult;
	};
	
};

module.exports = new cityModel();