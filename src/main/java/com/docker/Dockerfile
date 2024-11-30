# Usa una imagen de Java como base
FROM openjdk:17-jdk-slim

# Copia el archivo JAR de la aplicación al contenedor
COPY target/my-app.jar /app/my-app.jar

# Establece el directorio de trabajo
WORKDIR /app

# Expone el puerto en el que la aplicación backend se ejecuta
EXPOSE 8080

# Comando para ejecutar la aplicación Java
ENTRYPOINT ["java", "-jar", "my-app.jar"]
