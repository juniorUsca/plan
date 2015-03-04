'use strict';

/**
 * @ngdoc overview
 * @name buscadorApp
 * @description
 * # buscadorApp
 *
 * Main module of the application.
 */
angular
  .module('planApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        title: 'Inicio',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        title: 'About',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/personal/worker-list', {
        title: 'Trabajadores',
        templateUrl: 'views/worker/worker-list.html',
        controller: 'WorkerListCtrl'
      })
      .when('/personal/worker-creation', {
        title: 'Nuevo Trabajador',
        templateUrl: 'views/worker/worker-creation.html',
        controller: 'WorkerCreationCtrl'
      })
      .when('/personal/worker-detail/:id', {
        title: 'Editando Trabajador',
        templateUrl: 'views/worker/worker-creation.html',
        controller: 'WorkerDetailCtrl',
        resolve: {
          _target: function(Restangular, $route) {
            return Restangular.one('worker', $route.current.params.id).get();
          }
        }
      })
      
      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider
      .setBaseUrl('http://localhost:1337/')
      //.setBaseUrl('http://192.168.42.85:1337/')
      //.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
      /*.setRestangularFields({
        id: '_id.$oid'
      })*/
      .setRequestInterceptor(function(elem, operation, what) {
        if (operation === 'put') {
          elem.id = undefined;
          return elem;
        }
        return elem;
      });
  })
  .run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
  }]);

angular.module('planApp')
  .controller('MyCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    }
  });
