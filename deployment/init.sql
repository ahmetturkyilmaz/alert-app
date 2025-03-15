CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    target_price FLOAT NOT NULL,
    user_id INTEGER NOT NULL,
    pair VARCHAR(10) NOT NULL,
    is_notification_sent BOOLEAN DEFAULT FALSE,
    trigger_condition INTEGER CHECK (trigger_condition IN (1, 2, 3, 4, 5)) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);