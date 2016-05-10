'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.topic
 * @description
 * # topic
 * Factory in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Subject', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/subjects/';
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id, includes) {
                var includesURI
                if(includes != undefined) {
                    includesURI = "?include="
                    includes.map(function(include){
                        includesURI += include + "&"
                    })
                }else{
                    includesURI = ""
                }
                return $http.get(baseURL + id + includesURI);
            },
            create: function(newProblem) {
                $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: newProblem
                });
            },
            delete: function(id) {
                $http({
                        url: baseURL + id,
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/vnd.api+json' }
                });
            } 
        };
    });