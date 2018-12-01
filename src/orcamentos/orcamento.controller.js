angular.module('app').controller('orcamentoController', function ($scope, authService, toastr, orcamentoService, modeloService, $location) {
    
    verificaPermissao();

    $scope.atualizarOrcamento =  function(orcamento){
        orcamento.IdOpcionais = [];
        
                for (var i = 0; i < $scope.idsOpcionaisOrcamento.length; i++){
                    if($scope.idsOpcionaisOrcamento[i] != null && $scope.idsOpcionaisOrcamento[i] != false)
                        orcamento.IdOpcionais.push($scope.idsOpcionaisOrcamento[i]);
                }
        
                console.log(orcamento.idOpcionais);

        orcamentoService.buscarValorOrcamento(orcamento).then(function(response) {
            $scope.valorOrcamento = response.data;
            console.log(response.data)
        });
    }

    function autenticado (){
        if(authService.possuiPermissao('Colaborador'))
          return true;
        
          return false;
    }

    function verificaPermissao(){
        if(autenticado() == false){
            $location.path('#!/home');
            toastr.error( "Voce nao está autorizado a acessar essa página", "Falha")
        }
    }


    buscarTodos();

    function buscarTodos(){
        orcamentoService.buscarTodos().then(function(response){
            $scope.orcamentoTodos = response.data;
        });
    }

    modeloService.buscarTodos().then(function(response) {
        $scope.modelos = response.data;
    });

    $scope.atualizarOpcionais = function (id){
        modeloService.buscarPorId(id).then(function(response) {
            var modelo = response.data;
            $scope.opcionais = modelo.Opcionais;
        });
    }

    $scope.atualizarOpcionaisEditar = function (id){
        modeloService.buscarPorId(id).then(function(response) {
            var modelo = response.data;
            $scope.opcionaisEditar = modelo.Opcionais;
        });
    }

    $scope.idsOpcionaisOrcamento = [];
    $scope.idsOpcionaisOrcamentoEditar = [];

    $scope.registrar = function (orcamento){

        orcamento.IdOpcionais = [];

        for (var i = 0; i < $scope.idsOpcionaisOrcamento.length; i++){
            if($scope.idsOpcionaisOrcamento[i] != null && $scope.idsOpcionaisOrcamento[i] != false)
                orcamento.IdOpcionais.push($scope.idsOpcionaisOrcamento[i]);
        }

        console.log(orcamento.idOpcionais);

        orcamentoService.adicionar(orcamento).then(
            function(response){
                toastr.success('Orcamento cadastrado! ', 'Sucesso!');
                buscarTodos();
            },
            function(response){
                toastr.error( "Dados inválidos", "Falha")
            }
        );
    }

    $scope.editar = function (orcamentoEditar){
        
            orcamentoEditar.IdOpcionais = $scope.idsOpcionaisOrcamentoEditar.filter(j => j != null && j!= false);
            
            orcamentoService.alterar(orcamentoEditar).then(
                function(response){
                    toastr.success('Orcamento editado! ', 'Sucesso!');
                    buscarTodos();
                },
                function(response){
                    toastr.error( "Insira um Identificador válido", "Falha")
                }
            );
    }
    
    $scope.deletar = function (Id){
        orcamentoService.deletar(Id).then(
            function(response){
                toastr.success('Opcional deletado!', 'Sucesso!');
                buscarTodos();
            },
            function(response){
                toastr.error("Insira um Identificador válido.", "Falha")
            }
        );
    }

})