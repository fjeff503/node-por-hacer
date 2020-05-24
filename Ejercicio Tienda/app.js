//requires
let argv = require('./config/yargs').funcionArgv;
let crud = require('./gestionProductos/crud');
let colors = require('colors');
//recogemos el comando que se digite
let comando = argv._[0];

//validamos el comando
switch (comando) {
    //--------------------------------------------------------------------------------------------------------------------------//    
    case 'guardar':
        //enviamos la informacion que guardaremos
        crud.crear(argv.nombre, argv.oferta);
        console.log(`El producto ${argv.nombre} fue agregado con exito`);
        break;
        //--------------------------------------------------------------------------------------------------------------------------//
    case 'mostrar':
        //tremos la data 
        let productos = crud.mostrar(argv.oferta);
        let i = 1;
        //validar que hayan productos
        if (productos.length == 0) {
            console.log('no ha productos para mostrar');
        }
        //recorremos los productos
        for (const producto of productos) {
            //mostrammos
            console.log(`======== PRODUCTO ${i} ========`.red);
            console.log(`Nombre : ${producto.nombre}`);
            //validamos si son con oferta o no
            if (producto.oferta == "true") {
                console.log('Oferta: Producto en oferta');
            } else {
                console.log('Oferta: Producto sin oferta');
            }
            console.log('============================'.red);
            i++;
        }

        break;
        //--------------------------------------------------------------------------------------------------------------------------//
    case 'editar':
        let editado = crud.modificar(argv.nombre, argv.oferta);
        console.log(editado);
        break;
        //--------------------------------------------------------------------------------------------------------------------------//
    case 'eliminar':
        let borrado = crud.eliminar(argv.nombre);
        console.log(borrado);

        break;
        //--------------------------------------------------------------------------------------------------------------------------//
    case undefined:
        console.log('Debe introducir un comando (guardar, mostrar, editar, eliminar)');
        break;
        //--------------------------------------------------------------------------------------------------------------------------//
    default:
        console.log('el comando no es reconocido');
        break;
}