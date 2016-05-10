/* global i */
'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Classroom', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/classrooms/';
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
            },
            create: function(newClassroom) {
                $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: {"data": {"type":"classrooms", "attributes": newClassroom } }
                });
            },
            delete: function(id) {
                $http({
                        url: baseURL + id,
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/vnd.api+json' }
                });
            },
            join: function(id) {
                return $http.get(baseURL + "join/" + id)
            }
        };
    });