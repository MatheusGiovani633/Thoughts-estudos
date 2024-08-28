const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express();
const conn = require('./db/conn')

const Tought = require('./models/Tought')
const User = require('./models/User')

//importa Routers
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// importa Controller
const ToughtsController = require('./controllers/ToughtsController')

app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json())
//session middleware - salva as sessoes
app.use(
    session({
        // Configuração do middleware de sessão
        name: "session", // Define o nome do cookie que armazena o identificador da sessão
        secret: "nosso_secret", // Chave secreta usada para assinar o cookie da sessão. Deve ser uma string segura
        resave: false, // Se `false`, a sessão não será salva de volta na loja se não for modificada durante a requisição
        saveUninitialized: false, // Se `false`, uma nova sessão não será salva se não for modificada
        store: new FileStore({
            // Configura o armazenamento das sessões usando arquivos
            logFn: function() {}, // Função de log personalizada. Está vazia aqui, então não faz nada
            path: require('path').join(require('os').tmpdir(), 'sessions') // Caminho onde os arquivos de sessão serão armazenados
        }),
        cookie: {
            // Configura as opções do cookie da sessão
            secure: false, // Se `true`, o cookie só será enviado sobre HTTPS. `false` significa que será enviado em qualquer conexão
            maxAge: 360000, // Tempo de vida do cookie em milissegundos. Aqui, o cookie expirará em 360000 ms (6 minutos)
            expires: new Date(Date.now() + 360000), // Data e hora em que o cookie expirará. Definido para 6 minutos a partir do momento atual
            httpOnly: true // Se `true`, o cookie não será acessível via JavaScript no lado do cliente (protege contra ataques XSS)
        }
    })
);
// flash messages
app.use(flash())

//css
app.use(express.static('public'))

// set session to res
app.use((req,res,next) => {
    if(req.session.userid){ // usuario logado manda para resposta se não logado, segue sem login
        res.locals.session = req.session
    }
    next()
})
app.use('/toughts', toughtsRoutes)
app.use('/',authRoutes)

app.get('/',ToughtsController.showToughts)

conn 
    // .sync({force:true})  
    .sync()
    .then(()=>{
        app.listen(3000)
    })
    .catch((err)=> console.log(err))