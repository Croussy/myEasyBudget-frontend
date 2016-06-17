'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:PurchaseCtrl
 * @description
 * # PurchaseCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('PurchaseCtrl', function ($scope, serviceAjax, $location, $routeParams) {
    $scope.account_id = $routeParams.account_id;
    $scope.budget_id = $routeParams.budget_id;

    $scope.form_purchase = function() {
      serviceAjax.get_all_goals_category_budget($scope.budget_id).success(function(data, status) {
        $scope.goals_category = data;
      }).error(function(status) {
        console.log(status);
      });
    };

    $scope.create_purchase = function() {
      var purchaseJson = {
        "namePurchase": $scope.registerForm.name_purchase.$modelValue,
        "amountPurchase": $scope.registerForm.amount_purchase.$modelValue,
        "nameSeller": $scope.registerForm.name_seller.$modelValue,
        "goalCategoryId": $scope.registerForm.category.$modelValue,
        "date_purchase": $scope.registerForm.date_purchase.$modelValue,
        "budgetId": $scope.budget_id
      };

      serviceAjax.create_purchase(purchaseJson).success(function() {
        return $location.path('/account/'+ $scope.account_id +'/budget/'+ $scope.budget_id)
      }).error(function(status) {
        console.log(status);
      });
    };

    $scope.edit = function() {
      serviceAjax.get_purchase($routeParams.purchase_id).success(function(data) {
        $scope.purchase = data;
        $scope.purchase.date_purchase = new Date(data.date_purchase);
        $scope.purchase_amount = data.amountPurchase;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.edit_purchase = function() {
      var purchaseJson = {
        "namePurchase": $scope.registerForm.name_purchase.$modelValue,
        "amountPurchase": $scope.registerForm.amount_purchase.$modelValue,
        "nameSeller": $scope.registerForm.name_seller.$modelValue,
        "goalCategoryId": $scope.registerForm.category.$modelValue,
        "date_purchase": $scope.registerForm.date_purchase.$modelValue,
        "budgetId": $scope.budget_id
      };

      var goal_category = get_goal_category(purchaseJson.goalCategoryId);
      goal_category.amountCateg = goal_category.amountCateg - $scope.purchase_amount;

      serviceAjax.edit_goal_category(goal_category, goal_category.id).success(function() {
        serviceAjax.update_purchase(purchaseJson, $routeParams.purchase_id).success(function() {
          return $location.path('/account/'+ $scope.account_id +'/budget/'+ $scope.budget_id)
        }).error(function(status) {
          console.log(status);
        });
      }).error(function(status) {
        console.log(status);
      });


    };

    var get_goal_category = function(id) {
      var res = null;
      angular.forEach($scope.goals_category, function(category) {
        if(category.id == id) {
          res = category;
        }
      });
      return res;
    };

  });
