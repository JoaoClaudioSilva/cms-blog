const path = require('path');
const session = require('express-session');
const express = require('express');
const app = express();
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');


require('dotenv').config()
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({                       // Utilização de sessão
    secret: '3#jK@5$!LmPqRtUvWx*7',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());                // Configuração para analisar solicitações codificadas

app.use(express.static('public'));      // Pasta que contém arquivos estáticos

app.use(flash(app));                    // Configuração para apresentar notificações na tela


// Configuração do Mustache
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);     // Setup da engine


app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'mustache'); // Pasta que contém arquivos Mustache


// Roteamento de páginas
app.get('/', (req, res) => res.render('inicial'));  // Página inicial

app.use('/usuario', require('./routes/route_users'));
app.use('/artigos', require('./routes/route_articles'));
app.use('/admin', require('./routes/route_admins'));

app.get('/loginautomatico', (req, res) => {
    req.session.user = 'admin';
    req.session.isAdmin = true;

    res.redirect('/artigos');
});                                 // Página temporária para login como admin


module.exports = app;