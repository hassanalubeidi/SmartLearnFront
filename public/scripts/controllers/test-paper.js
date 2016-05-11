angular.module('smartLearnIoApp')
  .controller('TestPaperController', ['$stateParams', 'Problem', 'TestPaper', 'Answer', 'JsonAPI',  '$scope',
    function ($stateParams, Problem, TestPaper, Answer, JsonAPI, $scope) {
        
        TestPaper.getDetails($stateParams.id).then(function(response) { 
            $scope.testpaper = JsonAPI.pluckAttributes([response.data.data])[0]
            console.log($scope.testpaper.problems)
            $scope.testPaperProblems = $scope.testpaper.problems
            $scope.$parent.wide = true
        })
        $scope.getQuestionData = function(questionIndex) {
            Answer.find({"question-id": $scope.testpaper.questions[questionIndex].id}).then(function(response) {
                $scope.testpaper.questions[questionIndex].problems = response.data.included
            })
        }
        
        $scope.deleteProblem = function(id) {
            Problem.delete(id).then(function(response){
                console.log("Deleted problem #" + response.data.id)
            })
        }
    }])