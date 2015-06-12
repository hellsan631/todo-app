angular
  .module('app')
  .controller('TodoController', ['$scope', '$rootScope', 'Todo', 'deepstream',
    function($scope, $rootScope, Todo, deepstream) {

      $(document).ready(function(){
        $('.modal-trigger').leanModal();
      });

      var list = deepstream.record.getList('Todo');

      $scope.todos = [];
      $scope.newTodo = {
        id: deepstream.getUid(),
        title: '',
        text: '',
        createdOn: (new Date()).toString(),
        finished: false
      };

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

      $scope.finished = false;

      $scope.createTodo = function(){
        var modal = $('#createTodo');
        modal.openModal();

        $scope.ok = function(){

          if(!validateTodo($scope.newTodo)){
            $scope.resetTodo();
            return modal.closeModal();
          }

          var name = 'Todo/' + $scope.newTodo.id;

      		deepstream
      			.record
      			.getRecord( name )
      			.set($scope.newTodo);

      		list.addEntry(name);

          $scope.resetTodo();

          modal.closeModal();
        };

        $scope.cancel = function(){
          $scope.resetTodo();
          modal.closeModal();
        };

        $scope.resetTodo = function(){
          $scope.newTodo = {
            id: deepstream.getUid(),
            title: '',
            text: ''
          };
        };
      };

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

      function validateTodo(todo){
        if(todo.title.length < 1){
          return false;
        }

        return true;
      }




    }]);
