angular.module('app').controller('opcionaisController', function ($scope, authService, toastr, opcionalService, $location) {
    
    verificaPermissao();

    atualizarOpcionais();
    
    function atualizarOpcionais(){
        opcionalService.buscarTodos().then(function(response) {
            $scope.opcionais = response.data;
        });
    }

    function autenticado (){
        if(authService.possuiPermissao('Administrador'))
          return true;
        
          return false;
    }

    function verificaPermissao(){
        if(autenticado() == false){
            $location.path('#!/home');
            toastr.error( "Voce nao está autorizado a acessar essa página", "Falha")
        }
    }

    $scope.registrar = function (opcional){
        opcionalService.adicionar(opcional).then(
            function(response){
                toastr.success('Opcional cadastrado! ', 'Sucesso!');
                $scope.mostrarRegistrar  = false; 
                atualizarOpcionais();
            },
            function(response){
                toastr.error( response.data.Message, "Falha");
            }
        );
    }

    $scope.editar = function (opcionalEditar){
        opcionalService.alterar(opcionalEditar).then(
            function(response){
                toastr.success('Opcional editado! ', 'Sucesso!');
                atualizarOpcionais();
            },
            function(response){
                toastr.error( response.data.Message, "Falha")
            }
        );
    }

    $scope.deletar = function (Id){
        opcionalService.deletar(Id).then(
            function(response){
                toastr.success('Opcional deletado!', 'Sucesso!');
                atualizarOpcionais();
            },
            function(response){
                toastr.error("Insira um Identificador válido.", "Falha")
            }
        );
    }
})