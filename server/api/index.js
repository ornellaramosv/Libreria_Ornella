"use strict";

const acciones = require("express").Router();
let moment = require("moment");

/*Creacion BD Temporal*/
let BD_ANUNCIO = [
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

/*Consultar todos los anuncios*/
acciones.get("/anuncios", (req, res, next) => {
  res.json(BD_ANUNCIO);
});

/*Consultar un anuncios*/
acciones.get("/anuncio/:id", (req, res, next) => {
  let busqueda = BD_ANUNCIO.find(function(element) {
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

	let previo=BD_ANUNCIO.length;
	let temp_libro = {
		id: (BD_ANUNCIO.length > 0) ? BD_ANUNCIO[BD_ANUNCIO.length-1].id + 1 : 1,
		contenido: req.body.contenido,
		autor: req.body.autor,
		ubicacion: req.body.ubicacion,
		fec_crea: moment().format(),
		fec_edi: moment().format()
	}

  let nueva_dimension = BD_ANUNCIO.push(temp_libro)

	if (nueva_dimension>previo) {
   res.json({message: `anuncio guardado correctamente.`})
  }else{
   res.json({error: `Error al guardar, favor verificar.`})
 	}
});

/*Actualizar Libro*/
acciones.put("/actualizar/:id",(req,res,next) => {
  let update=false;
  BD_ANUNCIO.forEach(actualizar);

  function actualizar(item,index){
    if(item.id==req.params.id){
      BD_ANUNCIO[index] = {
        id: BD_ANUNCIO[index].id,
        contenido: req.body.contenido || BD_ANUNCIO[index].contenido,
        autor: req.body.autor || BD_ANUNCIO[index].autor,
        ubicacion: req.body.ubicacion || BD_ANUNCIO[index].ubicacion,
        fec_crea: BD_ANUNCIO[index].fec_crea,
        fec_edi: moment().format()
      }
      update=true;
    };
  }

  if (update) {
   res.json({message: `Anuncio actualizado correctamente.`})
  }else{
   res.json({error: `Error al actualizar, favor verificar.`})
 	}
});

/*Eliminar libro*/
acciones.delete("/borrar/:id",(req,res,next) => {
  let borrado=false;
  BD_ANUNCIO.forEach(eliminar);

  function eliminar(item,index){
    if(item.id==req.params.id){
        BD_ANUNCIO.splice(index, 1);
        borrado=true;
    };
  }

  if (borrado) {
   res.json({message: `Anuncio eliminado correctamente.`})
  }else{
   res.json({error: `Error al eliminar, favor verificar.`})
  }
});

module.exports = acciones;
