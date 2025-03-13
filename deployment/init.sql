CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    target_price FLOAT NOT NULL,
    user_id INTEGER NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    is_notification_sent BOOLEAN DEFAULT FALSE,
    condition VARCHAR(1) CHECK (condition IN ('<', '>')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);