angular.module('starter.services', [])

  .factory('Filmes', function(){
    var filmes = [
      {
        id : 1,
        titulo : 'Star Trek Sem Fronteiras',
        thumbnail : 'startrek.jpg',
        capa : 'capa_startrek.jpg',
        vaiGostar : true,
        info: "Star Trek Beyond é um filme norte-americano de 2016 dirigido por Justin Lin e escrito por Simon Pegg e Doug Jung. É o décimo terceiro longa-metragem da franquia Star Trek e o terceiro estrelado pelo novo elenco na série reboot. Na história, a tripulação da USS Enterprise é atacada e presa por uma espécia alienígena desconhecida, precisando encontrar um modo de fugir e enfrentar um inimigo que odeia a Federação dos Planetas Unidos.",
        horarios: [
            {
                cinema: 'UCI Palladium',
                sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
            },
            {
                cinema: 'IMAX Palladium',
                sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
            },
        ],
      },
      {
        id : 4,
        titulo : 'Esquadrão Suicida',
        thumbnail : 'suicide.jpg',
        vaiGostar : true,
      },
      {
        id : 5,
        titulo : 'Ben Hur',
        thumbnail : 'benhur.jpg',
        vaiGostar : true,
      },
      {
        id : 2,
        titulo : 'A vida secreta dos bichos',
        thumbnail : 'pets.jpg',
        vaiGostar : false,
      },
      {
        id : 3,
        titulo : 'Um namorado pra minha mulher',
        thumbnail : 'namorado.jpg',
        vaiGostar : false,
      },
    ];

    return {
      listar: function (vaiGostar){
        var retorno = [];
        for (var i = 0; i < filmes.length; i++) {
          var filme = filmes[i];
          if (filme.vaiGostar == vaiGostar){
            retorno.push(filme);
          }
        }
        return retorno;
      },
      get: function (filmeId){
          var retorno = [];
          for (var i = 0; i < filmes.length; i++) {
            var filme = filmes[i];
            if (filme.id == filmeId){
              return filme;
            }
          }
      },
      all: function (){
          return filmes;
      },
    }
  })

    .factory('Trakt', function($http){
        // var client_id = "776612b19d6d3811237441b7f05eaa19f5dcd59a650b71e6574133b1827f2431"; // live
        var client_id = "ff3b9ae43cf4b08d7e1d47f8576ddbf1016b22fceaa0c7f0ff0695abd0d5226b"; // staging
        var client_secret = "dcadfb407389c5d8156b77b6252c348d6e761e5fa8d59d01c3565968550b50f2"; // staging
        var url = 'https://api-staging.trakt.tv/'; // staging
        // var url = 'https://api.trakt.tv/'; // live

        return {
            conectar: function() {
                var req = {
                     method: 'GET',
                     url: url + 'auth/signin',
                     headers: {
                    //    "Access-Control-Allow-Credentials" : "true",
                    //    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                    //    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Authorization",
                    //    'Access-Control-Allow-Origin' : '*',
                        // "Access-Control-Allow-Methods" : "false",
                       'Content-Type': 'application/json',
                       'trakt-api-key': client_id,
                       'trakt-api-version': 2,
                     },
                     data: {
                         "response_type" : "code",
                         "client_id": client_id,
                         "redirect_uri" : "urn:ietf:wg:oauth:2.0:oob",
                         "state" : "tab.account",
                     }
                }
                $http(req).then(function(data, data2, data3){
                    console.log(data);
                    console.log(data2);
                    console.log(data3);
                    return data;
                });

                // var request = new XMLHttpRequest();
                // request.open('POST', 'https://api.trakt.tv/oauth/device/code');
                // request.setRequestHeader('Content-Type', 'application/json');
                // request.onreadystatechange = function () {
                //   if (this.readyState === 4) {
                //     console.log('Status:', this.status);
                //     console.log('Headers:', this.getAllResponseHeaders());
                //     console.log('Body:', this.responseText);
                //   }
                // };
                // var body = {
                //   'client_id': 'ff3b9ae43cf4b08d7e1d47f8576ddbf1016b22fceaa0c7f0ff0695abd0d5226b'
                // };
                // request.send(JSON.stringify(body));

            },
            getUsers: function() {
                var deferred = $q.defer();
                var url = "http://localhost/api/api/index.php/analytics/UsersPerCube?callback=JSON_CALLBACK";
                $http.get(url).success(function(data, status, headers, config) {
                  console.log(data);
                  deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                  //this always gets called
                  console.log(status);
                  deferred.reject(status);
                });
                return deferred.promise;
            },
        }
    })

  ;
