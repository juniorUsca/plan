# Planillas

A [Sails](http://sailsjs.org) application.

## Configuracion


  - Clonar de Github

```
git clone git@github.com:juniorUsca/plan.git
cd plan
```

  - Instalar modulos de node

```
npm install
```

  - Instalar componentes de Bower

```
bower install
```

  - Probar el servidor

```
sails lift
```
## Errores

Si aparece este error al momento de actualizar algun registro
```
/gaion/planillas/node_modules/sails-mongo/node_modules/mongodb/lib/mongodb/connection/base.js:246
        throw message;      
              ^
TypeError: Property 'toJSON' of object [object Object] is not a function
    at updated (/usr/local/lib/node_modules/sails/lib/hooks/blueprints/actions/update.js:72:36)
```
No supe como manejarlo, tiene algo q ver con q toJSON esta en null y alli lo toma como una funcion, mi solucion fue editar el archivo:
```
sudo gedit /usr/local/lib/node_modules/sails/lib/hooks/blueprints/actions/update.js
```
Ubicarse en la linea 72 y borrar los parentesis para q ya no sea una funcion y ahora sea solo un valor
De:
  previous: matchingRecord.toJSON()
A:
  previous: matchingRecord.toJSON