# Use JDK 21 for building the app
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy the project files
COPY . .

# Give execute permission to mvnw
RUN chmod +x mvnw

# Build the project without running tests
RUN ./mvnw clean package -DskipTests

# Use a lightweight image to run the app
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
