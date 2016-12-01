angular.module('starter.controllers').controller('SearchCtrl', function($scope, $http, Filmes) {
    $scope.carregando = false;
    $scope.msg = '';

    $scope.getFilme = function(titulo) {
        $scope.carregando = true;

        if (titulo.length > 3){
            $http(glb.getReqSearch(titulo)).then(function successCallback(response){
                $scope.carregando = false;
                $scope.filmes = [];
                if (response.data.Response == "True"){
                     let resultados = response.data.Search;
                     for (let i = 0; i < resultados.length; i++){
                         let filme = Filmes.get(resultados[i].imdbID);
                         console.log(filme);
                         if (filme == false){
                             Filmes.set(resultados[i]);
                             filme = Filmes.get(resultados[i].imdbID);
                             console.log('get');
                             console.log(filme);
                         }
                         $scope.filmes.push(filme);
                     }
                } else {
                    $scope.filmes = [];
                    $scope.msg = 'Não encontrei nenhum resultado para ' + document.getElementById('titulo').value;
                    document.getElementById('titulo').value = '';
                    document.getElementById('titulo').focus();
                }
    		});
        }
	};
});
