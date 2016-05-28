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
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
      })
      .when('/account/new', {
        templateUrl: 'views/account/newAccount.html',
        controller: 'NewaccountCtrl',
      })
      .when('/account/:accountId', {
        templateUrl: 'views/budget.html',
        controller: 'BudgetCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

