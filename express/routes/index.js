var express = require('express');
var router = express.Router();
var session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
var admin = require("firebase-admin");
const Cliente = mongoose.model('Cliente', new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String
}));
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});
// Middleware para verificar autenticación
mongoose.connect('mongodb://localhost/dawe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use the session middleware
router.use(session({
    secret: 'clavesecretaparaexpresss',
    saveUninitialized: false, // No guardar sesiones sin inicializar
    resave: false, // No re-guardar sesiones sin cambios
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/tu-base-de-datos',
        collectionName: 'sessions' // Nombre de la colección para las sesiones
    }),
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));
function isAuthenticated(req, res, next) {
    if (req.session.email) { // Usa el email para verificar autenticación
        return next(); // El usuario está autenticado, continuar
    } else {
        res.redirect('/login'); // No autenticado, redirigir a la página de inicio de sesión
    }
}

router.post('/guardar-sesion', (req, res) => {
    const { email } = req.body;

    // Guarda el email del usuario en la sesión
    req.session.user = { email: email };

    // Responde con éxito
    res.status(200).send('Sesión guardada');
});
// Aplicar middleware a rutas protegidas
router.get('/users', isAuthenticated, async (req, res) => {
    var email = req.session.user; // Obtiene la información del usuario de la sesión
    console.log(email);
    if (!email) {
        email = "gola";
    }
    try {
        // Obtener la lista de clientes desde MongoDB
        const clientes = await Cliente.find({}); // Usar `await` para esperar el resultado

        // Renderizar la vista `users` con la lista de clientes
        res.render('users', {email, clientes});
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.render('error', {message: 'Error al obtener clientes'}); // Manejar el error
    }
});

// usaremos esta funcion para verificar si el usuario esta logeado
// y no permitir que acceda a / sin hacer logout
function redirectIfAuthenticated(req, res, next) {
    if (req.session.email) {
        // Si hay una sesión activa, redirige a la página de perfil de usuario
        res.redirect('/users'); 
    } else {
        // Si no hay sesión, continua con la página principal
        next();
    }
}
//##APARTADO 4
// Ruta principal modificada para usar el nuevo middleware
router.get('/', redirectIfAuthenticated, (req,res) => {
    if(req.session.email) {
        return res.redirect('/email-password.html');
    }
    res.render('index', { title : 'title'});
});

// Ruta para procesar inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Lógica para autenticar usuario (ejemplo genérico)
    if (isAuthenticated(email, password)) {
        req.session.email = email; // Guardar información del usuario en la sesión
        res.redirect('/users'); // Redirigir después del inicio de sesión
    } else {
        res.redirect('/email-password.html'); // Redirigir con mensaje de error
    }
});


router.get('/users', (req,res) => {
    if(req.session.email) {
        res.redirect('/users'); 
    }
    res.render('error', { error, message: 'Por favor logeate para acceder a usuarios' });
});


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});

router.post('/getToken', (req, res) => {
    const idToken = req.body.idToken;

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;

            admin.auth().getUser(uid)
                .then((userRecord) => {
                    console.log('Datos del usuario:', userRecord.toJSON());

                    req.session.email = userRecord.email; // Guardar el email en la sesión
                    res.send({ status: 'done' });
                })
                .catch((error) => {
                    console.log('Error al obtener datos del usuario:', error);
                    res.send({ status: 'error' });
                });
        })
        .catch((error) => {
            console.log('Error al verificar el token:', error);
            res.render('error', { error, message: 'You must be signed-up' });
        });
});




module.exports = router;