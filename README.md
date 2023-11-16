### Prueba Tecnica

Para correr la api, se deben seguir los siguientes pasos:
1. Clonar el repositorio
2. Instalar las dependencias con el comando `npm install`
3. Crear un archivo .env con las variables de entorno que se encuentran en el archivo .env.example
4. De tener instalado docker, correr el comando `docker-compose up` para levantar la base de datos de lo contrario conectar la base de datos de forma local 
> Para esta prueba, se debe contar con informacion en la base de datos en las colecciones Applications y Authorizations)
5. Correr el comando `npm run dev` para levantar el servidor en modo desarrollo
6. Si se cuenta con la extencion REST Client de VSCode, se puede utilizar el archivo `logs.endpoints.http` que se encuentra en la carpeta `/endpoints` para probar los endpoints de la api