//All Routing cofiguration and global variable delcration as $rootScope.
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds
    $urlRouterProvider.otherwise("/user/login");
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false,
        event: true
    });

    $stateProvider
.state('user', {
    abstract: true,
    url: "/user",
    templateUrl: "views/common/logincontent.html",
    resolve: {
        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
                {
                    serie: true,
                    name: 'angular-ladda',
                    files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css', 'js/plugins/ladda/angular-ladda.min.js']
                },
                {
                    name: 'ngValidate',
                    files: ['js/plugins/validate/jquery.validate.js', 'js/plugins/validate/angular-validate.min.js']
                }, 
                {
                    name: 'ResultatPartnerAS',
                    files: ['js/factories/userFactories.js']
                },
            ]);
        }
    }
})
    .state('user.login', {
        url: "/login",
        templateUrl: "views/user/login.html",
        data: { pageTitle: 'Login' },

        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        name: 'angular-ladda',
                        files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css', 'js/plugins/ladda/angular-ladda.min.js']
                    },
                    {
                        serie: true,
                        name: 'ngValidate',
                        files: ['js/plugins/validate/jquery.validate.js', 'js/plugins/validate/angular-validate.min.js']
                    },
                    
                    {
                        name: 'ResultatPartnerAS',
                        files: ['js/controllers/loginController.js']
                    },

                ]);
            }
        }
    })


.state('courses', {
    abstract: true,
    url: "/courses",
    templateUrl: "views/common/content.html",
    resolve: {
        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
                {
                    serie: true,
                    name: 'angular-ladda',
                    files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css', 'js/plugins/ladda/angular-ladda.min.js']
                },
                {
                    name: 'ngValidate',
                    files: ['js/plugins/validate/jquery.validate.js', 'js/plugins/validate/angular-validate.min.js']
                }, {
                    name: 'ResultatPartnerAS',
                    files: ['js/factories/userFactories.js', 'js/factories/courseFactories.js']
                },
                {
                    name: 'ResultatPartnerAS',
                    files: ['js/controllers/courseController.js']
                }

            ]);
        }
    }
})
    .state('courses.allcourses', {
        url: "/allcourses",
        templateUrl: "views/courses/allcourses.html",
        data: {
            pageTitle: 'All Courses',
        },
    })
     .state('courses.info', {
         url: "/info/:CourseID",
         templateUrl: "views/courses/info.html",
         data: {
             pageTitle: 'Course Info',
         },
         controller: function ($scope, $stateParams) {
             $scope.CourseID = $stateParams.CourseID;
         },
        
     })
    .state('courses.edit', {
        url: "/edit/:CourseID",
        templateUrl: "views/courses/edit.html",
        data: {
            pageTitle: 'Edit Course',
        },
        controller: function ($scope, $stateParams) {
            $scope.CourseID = $stateParams.CourseID;
        },

    })
    .state('courses.new', {
        url: "/new",
        templateUrl: "views/courses/new.html",
        data: {
            pageTitle: 'Add New Course',
        },
    })

}
angular
    .module('ResultatPartnerAS')
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.apiPath = "http://192.168.0.204/ResultatPartnerASAPI/api";
        $rootScope.$state = $state;
        $rootScope.APPTITLE = "Resultat Partner AS";
        $rootScope.userModel = $rootScope.userModel = { isLoggedin: false, userRole: "", userToken: "", userRole: "", isAdmin: false };
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {

            if ($rootScope.userModel.isLoggedin) {
                $rootScope.previousState = from.name;
                $rootScope.currentState = to.name;
            }
            else {
                $rootScope.previousState = "";
                $rootScope.currentState = "";
            }
        });
        $rootScope.checkIsValidToken = function (data) {
            var result = false;
            if (data == "Invalid Token") {
                $state.go("user.login")
            }
            else
            {
                result = true;
            }
            return result;
        }
    });