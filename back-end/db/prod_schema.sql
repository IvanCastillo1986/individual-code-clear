DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
  id SERIAL PRIMARY KEY, 
  uid TEXT,
  email VARCHAR(100) UNIQUE,
  message_id TEXT,
  message TEXT,
  source_code TEXT,
  date TEXT DEFAULT CURRENT_DATE,
  week TEXT DEFAULT TO_CHAR(CURRENT_DATE, 'WW'),
  time TEXT DEFAULT CURRENT_TIME,
  severity INT
);
