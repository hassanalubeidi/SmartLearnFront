angular.module('smartLearnIoApp')
    .factory('Review', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/reviews/';
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
            },
            create: function(newReview) {
                return $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: {"data": {"type":"reviews", "attributes": newReview } }
                });
            },
            delete: function(id) {
                return $http({
                        url: baseURL + id,
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/vnd.api+json' }
                });
            }
        };
    });