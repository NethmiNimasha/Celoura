# Celoura Fashion – Database Documentation

PostgreSQL database schemas, migrations, and initialization scripts for the Celoura Haute Couture custom dress ordering platform.

---

## 📌 Connection Credentials

| Property | Value |
|---|---|
| **Database Engine** | PostgreSQL 16 |
| **Host (Local)** | `localhost:5432` |
| **Host (Docker)** | `db:5432` |
| **Database Name** | `postgres` |
| **User** | `postgres` |
| **Password** | `Nethu2002` |
| **PgAdmin URL** | `http://localhost:5050` (Email: `admin@example.com` / Pass: `admin`) |

---

## 📁 Database Files

- **[`db/init.sql`](./init.sql)**: Clean, self-contained SQL script with complete DDL (`CREATE TABLE IF NOT EXISTS`) and DML (`INSERT INTO`) seed data for fresh setups. Automatically executed by Docker on container initialization via `/docker-entrypoint-initdb.d/init.sql`.
- **[`db/celoura_dump.sql`](./celoura_dump.sql)**: Full native PostgreSQL `pg_dump` backup of all tables, sequences, constraints, and rows.

---

## 🗄️ Database Tables Overview

### 1. `users`
Stores user accounts for authentication and access control.
- `id` (BIGSERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR UNIQUE)
- `phone` (VARCHAR)
- `password` (VARCHAR, BCrypt hashed)
- `role` (`ROLE_CUSTOMER` or `ROLE_ADMIN`)
- `created_at` (TIMESTAMP)

### 2. `designs`
Catalogue items spanning all 5 custom garment categories:
- `id` (VARCHAR PRIMARY KEY, e.g. `CEL-DSG-07`)
- `title` (VARCHAR)
- `category` (`Frocks & Gowns`, `Saree Blouses`, `Designer Skirts`, `Couture Blouses`, `Bridal Lehengas`)
- `price` (NUMERIC)
- `price_formatted` (VARCHAR, e.g. `LKR 28,000`)
- `image` (VARCHAR)
- `fabric` (VARCHAR)
- `color` (VARCHAR)
- `embroidery` (VARCHAR)
- `silhouette` (VARCHAR)
- `description` (VARCHAR)
- `featured` (BOOLEAN)
- `customizable` (BOOLEAN)

### 3. `orders`
Bespoke customer garment orders with individual measurements and artisan assignments:
- `id` (VARCHAR PRIMARY KEY, e.g. `CEL-8291`)
- `customer_name`, `customer_phone`, `customer_email`
- `design_id`, `design_title`, `garment_category`, `colour`, `fabric`, `silhouette`, `neckline`, `sleeve`
- `status` (`Pending`, `Confirmed`, `In Progress`, `Ready`, `Completed`, `Cancelled`)
- `total_amount`, `deposit_paid`
- `event_date`, `order_date`, `estimated_completion`
- `notes` (VARCHAR)
- `assigned_artisan` (e.g. `Master Tailor Sugath (Akuressa Workshop)`)
- Measurement fields: `bust`, `waist`, `hip`, `shoulder`, `armhole`, `sleeve_length`, `blouse_length`, `lehenga_waist`, `lehenga_length`, `unit`

### 4. `appointments`
In-person fitting appointments at the Akuressa atelier:
- `id` (BIGSERIAL PRIMARY KEY)
- `name`, `phone`, `email`
- `visit_date`, `time_slot`, `service_interest`, `notes`
- `status` (`Pending`, `Confirmed`, `Completed`, `Cancelled`)
- `created_at` (TIMESTAMP)

---

## 🔄 How to Restore or Run Manually

### Using `psql` (CLI):
```bash
psql -h localhost -U postgres -d postgres -f db/init.sql
```

### Using Docker:
The `docker-compose.yml` mounts `./db/init.sql` directly to `/docker-entrypoint-initdb.d/init.sql:ro`.
