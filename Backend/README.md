# Correr el servidor
Para correr el servidor se tiene correr node dist/ o nodemon/dist

# Generar el JS
Correr el comando npm install -g typescript para instalar typescript
Por cada cambio se tiene que generer el js desde el ts, porque se corre el comando tsc antes de correr el node dist/
Otra solucion es en una terminal correr tsc -w y en otra nodemon dist/     De esta manera se generara el js y se correra automaticamente
