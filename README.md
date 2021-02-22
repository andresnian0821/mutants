# MERCADOLIBRE X-MAN PROJECT

El proyecto se ha realizado teniendo en cuenta el documento de requerimientos enviado por correo electronico.

## Prerequisitos

Necesitas tener instaldo en el computador

[![node](https://img.shields.io/badge/node-v12.X-yellow.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-v6.13.X-red.svg)](https://www.npmjs.com/)
[![typescript](https://img.shields.io/npm/types/typescript)](https://www.typescriptlang.org/)
[![terraform](https://img.shields.io/badge/terraform%20-%235835CC.svg?&style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io)

## Ejecucion

* Busqueda de mutantes:
  Method: POST
  URL: https://bw5e1gfayg.execute-api.us-east-2.amazonaws.com/dev/mutant
  Request:
    {
      "dna": Array<string>
    }
 
* Estadisticas de ejecución:
  Method: GET
  URL: https://bw5e1gfayg.execute-api.us-east-2.amazonaws.com/dev/stats
  

## Cobertura
Para garantizar la covertura de pruebas unitarias se uso SonarQube.
Para ver la covertura de cada lambda se debe ejecutar los siguientes scripts
```shell script
npm run test
npm run coverage
sonar-scanner
```
