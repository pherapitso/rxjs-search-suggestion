var path = require('path');
module.exports = {
    entry : './app/main.js',
 
    output:{
        path: path.resolve(__dirname,'public/'),
        filename:'bundle.js'
    },
 
    module:{
        rules : [
            { test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
   
    devServer:{
    publicPath: '/',
    contentBase:'./public'
  
  }
 
 
}
