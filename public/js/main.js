// Criação de um novo módulo que não tem dependência de outros para funcionar
// alurapic é o nome do módulo, [] não tem dependência nenhuma
// angular.module('alurapic', []); 

angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true); // Ativa o modo HTML5 para usar a base do projeto para / e não /#/

	$routeProvider.when('/fotos', {
		templateUrl: 'partials/principal.html',
		controller: 'FotosController'
	});

	$routeProvider.when('/fotos/new', {
		templateUrl: 'partials/foto.html',
		// controller: 'FotosController'
	});

	// Caso seja qualquer rota que não está definida, a view é redirecionada para uma rota antes definida
	$routeProvider.otherwise({
		redirectTo : '/fotos' // passa a rota q gostaria q estivesse na url
	})
});
