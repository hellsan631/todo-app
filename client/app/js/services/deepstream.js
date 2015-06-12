angular
  .module('app')
  .service('deepstream', function() {
  	return deepstream('localhost:6020').login();
  })
  .service( 'bindFields', function(){
  	return function getField( $scope, record, names ) {
  		angular.forEach( names, function( name ){
  			Object.defineProperty( $scope, name, {
  				get: function() {
  					return record.get( name );
  				},
  				set: function( newValue ) {
  					if( newValue === undefined ) {
  						return;
  					}
  					record.set( name, newValue );
  				}
  			});
  		});

  		record.subscribe(function() {
  			if( !$scope.$$phase ) {
  				$scope.$apply();
  			}
  		});
  	};
  });
