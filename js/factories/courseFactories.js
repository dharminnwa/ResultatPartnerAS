/*
Factory for course hadling server calls 
*/


angular.module('ResultatPartnerAS')
.factory('courseFactory', function ($http, $rootScope) {
    return {
        getAllCourses: function () {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            return $http.get($rootScope.apiPath + "/course/GetAllCourses", config);
        },
        getCourseDetail: function (id) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            return $http.get($rootScope.apiPath + "/Course/GetUserParticipatedCourseByID?id="+id, config);
        },
        participateInCourse: function (id) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            var data = {
                courseID: id
            };
            return $http.post($rootScope.apiPath + "/Course/ParticipateInCourse", data, config);
        },
        isUserParticipated: function (id) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            return $http.get($rootScope.apiPath + "/course/isUserParticipated?CourseId=" + id, config);
        },
        updateCourse: function (obj) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            var data = obj;
            return $http.post($rootScope.apiPath + "/Course/UpdateCourse", data, config);
        },
        newCourse: function (obj) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            var data = obj;
            return $http.post($rootScope.apiPath + "/Course/AddCourse", data, config);
        },
        deleteCourse: function (id) {
            var config = {
                headers: {
                    "TOKEN": $rootScope.userModel.userToken,
                }
            };
            return $http.get($rootScope.apiPath + "/Course/DeleteCourse?id=" + id, config);
        },
    }
})