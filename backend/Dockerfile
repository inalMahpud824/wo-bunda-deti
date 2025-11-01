# Gunakan image dasar dengan JDK 17
FROM eclipse-temurin:17-jdk-alpine AS builder

# Set working directory
WORKDIR /app

# Salin file pom.xml dan Maven wrapper terlebih dahulu (agar cache build efisien)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Unduh dependencies agar cache bisa digunakan
RUN ./mvnw dependency:go-offline

# Salin seluruh source code dan build JAR
COPY src src
RUN ./mvnw clean package -DskipTests

# Gunakan image runtime yang lebih kecil
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
# Salin hasil build dari tahap builder
COPY --from=builder /app/target/*.jar app.jar

# Jalankan aplikasi
ENTRYPOINT ["java", "-jar", "app.jar"]
