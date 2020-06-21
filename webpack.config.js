/****************************************************
 *
 * WEBPACK CONFIGURATION FILE
 * (to build a growl browser bundle in "dist" folder)
 *
 ***************************************************/
'use strict';


const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');               // creates index.html in web/public directory
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');   // removes obsolete hashed files from previous builds
const TerserPlugin = require('terser-webpack-plugin');
const postCssLoader = {
    loader: 'postcss-loader',       // adds browser specific prefixes for improved html5 support
    options: {
        config: { path: 'web/postcss.config.js' }
    }
};
const babelLoader = {
    loader: 'babel-loader',
    options: {
        babelrc: false,
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    'absoluteRuntime': false,
                    'corejs': false,
                    'helpers': false,
                    'regenerator': true,
                    'useESModules': true,
                    'version': "^7.8.4"
                }
            ]
        ],   // solves regenerator runtime errors with dynamic imports
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: '> 1.5%, not dead',
                    modules: false,   // by default, Babel rewrites modules to use CommonJS, which won’t tree-shake!
                },
            ]
        ],
        cacheDirectory: true,    // speeds up babel compilation (default cache: node_modules/.cache/babel-loader)
    }
};
const sourcePath = './src/';



module.exports = (env, argv) => {
    const isDev = argv.mode !== 'production';
    // const isDev = true;    // set false for production build

    console.warn(`\n\n\n=============================================`);
    console.info(`Building core Growl bundle for ${isDev ? 'development' : 'production'}...`);
    console.warn(`=============================================`);


    return {
        entry: './src/growl-global.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'growl.js',
            publicPath: '/',                        // where browser will request the webpack files
            chunkFilename: 'chunk_[name].js'        // chunk filename
        },
        watch: isDev,
        devtool: isDev ? 'source-map' : false,  // useful for debugging.
        performance: { hints: false },  // prevent webpack logging warnings for bundles > 200kb

        module: {
            rules: [
                // css
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',       // translates CSS into CommonJS
                        postCssLoader,
                    ],
                },
                // js
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [ babelLoader ]
                },
                // stylus
                {
                    test: /\.styl$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',       // translates CSS into CommonJS
                        postCssLoader,      // allows es6 css imports
                        'stylus-loader',    // compiles stylus into CSS
                    ],
                },
            ]
        },


        plugins: [
            new CleanObsoleteChunks(),  // removes obsolete hashed files from previous builds
            new HtmlWebpackPlugin({
                template: sourcePath + 'demo.html',
                minify: !isDev && {
                    html5: true,
                    caseSensitive: true,
                    removeComments: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'index.css',
                chunkFilename: 'chunk_[name].css',
                options: {
                    esModule: true,     // default is CommonJS modules syntax - ESM allows tree shaking
                    publicPath: 'dist',
                    sourceMap: isDev,
                    minimize: !isDev,
                },
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',    // eg. $('#item') will just work anywhere (without jQuery require)
            }),
            new TerserPlugin({
                parallel: true,
                extractComments: false,     // don't extract code comments (ie licence agreements) to a separate text file
                terserOptions: {
                    output: {comments: false},
                    sourceMap: isDev,
                    cache: true,
                    ecma: 5,
                    ie8: false,
                    mangle: false
                },
            })
        ],
    };
};