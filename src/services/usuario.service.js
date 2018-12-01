angular.module('app').factory('usuarioService', function ($http) {
    
    let url = 'http://localhost:50057/api/usuario';

    function listar() {
        return  $http.get(url);
     }

    function adicionar(novoUsuario) {
        return $http.post(url , JSON.stringify(novoUsuario));
    }

    function alterar(usuario) {
        return $http.put(url + '/' + usuario.id , JSON.stringify(usuario));
    }

    function deletar(usuario){
        return  $http.delete(url + '/' + usuario.id , usuario.id);
    }

    function buscarPorId(id){
        return $http.get(url + '/' + id);
    }

    return {
        listar: listar,
        adicionar: adicionar, 
        buscarPorId: buscarPorId,
        deletar: deletar,
        alterar: alterar
    };
})
