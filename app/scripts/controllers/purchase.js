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

    $scope.init_create = function() {
      $scope.purchases = [];
      $scope.purchase = {};

      serviceAjax.get_all_goals_category_budget($scope.budget_id).success(function(data){
        $scope.goals_categories = data;
      }).error(function(status){
        console.log(status);
      });

      serviceAjax.get_budget($scope.budget_id).success(function(data){
        $scope.budget = data;
      }).error(function(status){
        console.log(status);
      });
    };

    $scope.create_purchase = function() {
      $scope.purchase.budgetId = $scope.budget_id;
      $scope.budget.amount -= $scope.purchase.amountPurchase;
      serviceAjax.create_purchase($scope.purchase).success(function(data) {
        $scope.purchases.push(data);
        $scope.purchase = {};
        add_amount_goal(data);
      }).error(function(status) {
        console.log(status);
      });
    };

    $scope.delete = function(event) {
      var id = $(event.currentTarget).attr("data-id");
      serviceAjax.delete_purchase(id).success(function() {
        delete_purchase(id);
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
      var goal_category = find_list($scope.purchase.goalCategoryId, $scope.goals_category);
      goal_category.amountCateg = goal_category.amountCateg - $scope.purchase_amount;

      serviceAjax.update_budget_amount({"id": $scope.budget_id, "amount": $scope.purchase_amount});

      serviceAjax.edit_goal_category(goal_category, goal_category.id).success(function() {
        serviceAjax.update_purchase($scope.purchase, $routeParams.purchase_id).success(function() {
          return $location.path('/account/'+ $scope.account_id +'/budget/'+ $scope.budget_id)
        }).error(function(status) {
          console.log(status);
        });
      }).error(function(status) {
        console.log(status);
      });
    };

    $scope.getPercentage = function(amount, target_amount) {
      return Math.round((amount * 100) / target_amount);
    };

    var find_list = function(id, arrayJson) {
      var res = null;
      angular.forEach(arrayJson, function(object) {
        if(object.id == id) {
          res = object;
        }
      });
      return res;
    };

    var add_amount_goal = function(purchase) {
      var goals = $scope.goals_categories;
      for (var i = 0; i < goals.length; i++) {
        if(goals[i].id == purchase.goalCategoryId) {
          goals[i].amountCateg += purchase.amountPurchase;
        }
      }
    };

    var delete_purchase = function(id) {
      var dataJson = $scope.purchases;
      var goals = $scope.goals_categories;

      for (var j = 0; j < dataJson.length; j++) {
        if(dataJson[j].id == id) {
          for (var i = 0; i < goals.length; i++) {
            if(goals[i].id == dataJson[j].goalCategoryId) {
              goals[i].amountCateg -= dataJson[j].amountPurchase;
            }
          }
          $scope.budget.amount += dataJson[j].amountPurchase;
          dataJson.splice(j,1);
        }
      }
    };

    $scope.get_name_goal = function(id_goal) {
      var goal = find_list(id_goal, $scope.goals_categories);
      return goal.nameCategory;
    };
  });
