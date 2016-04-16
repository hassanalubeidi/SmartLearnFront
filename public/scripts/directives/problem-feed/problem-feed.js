/**
 * @ngdoc directive
 * @name smartLearnIoApp.directive:topNavbar
 * @description
 * # topNavbar
 */
angular.module('smartLearnIoApp')
    .directive('problemFeed', function() {
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
                problem.attributes.id = problem.id
                return problem.attributes
            })
            var problemGroups = []
            var problemGroup = {all: [], minimized: [], loading: false}
            var lastTestPaper
            $scope.problems.map(function(problem, index) {
              if(problem['test-paper'] != undefined) {
                  if (lastTestPaper != problem['test-paper'].title) {
                      if (problemGroup.all.length > 0) {
                          problemGroups.push(problemGroup)
                      }
                      problemGroup = {all: [problem], minimized: [problem], loading: false}
                  }else {
                      problemGroup.all.push(problem)
                      if (problemGroup.minimized.length < 4) {
                          problemGroup.minimized.push(problem)
                      }
                      if (index == $scope.problems.length -1) {
                          problemGroups.push(problemGroup)
                      }
                  }
              }else {
                  
                  if (problemGroup.all.length > 0) {
                      problemGroups.push(problemGroup)
                  }
                  problemGroup = {all: [], minimized: [], loading: false}
                  problemGroups.push({all: [problem], minimized: [problem], loading: false})
              }
                
                
              if(problem['test-paper'] != null ) {
                  lastTestPaper = problem['test-paper'].title
              }else {
                  lastTestPaper = null
              }
            })
            console.log(problemGroup)
            $scope.problemGroups = problemGroups
        })
      
        $scope.loadMoreProblems = function(problemGroup) {
            $timeout(function() {
                problemGroup.minimized = problemGroup.all
                problemGroup.loading = false; 
            }, 300)
            problemGroup.loading = true; 
        }

        // Create Problem
        $scope.createProblem = function(newProblem) {
            // Find topic by name
            // Use index 1, because of weird array issue
            var topic_name = '"' + $(".topic.search").search("get value") + '"';
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
                    headers: {
                        'Content-Type': 'application/vnd.api+json'
                    },
                    data: payload
                }).then(function(problemResponse) {
                    // TODO: This is an ugly fix
                    //problemResponse.data.data.attributes.id = $scope.problems[$scope.problems.length - 1].id + 1;
                    $scope.problemGroups.push({all: [problemResponse.data.data.attributes], minimized: [problemResponse.data.data.attributes], loading: false });
                });
                //payload.data.attributes.id = $scope.problems[$scope.problems.length - 1].id + 1
                // TODO: This should be more elegant
                //payload.data.attributes.topic = {"title": topic_name};
                //$scope.problems.push(payload.data.attributes);

            });

        };

        // Delete Problem from Problems
        // Used in problemGroups ng-repeat filter
        $scope.greaterThan = function(prop, val){
            return function(problemGroup){
                return problemGroup[prop].length > val;
            }
        }
    // Delete Problem from Problems
      $scope.removeProblem = function(array, index, problemGroupIndex, problemGroups){
          Problem.delete(array.all[index].id)
            array.all.splice(index, 1);
            if (index < 3 || array.minimized.length > 4) {
                array.minimized.splice(index, 1);
            }
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

        }
    ]);