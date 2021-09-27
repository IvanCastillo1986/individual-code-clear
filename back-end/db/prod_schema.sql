DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
  id SERIAL PRIMARY KEY, 
  uid TEXT,
  email VARCHAR(100) UNIQUE,
  messageId TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT,
  severity INT,
  rating INT
);
