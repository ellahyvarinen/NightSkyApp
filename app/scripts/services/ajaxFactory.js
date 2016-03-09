'use strict';

angular
  .module('skyApp')
  .factory('AjaxFactory', function($http) {
    var urlBaseMoon = 'https://api.aerisapi.com/sunmoon/moonphases';
    var urlBaseWeather = 'https://api.aerisapi.com/forecasts';
    var urlBaseLocation = 'https://api.aerisapi.com/places';
		var clientId = 'client_id=H9lkzFagnWUs2WlbZEE2V&';
    var clientMoon = 'client_secret=Li4Ckqn4kqNbvCLEZ56WYdeLpCNGHWnvQF470p4K';
    var clientWeather = 'client_secret=7jKyBdQlgoqcwhBiG6j5Gi6mTFKMosXhlTgGbJLe';
    var clientLocation = 'client_secret=blJoheGd4CpesekVsyRdxo6rPdhheM9hW2Ho6g1P';
    var ajaxFunctions = {};

    ajaxFunctions.getWeather = function(args) {
      return $http.get(urlBaseWeather + '/closest?p=' + args.lat + ',' + args.long + '&' + clientId+ clientWeather);
    };

    ajaxFunctions.getLocation = function(args) {
      return $http.get(urlBaseLocation + '/closest?p=' + args.lat + ',' + args.long + '&' + clientId+ clientLocation);
    };

    ajaxFunctions.getMoon = function(from, to) {
      return $http.get(urlBaseMoon + '?from='+ from +'&to='+ to +'&limit=50&' + clientId + clientMoon);
    };

    ajaxFunctions.getCurrentMoon = function(args) {
      return $http.get('https://api.aerisapi.com/sunmoon' + '?p=' + args.lat + ',' + args.long + '&from=now&to=+1week&limit=7&' + clientId + clientMoon);
    };

    return ajaxFunctions;
  });
