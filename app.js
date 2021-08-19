require('colors');

const Tareas = require('./models/tareas');

const { inquirerMenu,
        inquirerPausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoTareasChecklist
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ){ // Establecer las tareas
        tareas.cargarTareasDelArreglo( tareasDB );
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Crear opción
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                break;

            case '2': // Listar todas las tareas
                tareas.listadoCompleto();
                break;

            case '3': // Listar tareas completadas
                tareas.listarPendientesCompletadas();
                break;

            case '4': // Listar tareas completadas
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': // Compleatdo | Pendiente
                const ids = await mostrarListadoTareasChecklist( tareas.listadoArr );
                tareas.intercambiarCompletada( ids );
                break;

            case '6': //Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ){
                    //TODO: Confirmación
                    const ok = await confirmar('¿Estas seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id );
                        console.log();
                        console.log('  Tarea borrada...'.brightRed);
                    }
                }
                break;
        }

        guardarDB( tareas.listadoArr );

        await inquirerPausa();

    } while( opt !== '0' );
};

main();
