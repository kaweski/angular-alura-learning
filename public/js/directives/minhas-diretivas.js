// Criação de um novo módulo que não tem dependência de outros para funcionar
// angular.module('alurapic', []); // alurapic é o nome do módulo, [] não tem dependência nenhuma

angular.module("minhasDiretivas", [])
.directive("meuPainel", function(){ // camel case no nome da diretiva, tem q usar hífen como tag <meu-painel></meu-painel>

	// retorna um DDO: directive definition object
	return {
		restrict : "AE",
		scope : {
			titulo : "@"
		},
		transclude : true,
		templateUrl : "js/directives/meu-painel.html"
	};

	// ddo.restrict = "AE";

	// ddo.scope = {
	// 	titulo: '@' // usa-se somente @ porque o nome do atributo é igual o nome da propriedade
	// };

	// ddo.transclude = true;

	// ddo.template =
	// '<div class="panel panel-default">' +
	// 	'<div class="panel-heading">' +
	// 		'<h3 class="panel-title">{{titulo}}</h3>' +
	// 	'</div>' +
	// 	'<div class="panel-body" ng-transclude>' +
	// 		// '<img class="center-block img-responsive" src="{{foto.url}}" alt="{{foto.titulo}}">' +
	// 	'</div>' +
	// '</div>';

	// ddo.templateUrl = 'js/directives/meu-painel.html';

	// return ddo;
})

.directive("minhaFoto", function() {
	return {
		restrict: "AE",
		scope : {
			titulo : "@",
			url : "@",
			descricao : "@" // Usamos @ quando queremos realizar uma cópia do valor passado para a diretiva no HTML para dentro do escopo isolado na diretiva. Essa cópia é sempre um valor em string.
		},
		templateUrl : "js/directives/minha-foto.html"
	}
})

.directive("meuBotaoPerigo", function() {
	return {
		restrict: "E",
		scope : {
			nome : "@",
			acao : "&" // Usamos & geralmente quando queremos executar dentro de uma diretiva uma função que pertence a um escopo pai, o de um controller
		},
		template : '<button ng-click="acao(foto)" class="btn btn-danger btn-block">{{nome}}</button>'
	}
})

.directive("meuFocus", function() {
	return {
		restrict: "A",
		// scope : {
		// 	focado : "=" // comunicação bidirecional entre a diretiva e o controller
		// },
		link : function(scope, element) {
			// scope.$watch("focado", function() {
			// 	if ( scope.focado ) {
			// 		element[0].focus(); // forma que ele vai pegar o elemento do DOM sem utilizar jQuery
			// 		scope.focado = false;
			// 	}
			// });

			// O custo do $watch é caro para usar, portando, iremos reutilizar $broadcast ao salvar/editar e verificar se foi acionada com $on aqui
			scope.$on("fotoCadastrada", function() {
				element[0].focus();
			});
		}
	}
})

.directive("meusTitulos", function() {
	return {
		restrict : "E",
		template : '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>',
		controller : function($scope, recursoFoto) {
			recursoFoto.query(function(fotos) {
				$scope.titulos = fotos.map(function(foto) {
					return foto.titulo;
				});
			})
		},
	}
});
