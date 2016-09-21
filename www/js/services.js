angular.module('starter.services', [])

.factory('Globais', function() {
	var url = "http://www.omdbapi.com/";

	return {
		getUrl: function() {
			return url;
		},
		getReq: function(id) {
			return {
				method: 'GET',
				url: url,
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					'i': id,
					'plot': 'short',
					'r': 'json',
				}
			}
		},
		getReqSearch: function(t) {
			return {
				method: 'GET',
				url: url,
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					's': t + '%',
					'plot': 'short',
					'r': 'json',
					'type': 'movie'
				}
			}
		}
	}
})

.factory('Omdb', function() {

	var url = "http://www.omdbapi.com/";

	return {

		getFilme: function(t) {
			var req = {
				method: 'GET',
				url: url,
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					't': t,
					'plot': 'short',
					'r': 'json',
				}
			}
			var teste = {};
			var filme = $http(req).then(function successCallback(response) {
				console.log(response.data);
				// export data;
				this.teste = response.data;
				return response.data;
			});
			console.log(teste);
			return teste;
		},
	}
})

.factory('Filmes', function() {
	var filmes = [{
		id: 'tt1540011',
		titulo: 'Bruxa de Blair',
		vaiGostar: false,
	}, {
		id: 'tt2709768',
		titulo: 'Pets - A vida secreta dos bichos',
		thumbnail: 'img/pets.jpg',
		vaiGostar: true,
	}, {
		id: 'tt4160708',
		titulo: 'O homem nas trevas',
		vaiGostar: false,
	}, {
		id: 'tt5475002',
		titulo: 'Um namorado para minha esposa',
		thumbnail: 'img/namorado.jpg',
		vaiGostar: false,
	}, {
		id: 'tt2660888',
		titulo: 'Star Trek - Sem Fronteiras',
		vaiGostar: true,
		info: "Star Trek Beyond é um filme norte-americano de 2016 dirigido por Justin Lin e escrito por Simon Pegg e Doug Jung. É o décimo terceiro longa-metragem da franquia Star Trek e o terceiro estrelado pelo novo elenco na série reboot. Na história, a tripulação da USS Enterprise é atacada e presa por uma espécia alienígena desconhecida, precisando encontrar um modo de fugir e enfrentar um inimigo que odeia a Federação dos Planetas Unidos.",
		horarios: [{
			cinema: 'UCI Palladium',
			sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
		}, {
			cinema: 'IMAX Palladium',
			sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
		}, ],
	}, {
		id: 'tt1386697',
		titulo: 'Esquadrão Suicida',
		thumbnail: 'img/suicide.jpg',
		vaiGostar: true,
	}, {
		id: 'tt1355631',
		titulo: 'Conexão Escobar',
		vaiGostar: true,
	}, {
		id: 'tt5221584',
		vaiGostar: false,
	}, {
		id: 'tt2005151',
		vaiGostar: false,
	}];

	return {
		listar: function(vaiGostar) {
			var retorno = [];
			for (var i = 0; i < filmes.length; i++) {
				var filme = filmes[i];
				if (filme.vaiGostar == vaiGostar) {
					// if (filme.thumbnail == undefined || filme.titulo == undefined){
					//     var req = Globais.getReq(filme.id);
					// 	$http(req).then(function successCallback(response){
					//         for (var i = 0; i < $scope.filmes_vaigostar.length; i++) {
					//             if ($scope.filmes_vaigostar[i].id == response.data.imdbID){
					//                 $scope.filmes_vaigostar[i].thumbnail = response.data.Poster;
					//                 $scope.filmes_vaigostar[i].titulo = response.data.Title;
					//             }
					//         }
					// 	});
					// }
					retorno.push(filme);
				}
			}
			return retorno;
		},
        set: function(filme) {
            window.localStorage.setItem(filme.id, JSON.stringify(filme));
            return true;
        },
		get: function(filmeId) {
            if(window.localStorage.getItem(filmeId) !== undefined) {
    			var retorno = [];
    			for (var i = 0; i < filmes.length; i++) {
    				var filme = filmes[i];
    				if (filme.id == filmeId) {
                        window.localStorage.setItem(filme.id, JSON.stringify(filme));
    					return filme;
    				}
    			}
            } else {
                return JSON.parse(window.localStorage.getItem(filmeId));
            }
		},
		all: function() {
			return filmes;
		},
	}
})

;
