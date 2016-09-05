const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const Provider = require('react-redux').Provider;
const exphbs = require('express-handlebars');
const postcss = require('postcss-middleware');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');
const webpack = require('webpack');
const config = require('./webpack.config');
// Dev requires
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
const contactController = require('./controllers/contact');

// React and Server-Side Rendering
const routes = require('./app/routes');
const configureStore = require('./app/store/configureStore').default;

const app = express();

const compiler = webpack(config);

const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        ifeq: (a, b, options) => {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        toJSON: (object) => JSON.stringify(object)
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use('/css', postcss({
    src: (req) => path.join(__dirname, 'public', 'css', req.path),
    plugins: [atImport(), cssnext()]
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.use(webpackDev(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHot(compiler));
}

app.post('/contact', contactController.contactPost);

// React server rendering
app.use((req, res) => {
    const initialState = {
        messages: {}
    };

    const store = configureStore(initialState);

    Router.match({
        routes: routes.default(store), location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const html = ReactDOM.renderToString(React.createElement(Provider, { store },
                React.createElement(Router.RouterContext, renderProps)
            ));
            res.render('layouts/main', {
                html,
                initialState: store.getState()
            });
        } else {
            res.sendStatus(404);
        }
    });
});

// Production error handler
if (app.get('env') === 'production') {
    app.use((err, req, res) => {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
