'use strict';

/**
 * @ngdoc directive
 * @name smartLearnIoApp.directive:topNavbar
 * @description
 * # topNavbar
 */
angular.module('smartLearnIoApp')
  .directive('today', function () {
    return {
      templateUrl: 'scripts/directives/today/today.html',
      restrict: 'E',
      transclude: true,
      controller: 'todayController'
    };
  })
  .controller('todayController', ['TestPaper', '$scope', 'JsonAPI',
   function(TestPaper, $scope, JsonAPI) {
      TestPaper.getAll().then(function(response){
           $scope.testPapers = JsonAPI.pluckAttributes(response.data.data);
      })       
  }]);
