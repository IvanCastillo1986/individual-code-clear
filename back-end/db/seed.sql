\c code_clear_dev;

INSERT INTO stats ( messageId, message, date, severity, rating ) VALUES
('missingSemi', 'Missing semicolon.', '8/12/2021', 1, 3),
('wrongQuotes', 'Strings must use doublequote.', '8/15/2021', 1, 4),
('wrongIdentation', 'Expected indentation of 2 spaces but found 1.', '9/9/2021', 2, 3),
('trailingSpace', 'Trailing spaces not allowed.','9/20/2021', 1, 2)
;