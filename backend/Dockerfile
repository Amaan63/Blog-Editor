# Use an official Maven image to build the app
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Use a smaller JDK image to run the app
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the jar from the previous image
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
