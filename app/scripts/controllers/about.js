'use strict';

/**
 * @ngdoc function
 * @name t2EventsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the t2EventsApp
 */
angular.module('t2EventsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
