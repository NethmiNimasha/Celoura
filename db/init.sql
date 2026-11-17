-- ==============================================================================
-- Celoura Haute Couture Platform - PostgreSQL Database Initialization Script
-- Database: postgres (or celoura)
-- Address: No. 129, Yakabedda, Matara road, Akuressa, Sri Lanka
-- Hotline: 0771699754 (+94 77 169 9754)
-- Email: nethunanayakkara315@gmail.com
-- ==============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- ROLE_ADMIN, ROLE_CUSTOMER
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DESIGNS TABLE (5 Core Garment Categories)
CREATE TABLE IF NOT EXISTS public.designs (
    id VARCHAR(255) PRIMARY KEY, -- e.g. CEL-DSG-01
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL, -- Frocks & Gowns, Saree Blouses, Designer Skirts, Couture Blouses, Bridal Lehengas
    price NUMERIC(38, 2) NOT NULL,
    price_formatted VARCHAR(255),
    image TEXT NOT NULL,
    fabric VARCHAR(255),
    color VARCHAR(255),
    embroidery VARCHAR(1000),
    silhouette VARCHAR(255),
    description VARCHAR(2000),
    featured BOOLEAN DEFAULT false,
    customizable BOOLEAN DEFAULT true
);

-- 3. ORDERS TABLE (With Custom Measurements)
CREATE TABLE IF NOT EXISTS public.orders (
    id VARCHAR(255) PRIMARY KEY, -- e.g. CEL-8291
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    design_id VARCHAR(255),
    design_title VARCHAR(255),
    garment_category VARCHAR(255),
    colour VARCHAR(255),
    fabric VARCHAR(255),
    silhouette VARCHAR(255),
    neckline VARCHAR(255),
    sleeve VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, In Progress, Ready, Completed, Cancelled
    total_amount NUMERIC(38, 2),
    deposit_paid NUMERIC(38, 2) DEFAULT 0.00,
    payment_status VARCHAR(50) DEFAULT 'Unpaid', -- Unpaid, Deposit Paid, Fully Paid
    event_date DATE,
    order_date DATE DEFAULT CURRENT_DATE,
    estimated_completion DATE,
    notes VARCHAR(2000),
    assigned_artisan VARCHAR(255) DEFAULT 'Celoura Akuressa Atelier',
    design_image TEXT,
    custom_reference_image TEXT,
    is_custom_design BOOLEAN DEFAULT false,
    custom_design_notes VARCHAR(2000),
    
    -- Tailoring Measurement Fields
    bust VARCHAR(50),
    waist VARCHAR(50),
    hip VARCHAR(50),
    shoulder VARCHAR(50),
    armhole VARCHAR(50),
    sleeve_length VARCHAR(50),
    blouse_length VARCHAR(50),
    lehenga_waist VARCHAR(50),
    lehenga_length VARCHAR(50),
    unit VARCHAR(20) DEFAULT 'inches'
);

-- 4. PAYMENTS TABLE (PayHere Gateway Transactions)
CREATE TABLE IF NOT EXISTS public.payments (
    id BIGSERIAL PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    amount NUMERIC(38, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'LKR',
    payment_type VARCHAR(30) NOT NULL, -- DEPOSIT, BALANCE, FULL
    payment_method VARCHAR(50), -- VISA, MASTER, FRIMI, GENIE, etc.
    payhere_payment_id VARCHAR(255),
    payhere_status_code INTEGER,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED, CANCELLED
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    raw_ipn_payload TEXT
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_payhere_id ON public.payments(payhere_payment_id);

-- 5. APPOINTMENTS TABLE (In-Person Atelier Consultations)
CREATE TABLE IF NOT EXISTS public.appointments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    visit_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    service_interest VARCHAR(255),
    notes VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Confirmed, Completed, Cancelled
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. REVIEWS & RATINGS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    design_id VARCHAR(255),
    design_title VARCHAR(255),
    rating INTEGER NOT NULL DEFAULT 5,
    review_title VARCHAR(255),
    comment VARCHAR(2000) NOT NULL,
    garment_category VARCHAR(255),
    location VARCHAR(255) DEFAULT 'Sri Lanka',
    verified_purchase BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- SEED DATA INSERTION
-- ==============================================================================

-- A. SEED USERS (Passwords encoded with BCrypt)
-- Passwords:
-- admin@celourafashion.com -> admin123
-- ayesha.j@example.com     -> password123
-- nethunanayakkara315@gmail.com -> password123
INSERT INTO public.users (name, email, phone, password, role, created_at)
VALUES 
('Celoura Admin', 'admin@celourafashion.com', '0771699754', '$2a$10$P0QQFRZS7on9E.vSV3EUoeqHZ30MJYWU7U1qD5ZEHXhZJhg7pdj8W', 'ROLE_ADMIN', CURRENT_TIMESTAMP),
('Ayesha Jayawardena', 'ayyesha.j@example.com', '0771234567', '$2a$10$0xtSgSnsXlyeuNA4LTYXhek1wumME3jthM8Wb1/jjPxmXph2K7J6q', 'ROLE_CUSTOMER', CURRENT_TIMESTAMP),
('Nethmi Nimasha', 'nethunanayakkara315@gmail.com', '0771699754', '$2a$10$9D8pJ8bZhCwx/UYcgQLig.wcFInYinG5/ICHgDOu5Mb7w5Nk144Ki', 'ROLE_CUSTOMER', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- B. DESIGNS (Created dynamically via Admin Panel)
-- No static seed designs inserted


-- C. SEED SAMPLE ORDERS
INSERT INTO public.orders (
    id, customer_name, customer_phone, customer_email,
    design_id, design_title, garment_category, colour, fabric,
    silhouette, neckline, sleeve, status, total_amount, deposit_paid,
    event_date, order_date, estimated_completion, notes, assigned_artisan,
    bust, waist, hip, shoulder, armhole, sleeve_length, blouse_length, lehenga_waist, lehenga_length, unit
)
VALUES (
    'CEL-8291',
    'Nethmi Nimasha',
    '0771699754',
    'nethunanayakkara315@gmail.com',
    'CEL-DSG-07',
    'Aurelia Gold Velvet Evening Frock',
    'Frocks & Gowns',
    'Obsidian Black & 24K Gold',
    'Italian Micro-Velvet & Zari',
    'A-Line Flared Frock',
    'Sweetheart Neck',
    'Full Embellished Sleeve',
    'In Progress',
    28000.00,
    15000.00,
    CURRENT_DATE + INTERVAL '20 days',
    CURRENT_DATE - INTERVAL '5 days',
    CURRENT_DATE + INTERVAL '15 days',
    'Tailored fitting at Akuressa boutique.',
    'Master Tailor Sugath (Akuressa Workshop)',
    '34', '26', '36', '14', '15', '22', '14.5', '28', '41', 'inches'
)
ON CONFLICT (id) DO NOTHING;
