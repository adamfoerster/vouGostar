angular.module('starter.services', [])

.factory('Omdb', function($http) {

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

.factory('Filmes', function($http) {
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

	var em_cartaz = ['tt2005151', 'tt5221584', 'tt1355631', 'tt1386697', 'tt2660888', 'tt5475002', 'tt4160708', 'tt2709768', 'tt1540011'];

	return {
		listar: function(vaiGostar) {
			var retorno = [];
			for (var i = 0; i < em_cartaz.length; i++) {
				var filme = JSON.parse(window.localStorage.getItem(em_cartaz[i]));

				// TODO: criar chamada do metodo para verificar se vai gostar
				if (filme.vaiGostar === undefined)
					filme.vaiGostar = true;

				if (filme.vaiGostar == vaiGostar) {
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
		// criar um item local para cada um dos filmes em cartaz
		salvarLocal: function(){
			for (var i = 0; i < em_cartaz.length; i++){
                var req = glb.getReq(em_cartaz[i]);
                $http(req).then(function successCallback(response){
                    var filme = response.data;
                    for (var j = 0; j < filmes.length; j++) {
						var filme_local = filmes[j];
						if (em_cartaz[i] == filme_local.id){
                            if (filme_local.thumbnail !== undefined)
                                filme.thumbnail = filme_local.thumbnail;
                            if (filme_local.titulo !== undefined)
                                filme.titulo = filme_local.titulo;
                            if (filme_local.vai_gostar !== undefined)
                                filme.vai_gostar = filme_local.vai_gostar;
						}
					} // end loop filmes
                    // window.localStorage.setItem(filme.id, JSON.stringify(filme));
                    // console.log('atualizando item ' + filme.id);
                });
                window.localStorage.setItem(filme.id, JSON.stringify(filme));
			} // end loop em_cartaz
			console.log(window.localStorage);
		},
	}
})

;
