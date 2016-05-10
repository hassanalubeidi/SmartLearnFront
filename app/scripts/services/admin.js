angular.module('smartLearnIoApp')
    .factory('Admin', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/admin/';
        //
        return {
            assignStudent: function(userID) {
                return $http.get(baseURL + "assign_student/" + userID);
            },
            assignTeacher: function(userID) {
                return $http.get(baseURL + "assign_teacher/" + userID);
            }
        };
    });