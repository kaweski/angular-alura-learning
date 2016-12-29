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
			descricao : "@"
		},
		templateUrl : "js/directives/minha-foto.html"
	}
});
