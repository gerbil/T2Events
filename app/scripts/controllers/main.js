'use strict';

/**
 * @ngdoc function
 * @name t2EventsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the t2EventsApp
 */
angular.module('t2EventsApp')

    .controller('MainCtrl', function ($scope, Restangular, $interval, $location) {

        // Today events +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        function refreshData() {

            //Determines the time zone of the browser client
            //tz lib or ECMA 6 Intl API for modern browsers
            //var tz = jstz.determine();
            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // We need current timestamp for display
            $scope.currentTime = moment().tz(timeZone).format('HH:mm');

            // Create today date string for backend query
            // Minus 2 hours based on Outlook API
            var today = moment().tz(timeZone).subtract(2, 'hour').format('YYYY-MM-DDTHH:mm:ss');

            // Create tomorrow date string for backend query
            var tomorrow = moment().tz(timeZone).format('YYYY-MM-DDT23:59:59');

            // Rest API communication -> get calendarview using startdatetime and enddatetime
            Restangular.all('rooms/calendar').getList({'startDateTime': today, 'endDateTime': tomorrow})
                .then(function (results) {
                    // Fetch only one scheduled event
                    $scope.nextEvent = results[0].value[0];
                    // If there are no events today -> skip, otherwise change timezone for LV or SWE, also change meetingText
                    //TODO : auto timezone change
                    if ($scope.nextEvent) {
                        // LV settings for a timezone
                        $scope.nextEvent.Start = moment($scope.nextEvent.Start).format('HH:mm');
                        $scope.nextEvent.End = moment($scope.nextEvent.End).format('HH:mm');
                        $scope.nextEvent.time = $scope.nextEvent.Start + ' - ' + $scope.nextEvent.End;
                        $scope.meetingText = ($scope.nextEvent.Start) > $scope.currentTime ? 'Next meeting' : 'Current meeting';

                        var currentTime = moment($scope.currentTime, 'HH:mm');
                        var startTime = moment($scope.nextEvent.Start, 'HH:mm');
                        var endTime = moment($scope.nextEvent.End, 'HH:mm');

                        //Meeting will start in, else meeting will end in
                        if (currentTime > startTime) {
                            $scope.status = 'busy';
                            $scope.meetingWill = 'Ends in ' + moment.preciseDiff(currentTime, endTime);
                        } else {
                            $scope.status = 'free';
                            $scope.meetingWill = 'Starts in ' + moment.preciseDiff(currentTime, startTime);
                        }

                    } else {
                        $scope.meetingText = 'No more meetings today';
                    }
                });
        }

        // Auto start
        refreshData();

        // Promise should be created to be deleted afterwards
        var promise = $interval(refreshData, 100000);

        // Cancel interval on page changes
        $scope.$on('$destroy', function () {
            if (angular.isDefined(promise)) {
                $interval.cancel(promise);
                promise = undefined;
            }
        });
        // Data refresh end

        // Retrieve resource statuses from local storage
        $scope.beamer = localStorage.getItem('beamer') ? localStorage.getItem('beamer') : 'working';
        $scope.whiteboard = localStorage.getItem('whiteboard') ? localStorage.getItem('whiteboard') : 'working';
        $scope.light = localStorage.getItem('light') ? localStorage.getItem('light') : 'working';

        $scope.setStatus = function (resource, status) {
            $scope[resource] = status;
            // Put status into storage
            localStorage.setItem(resource, status);

            // Send email if broken
            if (status === 'broken') {
                var post = {'room': 'Versailles', 'resource': resource};
                // Rest API communication -> send email to ServiceDesk with room name and resource info
                Restangular.all('broken').post(post)
                    .then(function () {
                        //console.info(results);
                    });
            }
        };

        $scope.openInfo = function(view) {
            $location.path(view); // path not hash
            //console.info('clicked for a view -> ' + view);
        };

    })

    // event stopPropagation directive to stop click event from firing parent's click events
    .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                });
            }
        };
    });

