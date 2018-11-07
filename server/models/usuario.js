const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol válido.'
}

let Schema = mongoose.Schema; //Definir esquema. Debe ser con S mayuscula por estandar.

let usuarioSchema = new Schema({
	nombre:{
		type: String,
		required: [true, 'El parametro nombre es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El email es necesario']
	},
	password: {
		type: String,
		required: [true, 'La contraseña es necesaria']
	},
    img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

/*Eliminar la contraseña*/
usuarioSchema.methods.toJSON = function(){
	let user = this;
	let userObject = user.toObject();

	delete userObject.password;

	return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);