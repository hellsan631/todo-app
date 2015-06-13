var ds = require('deepstream.io-client-js');

module.exports = function(Todo) {

  Todo.observe('after save', function saveToDeepstream(ctx, next) {

    if(ctx.instance){



    }

    next();


  });

};
