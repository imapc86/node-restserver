const mongoose = require('mongoose');

const Schema = mongoose.Schema; //Definir esquema. Debe ser con S mayuscula por estandar.


let categoriaSchema = new Schema({
	descripcion:{
		type: String,
		unique: true,
		required: [true, 'La descripción es obligatoria']
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: [false, 'El usuario es necesario']
	}
});

module.exports = mongoose.model('Categoria', categoriaSchema);