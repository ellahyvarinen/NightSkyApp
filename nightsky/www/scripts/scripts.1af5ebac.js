"use strict";function MoonController(a,b,c){b.getMoon=function(){var c=a.getMoon(b.from,b.to);c.then(function(a){b.moons=a.data.response,console.log(a.data.response)},function(a){console.log(a.data)})}}function CurrentMoonController(a,b,c){function d(){b.coords.lat=c.lat,b.coords["long"]=c["long"];var d=a.getCurrentMoon(b.coords);d.then(function(a){b.moonInfo=a.data.response[0],CurrentMoonController.moonInfo=a.data.response[0],console.log(a)},function(a){console.log(a.data)})}b.coords={},b.$watch(function(){return c.lat},function(){console.log(c.lat),d()})}function LocationController(a,b,c){function d(){b.coords.lat=c.lat,b.coords["long"]=c["long"];var d=a.getLocation(b.coords);d.then(function(a){b.location=a.data.response[0],LocationController.location=a.data.response[0],console.log(a.data)},function(a){console.log(a.data)})}b.coords={},b.$watch(function(){return c.lat},function(){console.log(c),console.log(c.lat),d()})}function WeatherController(a,b,c){function d(){b.coords.lat=c.lat,b.coords["long"]=c["long"];var d=a.getWeather(b.coords);d.then(function(a){b.forecast=a.data.response[0],WeatherController.forecast=a.data.response[0],console.log(a)},function(a){console.log(a.data)})}b.coords={},b.$watch(function(){return c.lat},function(){console.log(c.lat),d()})}angular.module("skyApp",["ngResource","ngRoute","ngTouch","ngAnimate"]),$(function(){function a(a){a.setTime(a.getTime()+6e4*a.getTimezoneOffset());var b=[""],c=new Date(96,1,3,16,15,0),d=2551443e3,e=(a.getTime()-c.getTime())%d,f=Math.round((d-e)/864e5);b.push("<h6>"+(0===f?"Today is Full Moon":1===f?"Tomorrow is the next Full Moon":f+" days until <br>Full Moon")+"</h6>"),document.getElementById("calculator").innerHTML=b.join("")}a(new Date)}),angular.module("skyApp").factory("AjaxFactory",["$http",function(a){var b="https://api.aerisapi.com/sunmoon/moonphases",c="https://api.aerisapi.com/forecasts",d="https://api.aerisapi.com/places",e="client_id=H9lkzFagnWUs2WlbZEE2V&",f="client_secret=Li4Ckqn4kqNbvCLEZ56WYdeLpCNGHWnvQF470p4K",g="client_secret=7jKyBdQlgoqcwhBiG6j5Gi6mTFKMosXhlTgGbJLe",h="client_secret=blJoheGd4CpesekVsyRdxo6rPdhheM9hW2Ho6g1P",i={};return i.getWeather=function(b){return a.get(c+"/closest?p="+b.lat+","+b["long"]+"&"+e+g)},i.getLocation=function(b){return a.get(d+"/closest?p="+b.lat+","+b["long"]+"&"+e+h)},i.getMoon=function(c,d){return a.get(b+"?from="+c+"&to="+d+"&limit=50&"+e+f)},i.getCurrentMoon=function(b){return a.get("https://api.aerisapi.com/sunmoon?p="+b.lat+","+b["long"]+"&from=now&to=+1week&limit=7&"+e+f)},i}]),angular.module("skyApp").service("LocationService",function(){function a(a){b.lat=a.coords.latitude,b["long"]=a.coords.longitude,console.log(b)}var b={lat:"","long":"",location:""};return b.setCoordinates=function(a,c){b[a]=c},navigator.geolocation?window.navigator.geolocation.getCurrentPosition(a):alert("Geolocation is not supported by this browser."),b}),angular.module("skyApp").controller("MoonController",MoonController),MoonController.$inject=["AjaxFactory","$scope","$filter"],angular.module("skyApp").controller("CurrentMoonController",CurrentMoonController),CurrentMoonController.$inject=["AjaxFactory","$scope","LocationService"],angular.module("skyApp").controller("LocationController",LocationController),LocationController.$inject=["AjaxFactory","$scope","LocationService"],angular.module("skyApp").controller("WeatherController",WeatherController),WeatherController.$inject=["AjaxFactory","$scope","LocationService"],angular.module("skyApp").directive("header",function(){return{restrict:"E",templateUrl:"views/header.html"}}),angular.module("skyApp").directive("banner",function(){return{restrict:"E",templateUrl:"views/banner.html"}}),angular.module("skyApp").directive("calculator",function(){return{restrict:"E",templateUrl:"views/calculator.html"}}),angular.module("skyApp").directive("forecast",function(){return{restrict:"E",templateUrl:"views/forecast.html"}}),angular.module("skyApp").directive("sunmoon",function(){return{restrict:"E",templateUrl:"views/sunmoon.html"}}),angular.module("skyApp").directive("moonCalendar",function(){return{restrict:"E",templateUrl:"views/moonCalendar.html",link:function(){$(function(){$(".datepicker").datepicker({dateFormat:"yy-mm-dd"})})}}}),angular.module("skyApp").directive("infoModal",function(){return{restrict:"E",templateUrl:"views/infoModal.html"}}),angular.module("skyApp").run(["$templateCache",function(a){a.put("views/banner.html",'<div class="row moonImage"> <div class="col-xs-12 moonImageBackground"> <div class="col-xs-10 col-xs-offset-1"> <img src="images/moon.4d1a958a.jpg" width="1000" heigt="625"> </div> </div> </div>'),a.put("views/calculator.html",'<div class="row"> <div class="col-xs-8 col-xs-offset-2"> <div id="calculator"></div> <br> </div> </div>'),a.put("views/forecast.html",'<div class="row hideFromWatch"> <div class="col-xs-12"> <br> <ul class="nav nav-tabs"> <li class="active"><a data-toggle="tab" href="#weatherMenu">Weather</a></li> <li><a data-toggle="tab" href="#forecastMenu">Forecast</a></li> <li><a data-toggle="tab" href="#locationMenu">Location</a></li> </ul> <div class="tab-content"> <div id="weatherMenu" class="tab-pane fade in active"> <div ng-controller="WeatherController"> <h3>Weather Today</h3> <br> <p>{{ forecast.periods[0].validTime | date:\'longDate\' }}</p> <img ng-src="images/icons/{{ forecast.periods[0].icon }}" alt="Weather icon"> <p>{{ forecast.periods[0].weatherPrimary }}</p> <div class="table-responsive"> <table class="table table-hover"> <tbody> <tr> <th>Temperature</th> <td>{{ forecast.periods[0].avgTempC }} &deg;C</td> </tr> <tr> <th>Feels like</th> <td>{{ forecast.periods[0].feelslikeC}} &deg;C</td> </tr> <tr> <th>Sky cover percentage</th> <td>{{ forecast.periods[0].sky }} %</td> </tr> <tr> <th>Wind speed</th> <td>{{ forecast.periods[0].windSpeedKPH }} km/h</td> </tr> <tr> <th>Humidity</th> <td>{{ forecast.periods[0].humidity }} %</td> </tr> <tr> <th>Ultraviolet index</th> <td>{{ forecast.periods[0].uvi }} (varies from 0 to 12)</td> </tr> <tr> <th></th> <td></td> </tr> </tbody> </table> </div> </div> </div> <div id="forecastMenu" class="tab-pane fade"> <div ng-controller="WeatherController"> <h3>7 days forecast</h3> <br> <div class="table-responsive"> <table class="table table-hover"> <thead> <tr> <th>Date</th> <th>{{ forecast.periods[0].validTime | date:\'dd.MM.\' }}</th> <th>{{ forecast.periods[1].validTime | date:\'dd.MM.\' }}</th> <th>{{ forecast.periods[2].validTime | date:\'dd.MM.\' }}</th> <th>{{ forecast.periods[3].validTime | date:\'dd.MM.\' }}</th> <th>{{ forecast.periods[4].validTime | date:\'dd.MM.\' }}</th> <th>{{ forecast.periods[5].validTime | date:\'dd.MM.\' }}</th> <th>{{ forecast.periods[6].validTime | date:\'dd.MM.\' }}</th> </tr> </thead> <tbody> <tr> <td></td> <td>{{ forecast.periods[0].validTime | date:\'EEEE\' }}</td> <td>{{ forecast.periods[1].validTime | date:\'EEEE\' }}</td> <td>{{ forecast.periods[2].validTime | date:\'EEEE\' }}</td> <td>{{ forecast.periods[3].validTime | date:\'EEEE\' }}</td> <td>{{ forecast.periods[4].validTime | date:\'EEEE\' }}</td> <td>{{ forecast.periods[5].validTime | date:\'EEEE\' }}</td> <td>{{ forecast.periods[6].validTime | date:\'EEEE\' }}</td> </tr> <tr> <th>Forecast</th> <td><img ng-src="images/icons/{{ forecast.periods[0].icon }}" alt="Weather icon"> <br>{{ forecast.periods[0].weatherPrimary }}</td> <td><img ng-src="images/icons/{{ forecast.periods[1].icon }}" alt="Weather icon"> <br>{{ forecast.periods[1].weatherPrimary }}</td> <td><img ng-src="images/icons/{{ forecast.periods[2].icon }}" alt="Weather icon"> <br>{{ forecast.periods[2].weatherPrimary }}</td> <td><img ng-src="images/icons/{{ forecast.periods[3].icon }}" alt="Weather icon"> <br>{{ forecast.periods[3].weatherPrimary }}</td> <td><img ng-src="images/icons/{{ forecast.periods[4].icon }}" alt="Weather icon"> <br>{{ forecast.periods[4].weatherPrimary }}</td> <td><img ng-src="images/icons/{{ forecast.periods[5].icon }}" alt="Weather icon"> <br>{{ forecast.periods[5].weatherPrimary }}</td> <td><img ng-src="images/icons/{{ forecast.periods[6].icon }}" alt="Weather icon"> <br>{{ forecast.periods[6].weatherPrimary }}</td> </tr> <tr> <th>Temperature</th> <td>{{ forecast.periods[0].avgTempC }} &deg;C</td> <td>{{ forecast.periods[1].avgTempC }} &deg;C</td> <td>{{ forecast.periods[2].avgTempC }} &deg;C</td> <td>{{ forecast.periods[3].avgTempC }} &deg;C</td> <td>{{ forecast.periods[4].avgTempC }} &deg;C</td> <td>{{ forecast.periods[5].avgTempC }} &deg;C</td> <td>{{ forecast.periods[6].avgTempC }} &deg;C</td> </tr> <tr> <th>Wind Speed</th> <td>{{ forecast.periods[0].windSpeedKPH }} km/h</td> <td>{{ forecast.periods[1].windSpeedKPH }} km/h</td> <td>{{ forecast.periods[2].windSpeedKPH }} km/h</td> <td>{{ forecast.periods[3].windSpeedKPH }} km/h</td> <td>{{ forecast.periods[4].windSpeedKPH }} km/h</td> <td>{{ forecast.periods[5].windSpeedKPH }} km/h</td> <td>{{ forecast.periods[6].windSpeedKPH }} km/h</td> </tr> <tr> <th></th> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody> </table> </div> </div> </div> <div id="locationMenu" class="tab-pane fade" ng-controller="LocationController"> <h3>Location</h3> <br> <span class="glyphicon glyphicon-map-marker"></span> <p>{{ location.place.name }}, {{ location.place.countryFull }}</p> <p>{{ location.loc.lat | limitTo:5 }} &deg;N | {{ location.loc.long | limitTo:5 }} &deg;E</p> <br> <!--<button ng-click="coords.coordinates()">Get Coordinates</button>--> </div> </div></div></div>'),a.put("views/header.html",'<div class="header hideFromWatch"> <nav class="navbar navbar-default navbar-fixed-top"> <h3 class="text-muted">NightSky</h3> </nav> </div>'),a.put("views/infoModal.html",'<!-- Modal--> <div id="infoModal" class="modal fade" role="dialog"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Info</h4> </div> <div class="modal-body"> <h4>How to use Moon Calendar</h4> <ol> <li>Choose two dates between the period you are looking for different moon phases.</li> <li>Click Search -button.</li> </ol> <br> <h4>Moon phases</h4> <ul> <li>New Moon - not visible, also called the Dark Moon</li> <li>Waxing Crescent</li> <li>First Quarter - commonly called a Half Moon</li> <li>Waxing Gibbous</li> <li>Full Moon - we can see the entire illuminated portion of the moon</li> <li>Waning Gibbous</li> <li>Third Quarter - another Half Moon, but the illuminated part is opposite of the First Quarter</li> <li>Waning Crescent</li> <li>New Moon - back to the beginning</li> </ul> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div>'),a.put("views/moonCalendar.html",'<div class="row hideFromWatch"> <div class="col-lg-12"> <div ng-controller="MoonController"> <h3>Moon Calendar</h3> <div class="row"> <div class="col-sm-6"> <h4>From</h4> <div class="input-group date" data-provide="datepicker"> <input type="text" class="datepicker form-control" data-date-format="yy-mm-dd" ng-model="from"> <div class="input-group-addon"> <span class="glyphicon glyphicon-th"></span> </div> </div> </div> <div class="col-sm-6"> <h4>To</h4> <div class="input-group date" data-provide="datepicker"> <input type="text" class="datepicker form-control" data-date-format="yy-mm-dd" ng-model="to"> <div class="input-group-addon"> <span class="glyphicon glyphicon-th"></span> </div> </div> </div> </div> <br> <button type="button" class="btn btn-md btn-default" ng-click="getMoon()">Search</button> <button type="button" class="btn btn-md btn-default" data-toggle="modal" data-target="#infoModal"><span class="glyphicon glyphicon-question-sign"></span></button> <br><br> <div class="table-responsive"> <table class="table table-hover"> <tbody> <tr> <th>Date</th> <th>Moon phase</th> </tr> <tr id="moonInfo" ng-repeat="moon in moons"> <td>{{ moon.dateTimeISO | date:\'longDate\' }}</td> <td class="capitalized">{{ moon.name }}</td> </tr> </tbody> </table> <hr> </div> </div> </div></div>'),a.put("views/sunmoon.html",'<div class="row hideFromWatch"> <div class="col-lg-12"> <div ng-controller="CurrentMoonController"> <!--\r\n	<p>First Quarter &#9789;</p>\r\n	<p>New Moon &#9899;</p>\r\n	<p>Last Quarter &#9790;</p>\r\n	<p>Full Moon &#9898;</p>\r\n	--> <br> <ul class="nav nav-tabs"> <li class="active"><a data-toggle="tab" href="#moonMenu">Moon</a></li> <li><a data-toggle="tab" href="#sunMenu">Sun</a></li> </ul> <div class="tab-content"> <div id="moonMenu" class="tab-pane fade in active"> <h3>Moon Today</h3> <h1 class="moonsymbol">&#9790;</h1> <div class="table-responsive"> <table class="table table-hover"> <tbody> <tr> <th>Moon phase name</th> <td class="capitalized">{{ moonInfo.moon.phase.name | lowercase }}</td> </tr> <tr> <th>Moon percentage of illumination</th> <td>{{ moonInfo.moon.phase.illum }} %</td> </tr> <tr> <th>Age of the moon phase</th> <td>{{ moonInfo.moon.phase.age }} days</td> </tr> <tr> <th>Moon phase angle</th> <td>{{ moonInfo.moon.phase.angle * 100}}&deg; (varies from 0&deg; to 180&deg;)</td> </tr> <tr> <th></th> <td></td> </tr> </tbody> </table> </div> </div> <div id="sunMenu" class="tab-pane fade"> <h3>Sun Today</h3> <h1 class="moonsymbol">&#9925;</h1> <div class="table-responsive"> <table class="table table-hover"> <tbody> <tr> <th>Sunrise</th> <td>{{ moonInfo.sun.rise *1000 | date:\'mediumTime\' }}</td> </tr> <tr> <th>Sunset</th> <td>{{ moonInfo.sun.set * 1000 | date:\'mediumTime\' }}</td> </tr> <tr> <th></th> <td></td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div>')}]);