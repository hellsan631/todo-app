angular
  .module('app')
  .controller('TodoController', ['$scope', '$rootScope', 'Todo', 'DS',
    function($scope, $rootScope, Todo, DS) {

      /////////////////
      ///// Initial Setup
      /////////////////

      $('.modal-trigger').leanModal();
      resetTodo();
      $scope.finished = false;

      /////////////////
      ///// Add Todo Data Stream to Model
      /////////////////

      var todoList = DS.link($scope, 'Todo', 'todos');

      /////////////////
      ///// Page Actions
      /////////////////

      $scope.createTodo = function(){
        var modal = $('#createTodo');
        modal.openModal();

        $scope.ok = function(){

          if(!validateTodo($scope.newTodo)){
            resetTodo();
            return modal.closeModal();
          }

          var name = 'Todo/' + $scope.newTodo.id;

          DS.source
            .record
      			.getRecord(name)
      			.set($scope.newTodo);

          todoList.addEntry(name);

          resetTodo();

          modal.closeModal();
        };

        $scope.cancel = function(){
          resetTodo();
          modal.closeModal();
        };
      };

      $scope.markAsDone = function(todoId){

      };

      $scope.markAsTodo = function(todoId){

      };

      /////////////////
      ///// Required Functions
      /////////////////

      function validateTodo(todo){
        if(todo.title.length < 1){
          return false;
        }

        return true;
      }

      function resetTodo(){
        $scope.newTodo = {
          id: DS.source.getUid(),
          title: '',
          text: '',
          createdOn: (new Date()).toString(),
          finished: false
        };
      }

    }]);
