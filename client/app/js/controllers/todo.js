angular
  .module('app')
  .controller('TodoController', ['$scope', '$rootScope', 'Todo', 'deepstream',
    function($scope, $rootScope, Todo, deepstream) {

      var list = deepstream.record.getList('Todo');

      $scope.todos = [];

      list.subscribe(function( entries ){
    		function scopeApply() {
    			if( !$scope.$$phase ) {
    				$scope.$apply();
    			}
    		}
    		$scope.todos = entries.map(function( entry ){
    			var record = deepstream.record.getRecord( entry );
    			record.subscribe( scopeApply );
    			return record;
    		});

    		scopeApply();
    	});

      list.whenReady(function(){
        console.log(list.getEntries());
      });

      $scope.finished = 0;

      $scope.markdone = function(todoId){

        Todo.prototype$updateAttributes(
          { id: todoId }, {finished: 1},
          function(res){
            $scope.refreshTodos();
          });

      };

      $scope.markAsTodo = function(todoId){

        Todo.prototype$updateAttributes(
          { id: todoId }, {finished: 0},
          function(res){
            $scope.refreshTodos();
          });

      };




    }]);
