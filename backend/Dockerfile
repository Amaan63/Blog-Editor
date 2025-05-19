# Use JDK 21 for building the app
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy only backend folder contents into /app/backend
COPY backend ./backend

# Give execute permission to mvnw inside backend folder
RUN chmod +x backend/mvnw

# Change working directory to backend and build without tests, with debug logs enabled
WORKDIR /app/backend
RUN ./mvnw clean package -DskipTests -X

# Use a lightweight image to run the app
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the jar built in the build stage to /app
COPY --from=build /app/backend/target/*.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
