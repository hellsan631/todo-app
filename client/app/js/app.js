angular
  .module('app', [
    'ngResource',
    'lbServices'
  ]).controller('whiplash', ['$scope', '$rootScope', 'Todo',
    function($scope, $rootScope, Todo) {

      $scope.text = 'hello';
      $scope.language = {
        done: 'Mark as done',
        todo: 'Mark as things'
      };

      $scope.finished = 0;

      $scope.refreshTodos = function(){

        var filter = {filter: {where: {finished: $scope.finished}}};

        Todo.find(filter,
          function (response){
            $scope.todos = response;
          });
      };

      $scope.refreshTodos();

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
