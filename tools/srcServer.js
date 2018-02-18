import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackConfig from '../webpack.config';

const config = webpackConfig('development');
const bundler = webpack(config);

browserSync({
  port: process.env.PORT || 8000,
  server: {
    baseDir: 'src',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true },
        noInfo: true
      }),
      webpackHotMiddleware(bundler),
      historyApiFallback()
    ]
  },

  files: [
    'src/*.html'
  ]
});
