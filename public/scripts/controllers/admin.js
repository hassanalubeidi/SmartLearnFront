angular.module('smartLearnIoApp')
  .controller('AdminController', ['$scope', 'Admin', 'JsonAPI', 'User', function($scope, Admin, JsonAPI, User) {
        User.getAll().then(function(response) {
            $scope.users = JsonAPI.pluckAttributes(response.data.data)
        })
        $scope.toggleUserRole = function(user) {
            if (user.role == "teacher") {
                Admin.assignStudent(user.id).then(function(response) {
                    user.role = response.data.role
                })
            } else if (user.role == "student") {
                Admin.assignTeacher(user.id).then(function(response) {
                    user.role = response.data.role
                })
            } else if (user.role == null) {
                Admin.assignStudent(user.id).then(function(response) {
                    user.role = response.data.role
                })
            }
        }
  }])