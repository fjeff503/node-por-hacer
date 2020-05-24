//requires
const fs = require('fs');

//arreglo para los productos
let productoCaracteristicas = [];

//funciones especificas
const guardarDB = () => {
    //paso el arreglo a formato json
    let data = JSON.stringify(productoCaracteristicas);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new error('valio queso papu ', err);
    });
}

const cargarDB = () => {
    try {
        //cargo los datos que tengo almacenados
        productoCaracteristicas = require('../db/data.json');
    } catch (error) {
        productoCaracteristicas = [];
    }
}

//funciones crud
const crear = (nombre, oferta) => {
    //cargar los datos que ya tengo
    cargarDB();

    //paso los datos que añadire
    let producto = {
        nombre: nombre,
        oferta: oferta
    }

    //agrego los datos al arreglo
    productoCaracteristicas.push(producto);

    //guardo el arreglo con los datos agregados
    guardarDB();
};


const mostrar = (oferta) => {
    //cargamos la base de datos
    cargarDB();

    //nueva lista vacia para almacenar la informcaion de los filtros
    let nuevaLista

    //validamos el filtro
    switch (oferta) {
        case undefined:
            return productoCaracteristicas;
            break;

        case 'true':
            nuevaLista = productoCaracteristicas.filter((producto) => producto.oferta === oferta);
            return nuevaLista;
            break;

        case 'false':
            nuevaLista = productoCaracteristicas.filter((producto) => producto.oferta === oferta);
            return nuevaLista;
            break;

        default:
            return ('Verifique el filtro para la oferta')
            break;
    }


};


const modificar = (nombre, oferta) => {
    //cargamos la data
    cargarDB();

    //buscamos el index
    let index = productoCaracteristicas.findIndex((producto) => producto.nombre === nombre);

    if (index >= 0) {
        //modificamos
        productoCaracteristicas[index].oferta = oferta;
        //almacenamos la modificacion
        guardarDB();
        return ('producto modificado con exito');
    } else {
        return (`${nombre} no existe en la base de datos`)
    }
};


const eliminar = (nombre) => {
    //cargamos la informacion
    cargarDB();
    //almacenamos en una lista los elementos que no coincidan
    let nuevaLista = productoCaracteristicas.filter((producto) => producto.nombre !== nombre);
    //validamos si hay coincidencias
    if (productoCaracteristicas.length !== nuevaLista.length) {
        productoCaracteristicas = nuevaLista;
        guardarDB();
        return (`${nombre} fue eliminado con exito`);
    } else {
        return (`${nombre} no existe en la base de datos`);
    }

};


module.exports = {
    crear,
    mostrar,
    modificar,
    eliminar
}