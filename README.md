# MERCADOLIBRE X-MAN PROJECT

El proyecto se ha realizado teniendo en cuenta el documento de requerimientos enviado por correo electronico.

## Prerequisitos

Necesitas tener instaldo en el computador

[![node](https://img.shields.io/badge/node-v12.X-yellow.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-v6.13.X-red.svg)](https://www.npmjs.com/)
[![typescript](https://img.shields.io/npm/types/typescript)](https://www.typescriptlang.org/)

## Arquitectura utilizada en la aplicación

![AWS-architecture](https://raw.github.com/andresnian0821/mutants/main/Architecture%20mutants%20diagram.png)
  
Esta es una arquitectura event-driven debido a las caracteristicas del proyecto y los requerimientos tanto funcionales como no funcionales descritos en el planteamineto del problema.

Esta arquitectura está implementada bajo esquema serverless de tal manera que el sistema pueda ser autoescalable y con alta disponibilidad al usar el principio de arquitectura como servicio en la nube de AWS.


## Descripción el despliegue

El proyecto contiene la totalidad de la solución en proyectos node diferentes, de tal manera que se pueda hacer un despliegue completo de la misma

Existen un directorio principal llamadado service en el cual se encuentran 3 directorios mas los cuales contienen el desarrollo de los proyectos

* discover-mutants
* get-stadistics-mutants
* save-adn

Dentro de cada una de estas carpetas se encuentran los archivos de configuración necesarios para realizar la transpilación de los proyectos usando los siguientes comandos

* npm i => [El cual instala las dependencias necesarias del proyecto]
* npm run build =>[El cual hace la transpilación de la solución y la comprime en un archivo .zip con el nombre de la lambda. El comprimido quedará ubicado en la carpeta dist del proyecto]

Una vez ejecutados estos comandos y ya se tengan los comprimidos, se puede pasar a desplegar los mismos en las lambdas ya aprobicionadas.

## Pruebas unitarias

Dentro de cada uno de los proyectos se encuentra ubicada una ruta llamada test, la cual contiene las pruebas unitarias realizadas al codigo y que cumplen con el objetivo de cumplimiento del 80%

Para ejecutar dichas pruebas se deben ejecutar los siguientes comandos

* npm i => [El cual instala las dependencias necesarias del proyecto]
* npm run test => [El cual es un script dentro del archivo principal del proyecto (package.json) que ejecutará las pruebas unitarias]
* npm run coverage => [Este comando ademas de ejecutar las pruebas unitarias genera el reporte de pruebas para ser leido por sonarqube]
* sonnar-scaner => [Este es un complemento del sistema el cual toma el reporte generado en el paso anterior y ejecuta sonarube para generar el reporte anexado en la documentación del sistema]

## Documentación 

Ademas de esta información los invito a revisar el documento completo de arquitectura dispuesto en este mismo repositorio en el cual se encuentran las decisiones por las cuales se tomó la decisión de implementar esta solución, diagramas e imagenes ilustrativas del mismo.

https://github.com/andresnian0821/mutants/blob/main/DIAGRAMA%20DE%20ARQUITECTURA%20Y%20DECISIONES%20DE%20DESARROLLO%20PROYECTO%20MUTANTES.docx

👽 Espero sea de su agrado. 👽
