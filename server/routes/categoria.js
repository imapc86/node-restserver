const express = require('express');

let {verificaToken, verificaAdmin_role} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


/**
* Mostrar todas las categorias 
*/
app.get('/categoria', verificaToken, (req, res)=>{

	Categoria.find({})
		.sort('descripcion')
		.populate('usuario', 'nombre email')
		.exec((err, categorias)=>{

			if(err){
				return res.status(500).json({
					ok: false,
					err
				});	
			}

			res.json({
				ok: true,
				categorias
			});
		});
});

/**
* Mostrar una categoria por ID 
*/
app.get('/categoria/:id', verificaToken, (req, res)=>{
	
	let id = req.params.id;

	Categoria.findById(id, (err, categoriaDB)=>{
		if(err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!categoriaDB){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'El ID no es correcto'
				}
			});
		}
		res.json({
			ok: true,
			categoria: categoriaDB
		});

	});
});

/**
* Crear nueva categoría 
*/
app.post('/categoria', verificaToken, (req, res)=>{

	let body = req.body;

	let categoria = new Categoria({
		descripcion: body.descripcion,
		usuario: req.usuario._id
	});

	categoria.save((err, categoriaDB)=>{
		if(err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!categoriaDB){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			categoria: categoriaDB

		});
	});

});

/**
* Actualizar una categoría
*/
app.put('/categoria/:id', verificaToken, (req, res)=>{
	let id = req.params.id;
	let body = req.body;

	let descCategoria = {
		descripcion: body.descripcion
	}

	Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators: true }, (err, categoriaDB)=>{
		if(err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!categoriaDB){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			categoria: categoriaDB

		});
	});
});

/**
* Borrar la categoría
*/
app.delete('/categoria/:id', [verificaToken, verificaAdmin_role], (req, res)=>{
	// Solo un administrador puede borrar la categoria 
	//Se borra la categoría, no desactivar.

	let id = req.params.id;

	Categoria.findByIdAndRemove(id, (err, categoriaDB)=>{
		
		if(err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if(!categoriaDB){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'El ID no existe'
				}
			});
		}

		res.json({
			ok: true,
			message: 'Categoria borrada'
		});
	});
});



module.exports = app;