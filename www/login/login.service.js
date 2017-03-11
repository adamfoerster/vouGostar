(function() {
	'use strict';

	angular
		.module('starter')
		.factory('Login', Login);

	Login.$inject = ['$http', 'config', '$q', '$rootScope'];

	function Login($http, config, $q, $rootScope) {
		return {
			callGoogle: callGoogle,
			disconnectUser: disconnectUser,
			getDataProfile: getDataProfile,
			carregarCodigo: carregarCodigo,
			serializeData: serializeData,
		}

		var accessToken;
		var UserData = null;

		function carregarCodigo(e) {
			var deferred = $q.defer();
			var url = e.url;
			var code = /\?code=(.+)$/.exec(url);
			var error = /\?error=(.+)$/.exec(url);

			if (code) {
				// pega apenas a o codigo a partir dos parametros get
				var params = /(\?|\&)([^=]+)\=([^&]+)/.exec(url);
				//Exchange the authorization code for an access token
				$http({
					method: 'POST',
					url: 'https://accounts.google.com/o/oauth2/token',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: serializeData({
						code: params[3],
						client_id: config.client_id,
						client_secret: config.client_secret,
						redirect_uri: config.redirect_uri,
						grant_type: 'authorization_code'
					}),
				})
				.then(
					function successCallback(response) {
						deferred.resolve(data);
					},
					function errorCallback(response){
						deferred.reject(response.responseJSON);
					}
				);
			} else if (error) {
				//The user denied access to the app
				deferred.reject({
					error: error[1]
				});
			}
		} // fim carregarCodigo

		// This function gets data of user.
		function getDataProfile() {
			var Usuario = window.localStorage.getItem('Usuario');
			if ( Usuario != undefined && Usuario != null) {
				var deferido = $q.defer();
				deferido.resolve(
					JSON.parse(window.localStorage.getItem('Usuario'))
				);
				return deferido.promise;
			} else {
				// authorize({
				// 	client_id: config.client_id,
				// 	client_secret: config.client_secret,
				// 	redirect_uri: config.redirect_uri,
				// 	scope: config.scope
				//
				// }).then(function(data) {
				// 	console.log(data.access_token);
				// 	accessToken = data.access_token;
				// 	console.log(JSON.stringify(data));
				// 	$http({
				// 		url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken,
				// 		method: 'GET',
				// 		data: term,
				// 		dataType: 'json',
				// 	}).then(function(data) {
				// 		var item;
				//
				// 		console.log(JSON.stringify(data));
				// 		// Save the userprofile data in your localStorage.
				// 		localStorage.gmailLogin = "true";
				// 		localStorage.gmailID = data.id;
				// 		localStorage.gmailEmail = data.email;
				// 		localStorage.gmailFirstName = data.given_name;
				// 		localStorage.gmailLastName = data.family_name;
				// 		localStorage.gmailProfilePicture = data.picture;
				// 		localStorage.gmailGender = data.gender;
				// 	}).catch(function(jqXHR, text_status, strError) {
				// 		console.log(jqXHR);
				// 	});
				//
				// });
				// var term = null;
				//  alert("getting user data="+accessToken);


				// disconnectUser();
			}

		}

		function disconnectUser() {
			/*var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken;

			// Perform an asynchronous GET request.
			$.ajax({
				type: 'GET',
				url: revokeUrl,
				async: false,
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(nullResponse) {
					// Do something now that user is disconnected
					// The response is always undefined.
					accessToken = null;
					console.log(JSON.stringify(nullResponse));
					console.log("-----signed out..!!----" + accessToken);
				},
				error: function(e) {
					// Handle the error
					// console.log(e);
					// You could point users to manually disconnect if unsuccessful
					// https://plus.google.com/apps
				}
			});*/
		}

		function callGoogle() {

			console.log('starting');


		}

		function serializeData(data) {
			// If this is not an object, defer to native stringification.
			if (!angular.isObject(data)) {
				return ((data == null) ? "" : data.toString());
			}

			var buffer = [];

			// Serialize each key in the object.
			for (var name in data) {
				if (!data.hasOwnProperty(name)) {
					continue;
				}

				var value = data[name];

				buffer.push(
					encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value)
				);
			}

			// Serialize the buffer and clean it up for transportation.
			var source = buffer.join("&").replace(/%20/g, "+");
			return (source);
		}
	}

})();
