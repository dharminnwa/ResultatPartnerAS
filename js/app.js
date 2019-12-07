//Defining angular App module
var sysUserRole = { Admin: 'Admin', User: 'User'};
(function () {
    angular.module('ResultatPartnerAS', [
        'ui.router',                   // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ngIdle',                       // Idle timer
        'ngSanitize',                   // ngSanitize
        'ngCookies',                    // ngCookies
        'cgNotify'
    ])
})();

