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
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        RestangularProvider.setBaseUrl('http://10.30.60.165:3000');

    });
