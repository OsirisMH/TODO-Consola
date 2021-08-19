const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor( id, desc, completadoEn ) {
        this.id = id;
        this.desc = desc;
        this.completadoEn = completadoEn;
    }

    static defaultConstructor( desc ) {
        return new Tarea( uuidv4(), desc, null );
    }

    static DBConstructor({ id, desc, completadoEn }){
        return new Tarea( id, desc, completadoEn );
    }
}

module.exports = Tarea;