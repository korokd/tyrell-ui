angular.module('app').controller('modeloController', function ($scope, authService, toastr, opcionalService, modeloService, $location) {
    
buscarTodos();

verificaPermissao();

function buscarTodos(){
    modeloService.buscarTodos().then(function(response){
        $scope.modeloTodos = response.data;
        console.log(response.data)
    });
}

opcionalService.buscarTodos().then(function(response){
    $scope.opcionais = response.data;
})

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

$scope.idsOpcionaisModelo = [];
$scope.idsOpcionaisModeloEditar = [];

$scope.registrar = function (modelo){

    modelo.IdOpcionais = $scope.idsOpcionaisModelo.filter(j => j != null && j!= false);
    console.log(modelo.IdOpcionais);

    console.log(modelo.idOpcionais);

    modeloService.adicionar(modelo).then(
        function(response){
            toastr.success('Modelo cadastrado! ', 'Sucesso!');
            buscarTodos();
        },
        function(response){
            toastr.error( "Dados inválidos", "Falha")
        }
    );
}

$scope.editar = function (ModeloEditar){
    
        ModeloEditar.IdOpcionais = $scope.idsOpcionaisModeloEditar.filter(j => j != null && j!= false);
        
        modeloService.alterar(ModeloEditar).then(
            function(response){
                toastr.success('Modelo editado! ', 'Sucesso!');
                buscarTodos();
            },
            function(response){
                toastr.error( "Insira um Identificador válido", "Falha")
            }
        );
}

    $scope.deletar = function (Id){
        modeloService.deletar(Id).then(
            function(response){
                toastr.success('Modelo deletado!', 'Sucesso!');
                buscarTodos();
            },
            function(response){
                toastr.error("Insira um Identificador válido.", "Falha")
            }
        );
    }

})