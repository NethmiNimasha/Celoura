# Celoura Haute Couture – Spring Boot REST API Backend

Spring Boot 3 REST API backend for **Celoura Fashion**, managing custom fashion designs (frocks, saree blouses, designer skirts, couture tops, and bridal lehengas), client authentication, custom measurement orders, and fitting appointments.

---

## 🛠️ Tech Stack
- **Framework:** Spring Boot 3.2.5 (Java 17)
- **Data Persistence:** Spring Data JPA / Hibernate
- **Database:** PostgreSQL 16
- **Security:** Spring Security (BCrypt password encoding, stateless REST architecture, CORS enabled)
- **Containerization:** Docker & Docker Compose

---

## 📂 Project Architecture

```
backend/
├── pom.xml
├── Dockerfile
├── README.md
└── src/
    └── main/
        ├── java/com/celoura/
        │   ├── CelouraBackendApplication.java    # Spring Boot entry point
        │   ├── config/
        │   │   ├── CorsConfig.java               # Global CORS setup for frontend (Next.js)
        │   │   └── SecurityConfig.java           # Spring Security & BCrypt encoder
        │   ├── controller/
        │   │   ├── AuthController.java           # Signup, Signin & authentication
        │   │   ├── DesignController.java         # Haute couture designs catalogue
        │   │   ├── OrderController.java          # Custom dress & blouse orders
        │   │   ├── AppointmentController.java    # Boutique fitting consultations
        │   │   └── InfoController.java           # Official business details & hotline
        │   ├── dto/
        │   │   ├── AuthRequest.java
        │   │   ├── AuthResponse.java
        │   │   ├── RegisterRequest.java
        │   │   └── StatusUpdateRequest.java
        │   ├── model/
        │   │   ├── User.java                     # Client & Admin user accounts
        │   │   ├── Design.java                   # Catalogue models across 5 categories
        │   │   ├── Order.java                    # Custom orders with artisan assignment
        │   │   ├── Measurement.java              # Tailoring measurements embeddable
        │   │   └── Appointment.java              # In-person fitting bookings
        │   ├── repository/
        │   │   ├── UserRepository.java
        │   │   ├── DesignRepository.java
        │   │   ├── OrderRepository.java
        │   │   └── AppointmentRepository.java
        │   └── service/
        │       ├── UserService.java
        │       ├── DesignService.java
        │       ├── OrderService.java
        │       ├── AppointmentService.java
        │       └── DataInitializer.java          # Seeds demo users, orders & designs
        └── resources/
            └── application.yml                   # Database & application properties
```

---

## 🌐 API Endpoints

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` (or `/signup`) | Create a new client account |
| `POST` | `/api/auth/login` (or `/signin`) | Sign in with email and password |

### 2. Haute Couture Designs (`/api/designs`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/designs` | Retrieve all bespoke catalogue designs |
| `GET` | `/api/designs/{id}` | Retrieve design by code (e.g. `CEL-DSG-07`) |
| `GET` | `/api/designs/category/{category}` | Filter by category (`Frocks & Gowns`, `Saree Blouses`, `Designer Skirts`, etc.) |
| `GET` | `/api/designs/featured` | Retrieve signature highlighted designs |
| `POST` | `/api/designs` | Add a new design (Admin) |
| `DELETE` | `/api/designs/{id}` | Remove a design (Admin) |

### 3. Custom Orders (`/api/orders`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Retrieve all custom orders (supports `?email=` & `?phone=`) |
| `GET` | `/api/orders/{id}` | Track order by ID (e.g. `CEL-8291`) |
| `POST` | `/api/orders` | Submit a custom dress or blouse order |
| `PATCH` | `/api/orders/{id}/status` | Update progress status (`Pending`, `In Progress`, `Ready`, `Completed`) |

### 4. Boutique Appointments (`/api/appointments`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/appointments` | Retrieve booked fitting sessions |
| `POST` | `/api/appointments` | Schedule a private measurement session |

### 5. Business Information (`/api/info`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/info` | Returns verified address, phone, email & WhatsApp link |

---

## 🚀 Running the Application

### Option A: Via Docker Compose (Recommended)
Add the `backend` service to `docker-compose.yml` and run:
```bash
docker compose up --build -d backend
```

### Option B: Running Locally with Maven
Ensure PostgreSQL is running on port 5432, then run:
```bash
cd backend
mvn clean spring-boot:run
```
The REST API will be accessible at: `http://localhost:8080/api/`

---

## 🔑 Pre-seeded Accounts
- **Admin Account:** `admin@celourafashion.com` / `admin123`
- **Client Account:** `nethunanayakkara315@gmail.com` / `password123`
- **Demo Client:** `ayesha.j@example.com` / `password123`
