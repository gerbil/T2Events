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

        var today = Date.today().toFormat('YYYY-MM-DDT');
        var tomorrow = Date.today().toFormat('YYYY-MM-DDT23:59:59Z');

        var date = new Date();
        var minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;
        $scope.currentTime = date.getHours() + ':' + minutes;

        today = today + $scope.currentTime + ':00Z';

        Restangular.all('calendar').getList({'startDateTime': today, 'endDateTime': tomorrow})
            .then(function (results) {
                $scope.nextEvent = results[0].value[0];

                $scope.nextEvent.Start = new Date(Date.parse($scope.nextEvent.Start)).removeHours(1).toFormat('HH24:MI');
                $scope.nextEvent.End = new Date(Date.parse($scope.nextEvent.End)).removeHours(1).toFormat('HH24:MI');

                $scope.meetingText = ($scope.nextEvent.Start) > $scope.currentTime ? 'Next meeting' : 'Current meeting';
            });

    });



