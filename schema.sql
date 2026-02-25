-- Habilitar extensión geográfica
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabla de distritos/barrios
CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    avg_price_m2 DECIMAL(10,2),
    risk_score INTEGER CHECK (risk_score BETWEEN 0 AND 10),
    geometry GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de propiedades detectadas
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE NOT NULL,
    district_id INTEGER REFERENCES districts(id),
    address TEXT,
    location GEOMETRY(Point, 4326),
    price DECIMAL(12,2),
    description TEXT,
    source_url TEXT,
    lexicon_matches JSONB,
    risk_score INTEGER CHECK (risk_score BETWEEN 0 AND 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios/clientes
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de informes generados
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    district_id INTEGER REFERENCES districts(id),
    questionnaire_data JSONB NOT NULL,
    risk_score INTEGER CHECK (risk_score BETWEEN 0 AND 10),
    pdf_url TEXT,
    stripe_payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar los 6 distritos de Málaga
INSERT INTO districts (name, risk_score) VALUES
('Palma-Palmilla', 10),
('La Trinidad', 9),
('Cruz de Humilladero', 8),
('El Palo', 6),
('Churriana', 5),
('Teatinos', 4);

-- Índices para optimizar consultas
CREATE INDEX idx_properties_district ON properties(district_id);
CREATE INDEX idx_properties_risk_score ON properties(risk_score);
CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_properties_location ON properties USING GIST(location);
