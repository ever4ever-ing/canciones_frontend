# Innicio

sudo apt install -y git

# Descargar e instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install -g npm@11.6.2

sudo npm install -g pm2
sudo apt install -y nginx


git clone https://github.com/ever4ever-ing/canciones_frontend.git

cd canciones_frontend
npm install
npm run build

# Verificar que se creó la carpeta dist
ls -la dist/frontend/server/

node dist/frontend/server/server.mjs


sudo nano /etc/nginx/sites-available/angular-app

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/angular-app /etc/nginx/sites-enabled/

# Eliminar configuración por defecto
sudo rm /etc/nginx/sites-enabled/default

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar que está corriendo
sudo systemctl status nginx


pm2 start dist/frontend/server/server.mjs --name "angular-app"


# Ver logs de la aplicación

pm2 logs angular-app

# Reiniciar la aplicación
pm2 restart angular-app

# Ver estado
pm2 status

# Al hacer cambio:

# 3. Obtener cambios
git pull

# 4. Recompilar
npm run build

# 5. Reiniciar PM2
pm2 restart angular-app

# 6. Ver logs para verificar
pm2 logs angular-app --lines 20