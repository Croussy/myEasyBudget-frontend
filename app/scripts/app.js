'use strict';

/**
 * @ngdoc overview
 * @name myEasyBudgetFrontendApp
 * @description
 * # myEasyBudgetFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('myEasyBudgetFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/account/account.html',
        controller: 'AccountCtrl'
      })
      .when('/account/new', {
        templateUrl: 'views/account/newAccount.html',
        controller: 'AccountCtrl'
      })
      .when('/account/:accountId/edit', {
        templateUrl: 'views/account/updateAccount.html',
        controller: 'AccountCtrl'
      })
      .when('/account/:accountId', {
        templateUrl: 'views/budget/budget.html',
        controller: 'BudgetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

