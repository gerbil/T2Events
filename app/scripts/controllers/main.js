'use strict';

/**
 * @ngdoc function
 * @name t2EventsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the t2EventsApp
 */
angular.module('t2EventsApp')

    .controller('MainCtrl', function ($scope, Restangular, $interval) {

        // Today events +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        function refreshData() {
            // We need current timestamp for display
            var date = new Date();
            var minutes = date.getMinutes();
            minutes = minutes > 9 ? minutes : '0' + minutes;
            $scope.currentTime = date.getHours() + ':' + minutes;
            // Create today date string for backend query
            var today = Date.today().toFormat('YYYY-MM-DDT');
            // Add leading zeros and Z for timestamp outlook API
            today = today + $scope.currentTime + ':00Z';
            // Create tomorrow date string for backend query
            var tomorrow = Date.today().toFormat('YYYY-MM-DDT23:59:59Z');

            Restangular.all('calendar').getList({'startDateTime': today, 'endDateTime': tomorrow})
                .then(function (results) {
                    $scope.nextEvent = results[0].value[0];

                    $scope.nextEvent.Start = new Date(Date.parse($scope.nextEvent.Start)).removeHours(1).toFormat('HH24:MI');
                    $scope.nextEvent.End = new Date(Date.parse($scope.nextEvent.End)).removeHours(1).toFormat('HH24:MI');

                    $scope.meetingText = ($scope.nextEvent.Start) > $scope.currentTime ? 'Next meeting' : 'Current meeting';
                });
        };

        refreshData();

        // Promise should be created to be deleted afterwards
        var promise = $interval(refreshData, 25000);

        // Cancel interval on page changes
        $scope.$on('$destroy', function () {
            if (angular.isDefined(promise)) {
                $interval.cancel(promise);
                promise = undefined;
            }
        });
        // Data refresh end



    });



