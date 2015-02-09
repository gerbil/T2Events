'use strict';

/**
 * @ngdoc function
 * @name t2EventsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the t2EventsApp
 */
angular.module('t2EventsApp')

    .controller('MainCtrl', function ($scope, Restangular) {

        // Today events +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        var today = Date.today().toFormat('YYYY-MM-DD');
        var tomorrow = Date.tomorrow().toFormat('YYYY-MM-DD');

        var date = new Date();
        var minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;
        $scope.currentTime = date.getHours() + ':' + minutes;

        Restangular.all('calendar').getList({'startDateTime': today, 'endDateTime': tomorrow})
            .then(function (results) {
                $scope.events = results[0];
                $scope.nextEvent = results[0].value[0];

                var nextEventStartHours = new Date(Date.parse($scope.nextEvent.Start)).getHours();
                var nextEventStartMinutes = new Date(Date.parse($scope.nextEvent.Start)).getMinutes();
                nextEventStartMinutes = nextEventStartMinutes > 9 ? nextEventStartMinutes : '0' + nextEventStartMinutes;
                $scope.nextEvent.Start = nextEventStartHours + ':' + nextEventStartMinutes;

                var nextEventEndHours = new Date(Date.parse($scope.nextEvent.End)).getHours();
                var nextEventEndMinutes = new Date(Date.parse($scope.nextEvent.End)).getMinutes();
                nextEventEndMinutes = nextEventEndMinutes > 9 ? nextEventEndMinutes : '0' + nextEventEndMinutes;
                $scope.nextEvent.End = nextEventEndHours + ':' + nextEventEndMinutes;


                $scope.meetingText = $scope.currentTime <  (nextEventEndHours + ':' + nextEventEndMinutes) ? 'Next meeting' : 'Current meeting';
            });

    });



