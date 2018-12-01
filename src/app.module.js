angular.module('app', ['ngRoute', 'toastr', 'auth']);

// Configurações utilizadas pelo módulo de autenticação (authService)
angular.module('app').constant('authConfig', {
    
    // Obrigatória - URL da API que retorna o usuário
    urlUsuario: 'http://localhost:50057/api/usuario/login',
    
    // Obrigatória - URL da aplicação que possui o formulário de login
    urlLogin: '/home',
    
    // Opcional - URL da aplicação para onde será redirecionado (se for informado) após o LOGIN com sucesso
    urlPrivado: '/privado',
    
    // Opcional - URL da aplicação para onde será redirecionado (se for informado) após o LOGOUT
    urlLogout: '/home'});

angular.module('app').config(function(toastrConfig) {
        angular.extend(toastrConfig, {
          autoDismiss: false,
          containerId: 'toast-container',
          maxOpened: 0,    
          newestOnTop: true,
          positionClass: 'toast-top-right',
          preventDuplicates: false,
          preventOpenDuplicates: false,
          target: 'body',
          timeOut: 2000,
        });
    });
    