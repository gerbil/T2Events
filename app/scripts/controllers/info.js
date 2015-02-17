'use strict';

/**
 * @ngdoc function
 * @name t2EventsApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the t2EventsApp
 */
angular.module('t2EventsApp')

    .controller('InfoCtrl', function ($scope, Restangular) {
        //Determines the time zone of the browser client
        //tz lib or ECMA 6 Intl API for modern browsers
        //var tz = jstz.determine();
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Create today date string for backend query
        var today = moment().tz(timeZone).format('YYYY-MM-DDT00:00:00');

        // Create tomorrow date string for backend query
        var tomorrow = moment().tz(timeZone).format('YYYY-MM-DDT23:59:59');

        // Rest API communication -> get calendarview using startdatetime and enddatetime
        Restangular.all('rooms/calendar').getList({'startDateTime': today, 'endDateTime': tomorrow})
            .then(function (results) {
                // Fetch only one scheduled event
                $scope.todayEvents = results[0];
            });
    });