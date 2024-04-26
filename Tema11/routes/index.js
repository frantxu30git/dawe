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
        mongoUrl: 'mongodb://localhost/dawe',
        collectionName: 'sessions' // Nombre de la colección para las sesiones
    }),
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));
function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.email) { // Verificar el email en la sesión
        return next();
    } else {
        res.render('error', {
            error: 'Unauthorized',
            message: 'Por favor, inicie sesión para acceder a esta sección.'
        });
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
    res.setHeader('Cache-Control', 'no-store'); // Evitar almacenamiento en caché
    const email = req.session.user?.email;

    if (!email) {
        return res.render('error', {
            error: 'Unauthorized',
            message: 'Por favor, inicie sesión para acceder a esta sección.'
        });
    }

    try {
        const clientes = await Cliente.find({});
        res.render('users', { email, clientes });
    } catch (error) {
        res.render('error', {
            error: 'Server Error',
            message: 'Error al obtener clientes.'
        });
    }
});


router.get('/',(req,res) => {
    if(req.session.email) {
        return res.redirect('/users');
    }
    res.redirect('/email-password.html');
});
//acceder a users si estas logeado


// Ruta para procesar inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (isValidUser(email, password)) { // Simulación de autenticación
        req.session.user = { email: email }; // Guarda el email en la sesión
        console.log('Sesión establecida:', req.session); // Verificar qué se guarda en la sesión
        res.redirect('/users');
    } else {
        res.render('error', { error: 'Unauthorized', message: 'Correo electrónico o contraseña incorrectos.' });
    }
});





router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir la sesión:", err);
            res.status(500).send("Error al cerrar sesión");
        } else {
            res.clearCookie('connect.sid'); // Eliminar la cookie de sesión
            res.redirect('/'); // Redirigir a la página de inicio después de cerrar sesión
        }
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
// Añadir un nuevo cliente
router.post('/clientes/nuevo', isAuthenticated, async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body;
        // Crear y guardar el nuevo cliente
        const nuevoCliente = new Cliente({ nombre, apellido, email });
        await nuevoCliente.save();

        res.redirect('/users'); // Redirigir a la lista de clientes
    } catch (error) {
        console.error("Error al añadir cliente:", error);
        res.status(500).send("Error al añadir cliente");
    }
});

// Editar un cliente existente
router.post('/clientes/:id/editar', isAuthenticated, async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body;
        const clienteId = req.params.id;

        // Actualizar el cliente
        await Cliente.findByIdAndUpdate(clienteId, { nombre, apellido, email });

        res.redirect('/users'); // Redirigir a la lista de clientes
    } catch (error) {
        console.error("Error al editar cliente:", error);
        res.status(500).send("Error al editar cliente");
    }
});

// Eliminar un cliente
router.get('/clientes/:id/eliminar', isAuthenticated, async (req, res) => {
    try {
        const clienteId = req.params.id;

        // Eliminar el cliente
        await Cliente.findByIdAndDelete(clienteId);

        res.redirect('/users'); // Redirigir a la lista de clientes
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).send("Error al eliminar cliente");
    }
});




module.exports = router;