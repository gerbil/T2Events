'use strict';

/**
 * @ngdoc overview
 * @name t2EventsApp
 * @description
 * # t2EventsApp
 *
 * Main module of the application.
 */
angular
    .module('t2EventsApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'restangular',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider, RestangularProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/info', {
                templateUrl: 'views/info.html',
                controller: 'InfoCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        RestangularProvider.setBaseUrl('http://10.30.60.165:3000');

    });
