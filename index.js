var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;

mongoose.connect('mongodb://localhost:27017/funerales_altamira', (err, res) => {
   if(err) {
       throw err;
   }else {
      console.log('bd funcionando');

      app.listen(port, () => {
         console.log('api restful escuchando');
      });
   }
});