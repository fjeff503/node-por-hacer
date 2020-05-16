//requires
const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

//extraer el comando que se digite en la linea de comando
let comando = argv._[0];

//validar los comandos
switch (comando) {
    case 'crear': //para crear tarea
        let tarea = porHacer.crear(argv.descripcion); //almacenamos en una variable la respuesta de la funcion del otro archivo
        console.log(tarea); //mostramos la tarea
        break;

    case 'listar':
        let listado = porHacer.getListado(argv.completado);

        for (const tarea of listado) {
            console.log('====== Por Hacer ======'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('======================='.green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('comando no reconocido');
        break;
}