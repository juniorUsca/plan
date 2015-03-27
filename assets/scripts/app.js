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
      .when('/administration/worker-list', {
        title: 'Trabajadores',
        templateUrl: 'views/worker/worker-list.html',
        controller: 'WorkerListCtrl'
      })
      .when('/administration/worker-creation', {
        title: 'Nuevo Trabajador',
        templateUrl: 'views/worker/worker-creation.html',
        controller: 'WorkerCreationCtrl'
      })
      .when('/administration/worker-edit/:id', {
        title: 'Editando Trabajador',
        templateUrl: 'views/worker/worker-creation.html',
        controller: 'WorkerEditCtrl',
        resolve: {
          _target: function(Restangular, $route) {
            return Restangular.one('worker', $route.current.params.id).get();
          }
        }
      })

      .when('/administration/goal-list', {
        title: 'Metas',
        templateUrl: 'views/goal/goal-list.html',
        controller: 'GoalListCtrl'
      })
      .when('/administration/goal-creation', {
        title: 'Nueva Meta',
        templateUrl: 'views/goal/goal-creation.html',
        controller: 'GoalCreationCtrl'
      })
      .when('/administration/goal-edit/:id', {
        title: 'Editando Meta',
        templateUrl: 'views/goal/goal-creation.html',
        controller: 'GoalEditCtrl',
        resolve: {
          _target: function(Restangular, $route) {
            return Restangular.one('goal', $route.current.params.id).get();
          }
        }
      })

      .when('/administration/payroll-list', {
        title: 'Planillas',
        templateUrl: 'views/payroll/payroll-list.html',
        controller: 'PayrollListCtrl'
      })
      .when('/administration/payroll-creation', {
        title: 'Nueva Planilla',
        templateUrl: 'views/payroll/payroll-creation.html',
        controller: 'PayrollCreationCtrl'
      })
      .when('/administration/payroll-edit/:id', {
        title: 'Editando Planilla',
        templateUrl: 'views/payroll/payroll-creation.html',
        controller: 'PayrollEditCtrl',
        resolve: {
          _target: function(Restangular, $route) {
            return Restangular.one('payroll', $route.current.params.id).get();
          }
        }
      })
      
      .when('/administration/resource-list', {
        title: 'Recursos',
        templateUrl: 'views/resource/resource-list.html',
        controller: 'ResourceListCtrl'
      })
      .when('/administration/resource-creation', {
        title: 'Nuevo Recurso',
        templateUrl: 'views/resource/resource-creation.html',
        controller: 'ResourceCreationCtrl'
      })
      .when('/administration/resource-edit/:id', {
        title: 'Editando Recurso',
        templateUrl: 'views/resource/resource-creation.html',
        controller: 'ResourceEditCtrl',
        resolve: {
          _target: function(Restangular, $route) {
            return Restangular.one('resource', $route.current.params.id).get();
          }
        }
      })

      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider
      .setBaseUrl('http://localhost:1337/')
      //.setBaseUrl('http://192.168.1.43:1337/')
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
