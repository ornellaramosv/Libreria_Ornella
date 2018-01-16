"use strict";

const acciones = require("express").Router();
let moment = require("moment");

/*Creacion BD Temporal*/
let BD_LIBROS = [
	{
		id: 1,
		contenido: "Libro de ciencia ficcion: Ready Player One",
		autor: "Ernest Cline",
		ubicacion: "USA",
		fec_crea: moment().format(),
		fec_edi: moment().format()
	},
	{
		id: 2,
		contenido: "Libro de misterio: Gone Girl",
		autor: "Gillian Flyn",
		ubicacion: "USA",
		fec_crea: moment().format(),
		fec_edi: moment().format()
	},
	{
		id: 3,
		contenido: "Libro de Romance: Before You",
		autor: "Jojo Moyes",
		ubicacion: "USA",
		fec_crea: moment().format(),
		fec_edi: moment().format()
	},
	{
		id: 4,
		contenido: "Libro Juvenil: Persona Normal",
		autor: "Benito Taibo",
		ubicacion: "Mexico",
		fec_crea: moment().format(),
		fec_edi: moment().format()
	},
	{
		id: 5,
		contenido: "Libro Distopico: ShadowHunter",
		autor: "Benito Taibo",
		ubicacion: "USA",
		fec_crea: moment().format(),
		fec_edi: moment().format()
	}
];

/*Consultar todos los libros*/
acciones.get("/libros", (req, res, next) => {
  res.json(BD_LIBROS);
});

/*Consultar un libro*/
acciones.get("/libro/:id", (req, res, next) => {
  let busqueda = BD_LIBROS.find(function(element) {
    return element.id == req.params.id;
  });

  res.json(busqueda)
});

/*Insertar Libro*/
acciones.post("/publicar",(req,res,next) => {
	if(req.body.contenido==undefined || req.body.contenido==null || !req.body.contenido){
		res.json({message : "Parametro contenido no puede ir vacio."})
		return;
	}else if (!req.body.contenido.length > 280){
		res.json({message : "El contenido no puede exceder los  280 caracteres"})
		return;
	}

	if(req.body.autor==undefined || req.body.autor==null || !req.body.autor){
		res.json({message : "Parametro autor no puede ser vacio"})
		return;
	}else if (!req.body.autor.length > 32){
		res.json({message : "El autor no puede exceder los  32 caracteres"})
		return;
	}

	if(req.body.ubicacion==undefined || req.body.ubicacion==null || !req.body.ubicacion){
		res.json({message : "Parametro ubicacion no puede ir vacio"})
		return;
	}else if (!req.body.ubicacion.length > 64){
		res.json({message : "La ubicación no puede exceder los  64 caracteres"})
		return;
	}

	let previo=BD_LIBROS.length;
	let temp_libro = {
		id: (BD_LIBROS.length > 0) ? BD_LIBROS[BD_LIBROS.length-1].id + 1 : 1,
		contenido: req.body.contenido,
		autor: req.body.autor,
		ubicacion: req.body.ubicacion,
		fec_crea: moment().format(),
		fec_edi: moment().format()
	}

  let nueva_dimension = BD_LIBROS.push(temp_libro)

	if (nueva_dimension>previo) {
   res.json({message: `Libro guardado correctamente.`})
  }else{
   res.json({error: `Error al guardar, favor verificar.`})
 	}
});

/*Actualizar Libro*/
acciones.put("/actualizar/:id",(req,res,next) => {
  let update=false;
  BD_LIBROS.forEach(actualizar);

  function actualizar(item,index){
    if(item.id==req.params.id){
      BD_LIBROS[index] = {
        id: BD_LIBROS[index].id,
        contenido: req.body.contenido || BD_LIBROS[index].contenido,
        autor: req.body.autor || BD_LIBROS[index].autor,
        ubicacion: req.body.ubicacion || BD_LIBROS[index].ubicacion,
        fec_crea: BD_LIBROS[index].fec_crea,
        fec_edi: moment().format()
      }
      update=true;
    };
  }

  if (update) {
   res.json({message: `Libro actualizado correctamente.`})
  }else{
   res.json({error: `Error al actualizar, favor verificar.`})
 	}
});

/*Eliminar libro*/
acciones.delete("/borrar/:id",(req,res,next) => {
  let borrado=false;
  BD_LIBROS.forEach(eliminar);

  function eliminar(item,index){
    if(item.id==req.params.id){
        BD_LIBROS.splice(index, 1);
        borrado=true;
    };
  }

  if (borrado) {
   res.json({message: `Libro eliminado correctamente.`})
  }else{
   res.json({error: `Error al eliminar, favor verificar.`})
  }
});

module.exports = acciones;
