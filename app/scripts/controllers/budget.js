'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:BudgetCtrl
 * @description
 * # BudgetCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('BudgetCtrl', function ($scope, serviceAjax, $location, $routeParams) {
    $scope.id = $routeParams.account_id;
    $scope.budget_id = $routeParams.budget_id;

    $scope.index = function() {
      serviceAjax.getAccount($scope.id).success(function(data, status) {
        $scope.account = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });

      serviceAjax.getAllBudgets($scope.id).success(function(data, status) {
        $scope.budgets = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.goal_objective = function() {
      console.log("test");
      console.log($scope);
      serviceAjax.get_all_categories().success(function(data, status) {
        return $scope.categories = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.objectif = function() {
      console.log("test objective");
    };

    $scope.edit = function() {
      $scope.action = "edit";
      serviceAjax.get_budget($routeParams.budget_id).success(function(data, status) {
        $scope.budget = data;
        $scope.budget.date_deb = new Date(data.dateDeb);
        $scope.budget.date_end = new Date(data.dateEnd);
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.editBudget = function() {
      return serviceAjax.edit_budget($scope.budget, $routeParams.budget_id).success(function() {
        return $location.path('/account/'+ $scope.id);
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.createBudget = function() {
      var budgetJson = {
        'accountId': $scope.id,
        'name': $scope.registerForm.name_budget.$modelValue,
        "target_amount": $scope.registerForm.target_amount.$modelValue,
        "amount": $scope.registerForm.target_amount.$modelValue,
        "dateDeb": $scope.registerForm.date_deb.$modelValue,
        "dateEnd": $scope.registerForm.date_end.$modelValue,
        "isClosure": false
      };

      return serviceAjax.create_budget(budgetJson).success(function(data) {
        return $location.path('/account/'+$scope.id+'/budget/'+ data.id + '/goal_category/new');
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.delete = function(event) {
      var id = $(event.currentTarget).attr("data-id");
      return serviceAjax.delete_budget(id).success(function() {
        return $location.path('/account/'+ $scope.id)
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.show = function() {
      var id = $routeParams.budget_id;
      serviceAjax.get_budget(id).success(function(data, status){
        $scope.budget = data;
        hightchart();
      }).error(function(status) {
        return console.log(status);
      });

      serviceAjax.get_all_goals_category_budget($scope.budget_id).success(function(data){
        $scope.goals_categories = data;
        serviceAjax.get_all_categories().success(function(data) {
          var number = data.length;
          var find = false;
          angular.forEach(data, function(category) {
            angular.forEach($scope.goals_categories, function(goal) {
              if(goal.categoryId == category.id) {
                find = true;
              }
            });
            if(find == true) {
              --number;
              find = false;
            }
          });
          $scope.number_category = number;
        }).error(function(status) {
          console.log("error");
          console.log(status);
        });
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.getPercentage = function(amount, target_amount) {
      return Math.round((amount * 100) / target_amount);
    };

    $scope.get_status = function(amount, target_amount) {
      return 100 - $scope.getPercentage(amount, target_amount);
    };

    $scope.show_purchases = function() {
      serviceAjax.get_all_purchase($scope.budget_id).success(function(data) {
        $scope.purchases = data;
      }).error(function(status){
        console.log(status);
      });
    };

    $scope.get_name_category = function(id) {
      var res = null;
      angular.forEach($scope.goals_categories, function(category) {
        if(category.id == id) {
          res = category.nameCategory;
        }
      });
      return res;
    };

    var hightchart = function() {
      serviceAjax.get_all_goals_category_budget($scope.budget_id).success(function(data) {
        var data_hightchart = [];

        angular.forEach(data, function(goal) {
          if(goal.nameCategory != 'Autre catégorie') {
            data_hightchart.push([goal.nameCategory, goal.amountCateg]);
          } else if (goal.amountCateg > 0) {
            data_hightchart.push([goal.nameCategory, goal.amountCateg]);
          }
        });

        Highcharts.chart('containerChart', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          title: {
            text: 'Répartition<br>des<br>categories',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0px 1px 2px black'
                }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%']
            }
          },
          series: [{
            type: 'pie',
            name: 'Répartition categories',
            innerSize: '50%',
            data: data_hightchart
          }]
        });
      }).error(function(status) {
        console.log(status);
      });
    }
  });


