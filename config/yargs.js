//flags
let descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

let completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

//requires
const argv = require('yargs')
    .command('crear', 'crear un elemento por hacer', {
        descripcion
    })
    .command('listar', 'mostrar elementos creados', {
        completado: {
            alias: 'c',
            desc: 'Filtro para mostrar tareas'
        }
    })
    .command('actualizar', 'actualizar el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'eliminar una tarea', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
};