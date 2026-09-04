# Cuestionario — Evaluación Corte 1

Computación en Internet 3 · Node.js, TypeScript, Express, MongoDB y Mongoose

**Instrucciones:** cada pregunta tiene una única respuesta correcta. Marca tu respuesta cambiando `[ ]` por `[x]` en la opción elegida. No borres las demás opciones.

---

### 1. TypeScript — Propiedades opcionales

Dada la interfaz:

```ts
interface Student {
    id: number;
    name: string;
    nickname?: string;
}
```

¿Qué significa el `?` en `nickname?: string`?

- [ ] a) Que `nickname` acepta cualquier tipo de dato, no solo `string`.
- [ ] b) Que `nickname` puede no estar presente en el objeto, y si está, debe ser `string`.
- [ ] c) Que `nickname` es de solo lectura y no se puede modificar.
- [ ] d) Que `nickname` tiene un valor por defecto asignado automáticamente por TypeScript.

---

### 2. TypeScript — Event loop

¿Cuál es el orden de salida en consola del siguiente código?

```ts
console.log("1");
setTimeout(() => console.log("2"));
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

- [ ] a) 1, 2, 3, 4
- [ ] b) 1, 4, 3, 2
- [ ] c) 1, 4, 2, 3
- [ ] d) 1, 3, 4, 2

---

### 3. TypeScript — `implements`

```ts
class PokeServiceAxios implements HttpAdapter {
    async getPokemon<T>(pokeName: string): Promise<T> { /* ... */ }
}
```

¿Qué garantiza la palabra clave `implements` en este caso?

- [ ] a) Que `PokeServiceAxios` hereda todos los métodos ya implementados en `HttpAdapter`.
- [ ] b) Que `PokeServiceAxios` debe implementar todos los métodos definidos en la interfaz `HttpAdapter`, cumpliendo su forma (firma).
- [ ] c) Que `HttpAdapter` pasa a ser una clase abstracta de la cual `PokeServiceAxios` es subclase.
- [ ] d) Que TypeScript ejecuta automáticamente los métodos de `HttpAdapter` antes que los de `PokeServiceAxios`.

---

### 4. TypeScript — Genéricos

```ts
interface HttpAdapter {
    getPokemon<T>(pokeName: string): Promise<T>;
}
```

¿Qué representa el `T` en esta definición?

- [ ] a) Un tipo fijo llamado `T` que siempre es `string`.
- [ ] b) Un parámetro de tipo que se define en cada llamada, permitiendo que el método devuelva distintos tipos según cómo se use.
- [ ] c) Una abreviación de `Type`, que TypeScript interpreta siempre como `any`.
- [ ] d) Un decorador que valida el tipo de retorno en tiempo de ejecución.

---

### 5. TypeScript — Parámetros de constructor con modificador de acceso

```ts
class Student {
    constructor(
        public id: number,
        public name: string
    ) {}
}
```

¿Qué hace escribir `public` directamente antes de los parámetros del constructor?

- [ ] a) Nada, es solo una anotación decorativa que no cambia el comportamiento.
- [ ] b) Declara y asigna automáticamente `id` y `name` como propiedades públicas de la clase, sin necesidad de escribir `this.id = id` manualmente.
- [ ] c) Hace que esos parámetros sean opcionales al instanciar la clase.
- [ ] d) Convierte esos parámetros en propiedades estáticas de la clase.

---

### 6. Express — Arquitectura en capas

En la arquitectura ruta → controlador → servicio → modelo usada en el curso, ¿cuál es la responsabilidad principal del **controlador**?

- [ ] a) Definir el esquema de datos que se guarda en MongoDB.
- [ ] b) Ejecutar directamente las consultas a la base de datos con Mongoose.
- [ ] c) Recibir el `Request`/`Response` de Express, delegar la lógica de negocio al servicio, y construir la respuesta HTTP.
- [ ] d) Registrar las rutas HTTP disponibles de la aplicación.

---

### 7. Express — Middleware

```ts
this.app.use(express.json());
```

¿Para qué sirve este middleware?

- [ ] a) Para servir archivos estáticos como HTML, CSS e imágenes.
- [ ] b) Para parsear el body de las peticiones entrantes con `Content-Type: application/json` y dejarlo disponible en `request.body`.
- [ ] c) Para convertir automáticamente las respuestas del servidor a formato JSON.
- [ ] d) Para validar que el body cumpla con un esquema de Mongoose antes de llegar al controlador.

---

### 8. Express — `app.use` vs `router.get`

¿Cuál es la diferencia principal entre `app.use("/students", studentRouter)` y `studentRouter.get("/", studentController.getAll)`?

- [ ] a) No hay diferencia, son dos formas equivalentes de escribir lo mismo.
- [ ] b) `app.use` solo funciona con middlewares, nunca con routers.
- [ ] c) `app.use` monta un router (o middleware) bajo un prefijo de ruta para cualquier método HTTP; `router.get` registra un manejador para un método y ruta específicos dentro de ese router.
- [ ] d) `router.get` define rutas globales de la aplicación, mientras que `app.use` solo aplica a un router específico.

---

### 9. Express — Códigos de estado HTTP

Según las convenciones REST, ¿qué código de estado HTTP es el más apropiado para indicar que un recurso solicitado **no existe**?

- [ ] a) 400 Bad Request
- [ ] b) 404 Not Found
- [ ] c) 401 Unauthorized
- [ ] d) 500 Internal Server Error

---

### 10. Express — `Router`

¿Qué es un `Router` de Express y para qué se usa principalmente en este curso?

- [ ] a) Es el objeto que gestiona la conexión a la base de datos MongoDB.
- [ ] b) Es un mini-aplicación de Express que permite agrupar y modularizar rutas relacionadas (por ejemplo, todas las de `/students`) antes de montarlas en la app principal.
- [ ] c) Es un middleware que traduce automáticamente las peticiones HTTP a operaciones de Mongoose.
- [ ] d) Es una clase que reemplaza a los controladores para manejar la lógica de negocio.

---

### 11. Mongoose — Definición del modelo

```ts
export const StudentModel = mongoose.model<StudentDocument>("Student", studentSchema);
```

¿Qué hace esta línea?

- [ ] a) Crea la base de datos `Student` en MongoDB si no existe.
- [ ] b) Registra un modelo de Mongoose llamado `Student`, tipado con `StudentDocument`, que Mongoose usará para generar (por defecto) la colección `students` y ejecutar operaciones sobre ella.
- [ ] c) Define un middleware de Express para las rutas relacionadas con estudiantes.
- [ ] d) Valida que el `studentSchema` no tenga campos duplicados.

---

### 12. Mongoose — `findOne` vs `find`

¿Cuál es la diferencia entre `StudentModel.findOne({ email })` y `StudentModel.find({ email })`?

- [ ] a) `findOne` devuelve el primer documento que cumple el filtro (o `null`); `find` siempre devuelve un arreglo con todos los documentos que cumplen el filtro.
- [ ] b) `find` es más rápido porque no consulta la base de datos, solo la caché.
- [ ] c) `findOne` solo funciona con el campo `_id`, mientras que `find` acepta cualquier campo.
- [ ] d) No hay diferencia funcional entre ambos métodos.

---

### 13. Mongoose — `findOneAndUpdate`

```ts
await StudentModel.findOneAndUpdate({ email }, student, { returnOriginal: false });
```

¿Qué logra la opción `{ returnOriginal: false }`?

- [ ] a) Que Mongoose no actualice el documento, solo simule la operación.
- [ ] b) Que el método devuelva el documento **ya actualizado**, en lugar del documento como estaba antes del cambio.
- [ ] c) Que se elimine el documento original después de actualizarlo.
- [ ] d) Que se cree un nuevo documento en vez de actualizar el existente.

---

### 14. Mongoose — Validación de esquema

```ts
const studentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    ...
});
```

¿Qué ocurre si se intenta crear un estudiante **sin** el campo `email`?

- [ ] a) Mongoose lo crea igual, asignando `email` como `null` automáticamente.
- [ ] b) Mongoose lanza un error de validación y no crea el documento.
- [ ] c) Express responde automáticamente con un `404 Not Found` antes de llegar al servicio.
- [ ] d) TypeScript impide que el código compile, sin importar qué tan flexible sea el tipo usado.

---

### 15. Mongoose — Operadores de consulta

Para buscar estudiantes cuya edad esté **entre** un valor mínimo y uno máximo (inclusive), ¿qué operadores de Mongoose se deben combinar sobre el campo `age`?

- [ ] a) `$eq` y `$ne`
- [ ] b) `$in` y `$nin`
- [ ] c) `$gte` y `$lte`
- [ ] d) `$exists` y `$type`
