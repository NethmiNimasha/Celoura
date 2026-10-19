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
    event_date DATE,
    order_date DATE DEFAULT CURRENT_DATE,
    estimated_completion DATE,
    notes VARCHAR(2000),
    assigned_artisan VARCHAR(255) DEFAULT 'Celoura Akuressa Atelier',
    
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

-- 4. APPOINTMENTS TABLE (In-Person Atelier Consultations)
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

-- B. SEED DESIGNS (Frocks, Saree Blouses, Skirts, Couture Blouses, Bridal Lehengas)
INSERT INTO public.designs (id, title, category, price, price_formatted, image, fabric, color, embroidery, silhouette, description, featured, customizable)
VALUES
(
    'CEL-DSG-07',
    'Aurelia Gold Velvet Evening Frock',
    'Frocks & Gowns',
    28000.00,
    'LKR 28,000',
    '/images/frock-evening.jpg',
    'Italian Micro-Velvet & Zari',
    'Obsidian Black & 24K Gold',
    'Handcrafted Zari Florals & Gilded Belt Detailing',
    'A-Line Flared Frock with Gilded Belt',
    'A show-stopping tailored evening frock crafted with an A-line flounce skirt, hand-embroidered golden waistline belt, and intricate sleeve cuffs.',
    true,
    true
),
(
    'CEL-DSG-08',
    'Royal Aari Bridal Saree Blouse',
    'Saree Blouses',
    16500.00,
    'LKR 16,500',
    '/images/saree-blouse.jpg',
    'Pure Raw Silk & Black Velvet',
    'Deep Black Velvet & Antique Gold',
    'Dense Aari Maggam Handwork, Paisley Sleeve & Scalloped Neck',
    'Structured Sweetheart Saree Blouse with Dori',
    'Handcrafted bridal saree blouse featuring heirloom aari and zardozi threadwork, structured sweetheart bustline, and custom dori tie-backs with latkan tassels.',
    true,
    true
),
(
    'CEL-DSG-10',
    'Noor Obsidian Flared Designer Skirt',
    'Designer Skirts',
    18500.00,
    'LKR 18,500',
    '/images/skirt-flare.jpg',
    'Heavy Silk & Banarasi Brocade Border',
    'Midnight Obsidian & Gold',
    'Wide Antique Bullion Zari Border',
    'Circular Flared Skirt (5-Meter Gher)',
    'High-waisted flared maxi skirt with a 5-meter circle sweep and built-in can-can volume. Perfect for pairing with ethnic crop tops or contemporary blouses.',
    true,
    true
),
(
    'CEL-DSG-12',
    'Valerie Corset Peplum Couture Blouse',
    'Couture Blouses',
    14000.00,
    'LKR 14,000',
    '/images/blouse-designer.jpg',
    'Structured Duchess Satin & Sheer Organza',
    'Obsidian Black & Champagne Gold',
    'Crystal Beaded Boning & Scalloped Sweetheart',
    'Boned Corset Bodice with Peplum Flare',
    'Bespoke boned corset blouse top with sheer puff sleeves and hand-embroidered gold filigree across the bustier.',
    true,
    true
),
(
    'CEL-DSG-01',
    'The Royal Empress Bridal Lehenga',
    'Bridal Lehengas',
    185000.00,
    'LKR 185,000',
    '/images/royal-bloom.jpg',
    'Raw Silk & Zari Mesh',
    'Obsidian Black & Imperial Gold',
    'Handcrafted Antique Gold Zardozi & Dabka',
    'Circular Flared (6-Meter Gher)',
    'An awe-inspiring masterpiece crafted for the modern royal bride. Features multi-layered circular flare with hand-embellished peacock and floral motifs in 24K antique bullion thread.',
    true,
    true
)
ON CONFLICT (id) DO NOTHING;

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
