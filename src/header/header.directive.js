angular.module('app')
.directive('headerDirective', function (authService, $rootScope) {

  return {

    restrict: 'E',

    scope: {},
    
    templateUrl: 'header/header.directive.html',
    

    controller: function ($scope) {

      atualizarUsuario();

      $scope.admin = function(){
        if(authService.possuiPermissao('Administrador'))
          return true;
        
          return false;
      }

      $scope.autenticado = function(){
        if(authService.possuiPermissao('Colaborador'))
          return true;
        
          return false;
      }

      $scope.logout = authService.logout;
    
      $scope.getUsuario = authService.getUsuario();

      $rootScope.$on('authLoginSuccess', function () {
        atualizarUsuario();
      });

      $rootScope.$on('authLogoutSuccess', function () {
        atualizarUsuario();
      });        

      function atualizarUsuario() {
        $scope.usuario = authService.getUsuario();
      }
    }
  }

});
