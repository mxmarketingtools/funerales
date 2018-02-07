const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'mail.mxmarketingtools.com',
    port: 587,
    secure: false,
    auth: {
        user: 'soportemxtools',
        pass: 'soporte001'
    },
    tls: {rejectUnauthorized: false},
    debug: true
});

function correoContacto(req, res) {
    const body = req.body;
    console.log(body);
    let mailOptions = {
        from: 'soporte@mxmarketingtools.com', // sender address
        to: 'soporte@mxmarketingtools.com', // list of receivers
        subject: 'Tienes un nuevo mensaje de contacto de parte de: ' + body.nombre, // Subject line
        // text: 'Nuevo correo de ' + body.correo, // plain text body
        html: '<b>Nombre:</b>' + '</br>' + body.nombre + '</br>' + '<b>Correo:</b>' + '</br>' + body.email + '</br>' +
        '<b>Telefono:</b>' + '</br>' + body.telefono + '</br>' +
        '<b>Mensaje:</b> ' + '</br>' + body.mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({
                message: 'Error al envíar el formulario. Porfavor Intentalo más tarde',
                err: error
            })
        } else {
            res.status(200).json({nombre: body.nombre});
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = {
    correoContacto
};