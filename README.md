# Inventory Movement Dashboard

A full-stack web application for tracking, visualizing, and managing inventory movements across different warehouse locations. This dashboard provides real-time insights into stock levels, recent transactions, and overall inventory health through intuitive charts and data grids.

## 🚀 Tech Stack

### Backend
* **Java 17**
* **Spring Boot 3.2.0** (Web)
* **Lombok** (Boilerplate reduction)
* **Jackson** (JSON processing & JSR310 Date/Time)

### Frontend
* **React 18**
* **Recharts** (Data visualization & charts)
* **Axios** (HTTP client for API integration)
* **Date-fns** (Date manipulation and formatting)
* **CSS3** (Custom responsive styling)

## 📁 Project Structure

```
inventory-dashboard/
├── backend/                # Spring Boot REST API
│   ├── src/main/java/      # Java source code
│   └── pom.xml             # Maven dependencies
└── frontend/               # React User Interface
    ├── public/             # Static assets
    ├── src/                # React components & services
    └── package.json        # NPM dependencies
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Java Development Kit (JDK) 17](https://jdk.java.net/17/)
* [Apache Maven](https://maven.apache.org/download.cgi) (or use the provided wrapper)
* [Node.js](https://nodejs.org/) (v16 or higher)
* [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 🏃‍♂️ Getting Started

### 1. Running the Backend

Navigate to the backend directory and start the Spring Boot application:

```bash
cd backend
mvn spring-boot:run
```
The backend server will typically start on `http://localhost:8080`.

### 2. Running the Frontend

Open a new terminal window, navigate to the frontend directory, install dependencies, and start the React app:

```bash
cd frontend
npm install
npm start
```
The frontend development server will start and typically be available at `http://localhost:3000`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
