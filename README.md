# Frontend

## PASO 1: Construir la aplicación localmente (Windows)

# Instalar dependencias
npm install

# Construir para producción
npm run build

# Verificar que se generó el dist
# Debe aparecer: dist/canciones_frontend/browser/ con index.html
dir dist\canciones_frontend\browser\

## PASO 2: Subir archivos a la VM

# Comprimir dist para subir
tar -czf dist.tar.gz -C dist/canciones_frontend/browser .

# Subir a GCP (reemplaza NOMBRE-VM y ZONA)
gcloud compute scp dist.tar.gz deverlabschile@NOMBRE-VM:/tmp/ --zone=ZONA

## PASO 3: Configurar VM (ejecutar en la VM)

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar nginx
sudo apt install -y nginx

# Verificar instalaciones
node --version
npm --version
nginx -v


sudo nano /etc/nginx/sites-available/angular-app

# Agregar esta configuración:
server {
    listen 80;
    server_name _;
    root /home/deverlabschile/canciones_frontend/dist/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}

# Activar configuración
sudo ln -s /etc/nginx/sites-available/angular-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Verificar y reiniciar nginx
sudo nginx -t
sudo systemctl restart nginx

# Si ves error 403 Forbidden, solucionar permisos:
# Dar permisos de lectura a nginx
sudo chmod -R 755 /home/deverlabschile
sudo chmod -R 644 /home/deverlabschile/canciones_frontend/dist/frontend/*
sudo find /home/deverlabschile/canciones_frontend/dist/frontend -type d -exec chmod 755 {} \;

# Verificar permisos
ls -la /home/deverlabschile/canciones_frontend/dist/frontend

# Reiniciar nginx
sudo systemctl restart nginx

# Ver logs de nginx si persiste el error
sudo tail -f /var/log/nginx/error.log

# SOLUCIÓN para 403 Forbidden - Mover archivos a /var/www:
# Primero verificar qué hay en la carpeta dist
ls -la /home/deverlabschile/canciones_frontend/dist/
ls -la /home/deverlabschile/canciones_frontend/dist/frontend/

# DESCOMPRIMIR archivos subidos desde local
cd /tmp
tar -xzf dist.tar.gz -C /var/www/angular-app/

# O copiar desde el directorio de la VM si hiciste build allí
sudo cp -r /home/deverlabschile/canciones_frontend/dist/frontend/browser/* /var/www/angular-app/

sudo chown -R www-data:www-data /var/www/angular-app
sudo chmod -R 755 /var/www/angular-app

# Actualizar configuración de nginx
sudo nano /etc/nginx/sites-available/angular-app
# Cambiar: root /home/deverlabschile/canciones_frontend/dist/frontend;
# Por:     root /var/www/angular-app;

# Reiniciar nginx
sudo nginx -t
sudo systemctl restart nginx

# Verificar que los archivos están en /var/www/angular-app
ls -la /var/www/angular-app

# DIAGNÓSTICO si persiste 403:
# 1. Verificar que index.html existe
ls -la /var/www/angular-app/index.html

# 2. Ver configuración activa de nginx
sudo nginx -T | grep -A 10 "server {"

# 3. Ver logs de error de nginx
sudo tail -20 /var/log/nginx/error.log

# 4. Verificar contenido del directorio
ls -laR /var/www/angular-app

# 5. Configuración correcta debe ser:
sudo nano /etc/nginx/sites-available/angular-app
# Contenido completo:
server {
    listen 80;
    server_name _;
    root /var/www/angular-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}

# 6. Asegurar permisos correctos
sudo chown -R www-data:www-data /var/www/angular-app
sudo chmod -R 755 /var/www/angular-app
sudo find /var/www/angular-app -type f -exec chmod 644 {} \;

# 7. Reiniciar nginx
sudo systemctl restart nginx
sudo systemctl status nginx

```bash
ng serve
```
