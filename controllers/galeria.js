const Galeria = require('../models/galeria');

const path = require('path');
const fs = require('fs');

function nuevaImagen(req, res) {
    console.log(req.files[0].path);
    var file_name = 'No subido...';

    if (req.files) {
        let galeria= new Galeria();

        var file_name = 'No subido...';
        var file_path = req.files[0].path;
        var file_split = file_path.split('/');
        console.log(file_split[2]);
        file_name = file_split[2] + path.extname(req.files[0].originalname);
        var filename = (new Date).valueOf() + '-' + req.files[0].originalname;
        fs.rename(req.files[0].path, 'uploads/galeria/' + file_name, (err) => {
            if (err) throw err;
        });
        galeria.imagen = file_name;


        // Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) =>{
        galeria.save((err, imageStored) => {
            if (err) {
                res.status(500).send({message: 'Error en la petición'});
            } else {
                if (!imageStored) {
                    res.status(404).send({message: 'Error al actualizar Imagen'});
                } else {
                    res.status(200).send({imagen: imageStored});
                }
            }
        });
    } else {
        res.status(200).send({message: 'No se ha subido ninguna imagen'});
    }
}

function verImagen(req, res) {
    var imageFile = req.params.imageFile;
    res.sendFile(path.resolve('./uploads/galeria/' + imageFile));

}

function getImages(req, res) {
    let find = Galeria.find({});
    find.exec((err, images) => {
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if (!images) {
                res.status(404).send({mesage: 'Error en la petición'});
            } else {
                res.status(200).send(images);
            }
        }
    });
}

module.exports = {
    nuevaImagen,
    verImagen,
    getImages
};