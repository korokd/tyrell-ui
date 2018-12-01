angular.module('app').controller('homeController', function ($scope, authService, toastr, usuarioService, $location) {
   
    $scope.logar = function (usuario){
        authService.login(usuario).then( function (response) {
            console.log("bem demais");
            $location.path("/#!/orcamento"); 
            toastr.success('Você está logado como: ' + usuario.email, 'Sucesso!'); 
        }, function(response) {
            console.log(response.data.Message);
            toastr.error("Email ou senha inválidos", "Falha")
        })
    }

    $scope.registrar = function (usuario){
        console.log(usuario.Admin)
        usuarioService.adicionar(usuario).then(
            function(response){
                toastr.success('Cadastro efetuado! ', 'Sucesso!');
                $scope.mostrarRegistrar  = false;   
            },
            function(response){
                console.log(response.data.Message);
                toastr.error(response.data.Message, "Falha")
            }
        );
    }
})