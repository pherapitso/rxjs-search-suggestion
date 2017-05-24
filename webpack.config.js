var path = require('path');
module.exports = {
 
    //location and name of our entry file
    entry : './app/main.js',
 
    //where to put our transpiled and bundled code
    output:{
        path: path.resolve(__dirname,'public/'),
        filename:'bundle.js'
    },
 
     
    module:{
        /* 
        find all file with js extension excluding the ones in node module directory 
        and use babel to transpile javascript code to ES5
       */
        rules : [
            { 
         test: /\.(js)$/,
         exclude:[
           path.resolve(__dirname, "node_modules")
         ],
         loader: 'babel-loader',
         options: {
            presets: ["es2015"]
          }
       }
        ]
    },
     
    devServer:{
    //Server configuration
    publicPath: '/',
    contentBase:'./public'
  
  }
 
 
}
