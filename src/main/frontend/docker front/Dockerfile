# Usa una imagen de Nginx como base para servir archivos estáticos
FROM nginx:alpine

# Copia los archivos del frontend al directorio de Nginx
COPY ./ /usr/share/nginx/html

# Expone el puerto 80 para acceder al frontend
EXPOSE 80
