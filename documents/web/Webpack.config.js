module.exports = {
    entry: './src/main.js',
    output: {
        filename: './public/js/main.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
          {
              test: [/\.js$/, /\.jsx$/],
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                  presets: ['es2015', 'stage-0', 'react']
              }
          }
        ]
    }
}