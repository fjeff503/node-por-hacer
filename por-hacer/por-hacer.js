//requires
const fs = require('fs');

//listados
let listadoPorHacer = [];

//guardamos la info 
const guardarDB = () => {
    //convertimos el arreglo a json
    let data = JSON.stringify(listadoPorHacer);

    //escribimos en el doc
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new error('no se pudo grabar', err);
    });

}

//leer la informacion del archivo JSON
const cargarDB = () => {

    //validar si el listado esta vacio
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

//funcion crear
const crear = (descripcion) => {
    //antes de todo cargar la base de datos para hacer el append de la data
    cargarDB();

    //creo el objeto con la descripcion de la tarea
    let porHacer = {
        descripcion,
        completado: false
    };

    //agregar el listado a mi arreglo
    listadoPorHacer.push(porHacer);

    //ejecutamos la funcion para guardar la informacion
    guardarDB();

    //retono la tarea por hacer
    return porHacer;
}

//funcion para mostrar el listado
const getListado = (completado) => {
    cargarDB();

    if (completado == "") {
        return listadoPorHacer;
    } else {
        console.log(completado);
        //hacer la lista excluyendo lo que no se quiere
        let nuevoListado = listadoPorHacer.filter(tarea => String(tarea.completado) === completado);
        return nuevoListado;
    }

}

//funcion para actualizar el true esta de mas ya que del yargs ya viene con true
const actualizar = (descripcion, completado = true) => {
    //cargamos la data
    cargarDB();

    //buscamos el index donde esta la descripcion de la tarea
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //el index si no lo encuentra devuelve un -1

    //valiamos que exista el arreglo
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//funcion para borrar
const borrar = (descripcion) => {
    //cargamos la data
    cargarDB();

    //buscamos el index donde esta la descripcion de la tarea
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //el index si no lo encuentra devuelve un -1

    //valiamos que exista el arreglo
    if (index >= 0) {
        //eliminamos el arreglo que coincida
        listadoPorHacer.splice(index, 1);
        //guardamos cambios
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//exportamos 
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}