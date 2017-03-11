(function() {
	'use strict';

	angular
		.module('starter.controllers')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$ionicPopup', '$cordovaInAppBrowser', 'config', 'Login'];

	function LoginCtrl($scope, $rootScope, $ionicPlatform, $ionicPopup, $cordovaInAppBrowser, config, Login) {

		$ionicPlatform.ready(function() {
			$scope.logar = logar;
			$scope.authUrl = '';
			$scope.logado = false;

			// carregar as infos do Usuario
			function logar() {

				$scope.Usuario = Login.getDataProfile();

				// caso não tenha conseguido pegar os dados do usuario isto pode significar que ele não fez o login com o Google ou não está conectado
				if ($scope.Usuario == false || $scope.Usuario == undefined) {
					console.log(window.Connection);
					if (window.Connection) {
						if (navigator.connection.type == Connection.NONE) {
							// se não estiver conectado
							$ionicPopup.confirm({
								title: "Sem conexão",
								content: "Não foi possível conectar a internet."
							})
							.then(function(result) {
								if (!result) {
									ionic.Platform.exitApp();
								}
							});

						}
					} else {
						// se não está logado no Google ainda
						//Build the OAuth consent page URL
						var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + Login.serializeData({
							client_id: config.client_id,
							redirect_uri: config.redirect_uri,
							response_type: 'code',
							scope: config.scope
						});

						var conf = {
							location: 'no',
							clearcache: 'yes',
							toolbar: 'no'
						};

						var janela = $cordovaInAppBrowser.open(authUrl, '_blank', conf)
							.then(function(event) {
								console.log('sucesso');
							})
							.catch(function(event) {
								console.log('erro');
							});

						// a cada página que termina de ser carregada procura o código no get
						$rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {
							Login.carregarCodigo(event)
								.then(function(retorno) {
									console.log(retorno);
									$cordovaInAppBrowser.close();
									janela.close();
								})
								.catch(function(retorno) {
									console.log(retorno);
								});
						});

						$rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event) {
							// insert CSS via code / file
							// $cordovaInAppBrowser.insertCSS({
							// 	code: 'body {background-color:blue;}'
							// });
							// insert Javascript via code / file
							// $cordovaInAppBrowser.executeScript({
							// 	file: 'script.js'
							// });
						});

						$rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event) {
							console.log('erro no carregamento');
						});

						$rootScope.$on('$cordovaInAppBrowser:exit', function(e, event) {
							console.log('saída');
						});
					}
				}
			}


		});

		//
		// $scope.trustSrc = function(src) {
		// 	return $sce.trustAsResourceUrl(src);
		// }

	}

})();
