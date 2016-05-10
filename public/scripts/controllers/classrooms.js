angular.module('smartLearnIoApp')
    .controller('classroomsController', ['$scope', 'JsonAPI', 'Classroom', '$timeout',
        function($scope, JsonAPI, Classroom, $timeout) {
            Classroom.getAll().then(function(response) {
                $scope.toggleClassroom = function(classroom) {
                    classroom.loading = true
                    Classroom.join(classroom.id)
                    $timeout(function() {
                        classroom.loading = false
                        classroom.joined = !classroom.joined
                    }, 300)
                }
                $scope.classrooms = JsonAPI.pluckAttributes(response.data.data)
            })
        }])