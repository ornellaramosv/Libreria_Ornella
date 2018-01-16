# Topicos Especiales - Node js

Taller # 1
Ornella Tatiana Ramos Velandia
Universidad Del Norte
2018

### Requisitos Previos

```
node js ^8.x.x
```

### Instalacion

Clona el repositoio

```
git clone https://github.com/ornellaramosv/Libreria_Ornella.git
```

Instalar dependencias

```
npm install
```

Ejecuta el proyecto

```
npm start
```

### Documentacion

* GET `/libros` : Obtienes en formato JSON todos los libros almacenados en memoria.

* GET `/libro/:id` : Obtienes en formato JSON el libro correspondiente al :id enviado como parametro en la url.
	* **Parametros URL**
	`id=[integer]`

* POST `/libro` : Crea un nuevo libro en memoria.
	* **Parametros a enviar**
	```json
	contenido=[string]
	autor=[string]
	ubicacion=[string]
	```

	* **Ejemplo:**
	```json
	{
		"contenido": "Libro Distopico: Iluminae",
		"autor": "Kaufman Fristoff",
		"ubicacion": "USA"
	}
	 ```

* PUT `/actualizar/:id` : Edita el libro correspondiente al :id enviado como parametro en la url.
	* **Parametros URL**
	`id=[integer]`

	* **Parametros a enviar**
	```json
	contenido=[string] (opcional)
	autor=[string] (opcional) (opcional)
	ubicacion=[string] (opcional)
	```

	* **Ejemplo:**
	```json
	{
		"contenido": "Libro Distopico: Iluminae Parte II.",
		"autor": "Kaufman Fristoff",
		"ubicacion": "USA"
	}
	 ```

* DELETE `/borrar/:id` : Elimina el libro guardado en memoria.
	* **Parametros URL**
	`id=[integer]`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
