'use strict';

angular
  .module('skyApp', [
    'ngResource',
    'ngRoute',
    'ngTouch',
		'ngAnimate'
]);


// Full Moon Calculator
$(function() {
  function moonphase(date) {
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    var text = [''];
    var bluemoon = new Date(96, 1, 3, 16, 15, 0);
    var lunarperiod = 29 * (24 * 3600 * 1000) + 12 * (3600 * 1000) + 44.05 * (60 * 1000);
    var phasetime = (date.getTime() - bluemoon.getTime()) % lunarperiod;
    var fullmoon = Math.round((lunarperiod - phasetime) / (24 * 3600 * 1000));

    text.push('<h6>' +
      (fullmoon === 0 ? 'Today is Full Moon' :
        (fullmoon === 1 ? 'Tomorrow is the next Full Moon' :
          fullmoon + ' days until <br>Full Moon')) + '<\/h6>');
    document.getElementById('calculator').innerHTML = text.join('');
  }
  moonphase(new Date());
});