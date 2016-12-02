// banco de dados sqlite ficará nesta variável
var db = null;

// variáveis e funções globais
var glb = {
	url: "http://www.omdbapi.com/",
	// servidor onde está o backend
	// backend: 'http://localhost:8084/',
	// em_cartaz: [],
	getUrl: function() {
		return this.url;
	},
	getReq: function(id) {
		return {
			method: 'GET',
			url: this.url,
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
			url: this.url,
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				's': '%' + t + '%',
				'plot': 'full',
				'r': 'json',
				'type': 'movie',
				'tomatoes': 'true',
			}
		}
	},
	// getEmCartaz: function(){
	// 	// return ['tt2005151', 'tt5221584', 'tt1355631', 'tt1386697', 'tt2660888', 'tt5475002', 'tt4160708', 'tt2709768', 'tt1540011', 'tt3774114'];
	// 	return this.em_cartaz;
	// },
	// setEmCartaz: function(data){
	// 	for (var i = 0; i < data.length; i++){
	// 		var filme = data[i];
	// 		this.em_cartaz.push(filme.imdbid);
	// 	}
	// }
}

// variáveis que vão controlar a qtde de filmes carregados no localStorage
// assim sendo possível determinar quando finalizar o loading
var load_qtde = 0;
var loaded_qtde = 0;
