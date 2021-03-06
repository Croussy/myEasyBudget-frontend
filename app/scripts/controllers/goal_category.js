'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:GoalCategoryCtrl
 * @description
 * # GoalCategoryCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('GoalCategoryCtrl', function ($scope, serviceAjax, $location, $routeParams) {
    $scope.id = $routeParams.budget_id;
    $scope.account_id = $routeParams.account_id;

    $scope.form = function() {
      serviceAjax.get_all_goals_category_budget($scope.id).success(function(data, status) {
        $scope.goals_category = data;
        serviceAjax.get_all_categories().success(function(data, status) {
          $scope.categories = [];
          var find = false;
          angular.forEach(data, function(category) {
            angular.forEach($scope.goals_category, function(goal) {
              if(goal.categoryId == category.id) {
                find = true;
              }
            });
            if(find == false) {
              $scope.categories.push(category);
            } else {
              find = false;
            }
          });
        }).error(function(status) {
          console.log("error");
          console.log(status);
        });
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });


      $scope.add_goal = function() {
        var goalJson = {
          "targetAmountCateg": $scope.new_goal.target_amount,
          "amountCateg": 0,
          "nameCategory": get_name_category($scope.new_goal.category_id),
          "categoryId": $scope.new_goal.category_id
        };
        serviceAjax.create_goal_category_budget($scope.id, goalJson).success(function(data) {
          deleteJson($scope.categories, $scope.new_goal.category_id);
          $scope.goals_category[0].targetAmountCateg -= data.targetAmountCateg;
          goalJson.id = data.id;
          $scope.new_goal.target_amount = null;
          $scope.new_goal.category_id = null;
          return $scope.goals_category.push(goalJson);
        }).error(function(status) {
          console.log("error");
          console.log(status);
        });
      };

      var get_name_category = function(id) {
        var res = null;
        angular.forEach($scope.categories, function(category) {
          if(category.id == id) {
            res = category.nameCategory;
          }
        });
        return res;
      };

      $scope.delete = function(event) {
        var id = $(event.currentTarget).attr("data-id");

        angular.forEach($scope.goals_category, function(goal) {
          if(goal.id == id) {
            $scope.goals_category[0].targetAmountCateg += goal.targetAmountCateg;
            serviceAjax.get_category(goal.categoryId).success(function(data) {
              $scope.categories.push(data);
            });
          }
        });

        serviceAjax.delete_goal_category(id).success(function() {
          deleteJson($scope.goals_category, id);
        }).error(function(status) {
          return console.log(status);
        });
      };

      var deleteJson = function(dataJson, id) {
        for (var i = 0; i < dataJson.length; i++) {
          if(dataJson[i].id == id) {
            dataJson.splice(i,1);
          }
        }
      };

    };

    $scope.edit = function() {
      serviceAjax.get_goal_category($routeParams.goal_category_id).success(function (data) {
        $scope.goal_category = data;
        $scope.old_goal_category = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.editGoal = function() {
      serviceAjax.update_other_category({"budget_id": $scope.budget_id, "amount": $scope.old_goal_category.targetAmountCateg});
      serviceAjax.edit_goal_category($scope.goal_category, $scope.goal_category.id).success(function () {
        return $location.path('/account/'+ $scope.account_id + '/budget/'+ $scope.id);
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };
  });
