//flags
let nombre = {
    alias: 'n',
    demand: "true",
    desc: 'nombre del producto'
}

let oferta = {
    alias: 'o',
    default: "false",
    desc: 'marca del producto'
}

const funcionArgv = require('yargs')
    .command('guardar', 'Comando para poder almacenar un nuevo producto', {
        nombre,
        oferta
    })
    .command('mostrar', 'Comando para poder mostrar un producto', {
        oferta: {
            alias: 'o',
            desc: 'marca del producto'
        }
    })
    .command('editar', 'Comando para poder editar un producto', {
        nombre,
        oferta
    })
    .command('eliminar', 'Comando para poder eliminar un producto', {
        nombre
    })
    .help()
    .argv

module.exports = {
    funcionArgv
}