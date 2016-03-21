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
  .controller('problemFeedController', ['$scope', '$http', '$timeout', 'JsonAPI', 'Problem', 'Topic', 'apiBaseUrl',
   function($scope, $http, $timeout, JsonAPI, Problem, Topic, apiBaseUrl) {
      // Load Problems
      Problem.where({'user-id': $scope.user.id}).then(function(response) {
          $scope.problems = response.data.data.map(function(problem) {
	      // TODO: Fix this
              problem.attributes.id = problem.id;
              return problem.attributes;
          });
	  console.log("Problems fetched for user id: " + $scope.user.id);
	  console.log($scope.problems);
      })
      // Create Problem
      $scope.createProblem = function(newProblem) {
          // Find topic by name
	  // Use index 1, because of weird array issue
          var topic_name = $(".topic.search").search("get value")[1];
          console.log("The topic name from the search is: ");
	  console.log(topic_name);

	  $http.get(apiBaseUrl + "/topics?filter[title]=" + topic_name).then(function(response) {

		console.log("Response: ");
		console.log(response);
                var topic_id = response.data.data[0].id;
                console.log("Topic id: " + topic_id);

		var payload = {
                    "data": {
                        "type": "problems",
                        "attributes": {
			    "user-id": $scope.user.id,
                            "topic-id": topic_id,
                            "what-went-wrong": newProblem.what_went_wrong
                        }
                    }
            	}

		$http({
                    url: apiBaseUrl + '/problems',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/vnd.api+json' },
                    data: payload
		}).then(function(problemResponse) {
			// TODO: This is an ugly fix
			//problemResponse.data.data.attributes.id = $scope.problems[$scope.problems.length - 1].id + 1;
			$scope.problems.push(problemResponse.data.data.attributes);
		});
		//payload.data.attributes.id = $scope.problems[$scope.problems.length - 1].id + 1
		// TODO: This should be more elegant
		//payload.data.attributes.topic = {"title": topic_name};
		//$scope.problems.push(payload.data.attributes);

          });

	};

      // Delete Problem from Problems
      $scope.removeProblem = function(array, index){
          Problem.delete(array[index].id)
          array.splice(index, 1);
      }
      // Get topics for problem-feed search bar
      $http.get(apiBaseUrl + "/topics").then(function(response) {

          $scope.topics = JsonAPI.pluckAttributes(response.data.data);

	  console.log("Topics received");
	  console.log($scope.topics);

          $('.ui.search')
            .search({
                source: $scope.topics
           });

      });
      // Initialize Semantic UI search with topics
      /*$timeout(function() {
           $('.ui.search')
            .search({
                source: $scope.topics
            });
      }, 1000)*/
     
  }]);
