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
      .when('/account/:account_id', {
        templateUrl: 'views/budget/budget.html',
        controller: 'BudgetCtrl'
      })
      .when('/account/:account_id/budget/new', {
        templateUrl: 'views/budget/newBudget.html',
        controller: 'BudgetCtrl'
      })
      .when('/account/:account_id/budget/:budget_id/edit', {
        templateUrl: 'views/budget/editBudget.html',
        controller: 'BudgetCtrl'
      })
      .when('/account/:account_id/budget/:budget_id', {
        templateUrl: 'views/budget/showBudget.html',
        controller: 'BudgetCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/project/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/project/new', {
        templateUrl: 'views/project/newProject.html',
        controller: 'ProjectCtrl'
      })
      .when('/project/:project_id/edit', {
        templateUrl: 'views/project/editProject.html',
        controller: 'ProjectCtrl'
      })
      .when('/account/:account_id/budget/:budget_id/goal_category/new', {
        templateUrl: 'views/goalCategory/form.html',
        controller: 'GoalCategoryCtrl'
      })
      .when('/account/:account_id/budget/:budget_id/goal_category/:goal_category_id/edit', {
        templateUrl: 'views/goalCategory/editGoal.html',
        controller: 'GoalCategoryCtrl'
      })
      .when('/account/:account_id/budget/:budget_id/purchase/new', {
        templateUrl: 'views/purchase/newPurchase.html',
        controller: 'PurchaseCtrl'
      })
      .when('/account/:account_id/budget/:budget_id/purchase/:purchase_id/edit', {
        templateUrl: 'views/purchase/editPurchase.html',
        controller: 'PurchaseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

