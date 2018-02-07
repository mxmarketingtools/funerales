var path = require('path');
var Image = require('../models/sucursal-imagenes');
var Sucursal = require('../models/sucursal');

function pruebas(req, res) {
    res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

function getImage(req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if(!image) {
                res.status(404).send({message: 'No existe la imagen'});
            } else {
                Sucursal.populate(image, {path: 'sucursal'}, (err, image) => {
                    if(err) {
                        res.status(500).send({message: 'Error en la petición'});
                    } else {
                        res.status(200).send({imagen: image});
                    }
                });

            }
        }
    });
}

function getImages(req, res) {
    var sucursalId = req.params.sucursal;

    if(!sucursalId) {
        // imagenes de BD
        var find = Image.find({}).sort('title');
    } else {
        // Imagenes de Sucursal
        var find = Image.find({sucursal: sucursalId}).sort('title')
    }

find.exec((err, images) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!images) {
                res.status(404).send({message: 'No hay imagenes asignadas a esta sucursal'});
            } else {
                Sucursal.populate(images, {path: 'sucursal'}, (err, images) => {
                    if(err) {
                        res.status(500).send({message: 'Error en la petición'});
                    } else {
                        res.status(200).send({imagen: images});
                    }
                });
            }
        }
    });
}

function saveImage(req, res) {
    const image = new Image();
    const params = req.body;
    image.title = params.title;
    image.picture = params.picture;
    image.sucursal = params.sucursal;

    image.save((err, imageStored) => {
       if (err) {
           console.log(err);
       } else {
           if (!imageStored) {
               console.log('Error al guardar');
           } else {
               console.log(imageStored);
               // res.status(200).send({imagen: imageStored});
               Sucursal.findById(params.sucursal, (err, sucursalAct) => {
                   if (err) {
                       console.log(err);
                   } else {
                       if(!sucursalAct) {
                           console.log('No se encontro la sucursal');
                       } else {
                           sucursalAct.imagen.push(imageStored);
                           sucursalAct.save((err, sucursalAct) => {
                               res.status(200).send({imagen: imageStored});
                           });
                       }
                   }
               });
           }
       }
    });
}

function updateImage(req, res) {
    var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) =>{
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!imageUpdated) {
                res.status(404).send({message: 'Error al actualizar Imagen'});
            } else {
                res.status(200).send({imagen: imageUpdated});
            }
        }
    });
}

function deleteImage(req, res) {
    var imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if(!imageRemoved) {
                res.status(404).send({message: 'Error al eliminar Imagen'});
            } else {
                res.status(200).send({imagen: imageRemoved});
            }
        }
    });
}

function uploadImage(req, res) {
    var imageId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        file_name = file_split[1];

        Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) =>{
            if(err) {
                res.status(500).send({message: 'Error en la petición'});
            } else {
                if (!imageUpdated) {
                    res.status(404).send({message: 'Error al actualizar Imagen'});
                } else {
                    res.status(200).send({imagen: imageUpdated});
                }
            }
        });
    } else {
        res.status(200).send({message: 'No se ha subido ninguna imagen'});
    }
}

var fs = require('fs');
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;

    fs.exists('./uploads/' + imageFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve('./uploads/'+imageFile));
        } else {
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

module.exports = {
    pruebas,
    getImage,
    saveImage,
    getImages,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
};