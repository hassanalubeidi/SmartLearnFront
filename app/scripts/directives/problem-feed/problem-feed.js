/**
 * @ngdoc directive
 * @name smartLearnIoApp.directive:topNavbar
 * @description
 * # topNavbar
 */
angular.module('smartLearnIoApp')
  .directive('problemFeed', function () {
    return {
      templateUrl: 'scripts/directives/problem-feed/problem-feed.html',
      restrict: 'E'
    };
  })
  .controller('problemFeedController', ['$scope','$http', '$timeout','JsonAPI', 'Problem', 'Topic',
   function($scope, $http, $timeout, JsonAPI, Problem, Topic) {
       
      //Load Problems
      Problem.where({'user-id': $scope.user.id}).then(function(response) {
          $scope.problems = response.data.data.map(function(problem) {
              problem.attributes.id = problem.id
              return problem.attributes
          })
      })
      // create Problem
      $scope.createProblem = function(newProblem) {
          var topic_id
          var data
          // Find topic by name
          var topic_name = $(".topic.search").search("get value")
          console.log(topic_name)
          $http.get("http://127.0.0.1:3000/topics?filter[title]="+topic_name).then(function(response) {
              $timeout(function() {
                topic_id = response.data.data[0].id
                console.log(topic_id)
              },300)
          })
          
          //Create json data to post
          $timeout(function() {
            data = {
                    "data": {
                        "type":"problems",
                        "attributes": {
                            "topic-id": topic_id,
                            "what-went-wrong": newProblem.what_went_wrong
                        }
                    }
            }},400)
          
          //Post JSONAPI data
          $timeout(function() {
              $http({
                    url: 'http://127.0.0.1:3000/problems',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/vnd.api+json' },
                    data: data
             });
             data.data.attributes.id = $scope.problems[$scope.problems.length - 1].id + 1
             $scope.problems.push(data.data.attributes)
             $scope.newProblem = {}
             
             
          }, 500)
          
          console.log(data.data.attributes)
          
      }
      // Delete Problem from Problems
      $scope.removeProblem = function(array, index){
          Problem.delete(array[index].id)
          array.splice(index, 1);
         
      }
      // Get topics for problem-feed search bar
      $http.get("http://127.0.0.1:3000/topics").then(function(response) {
          $scope.topics = response.data;
          $scope.topics = JsonAPI.pluckAttributes($scope.topics.data);
          
      });
      // Initialize Semantic UI search with topics
      $timeout(function() {
           $('.ui.search')
            .search({
                source: $scope.topics
            });
      }, 1000)
     
  }]);
