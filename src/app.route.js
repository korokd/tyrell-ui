angular.module('app').config(function ($routeProvider){
    $routeProvider.when('/home', {
        templateUrl: 'home/index.html',
        controller: 'homeController'
    })

    $routeProvider.when('/opcionais', {
        templateUrl: 'opcionais/index.html',
        controller: 'opcionaisController',

        autenticado: function (authService) {
            return authService.isAutenticadoPromise();
        }  
    })

    $routeProvider.when('/orcamento', {
        templateUrl: 'orcamentos/index.html',
        controller: 'orcamentoController',

        autenticado: function (authService) {
            return authService.isAutenticadoPromise();
        }  
    })

    $routeProvider.when('/modelos', {
        templateUrl: 'modelos/index.html',
        controller: 'modeloController',

        autenticado: function (authService) {
            return authService.isAutenticadoPromise();
        }  
    })

    $routeProvider.otherwise('/home')
})