\c code_clear_dev;

INSERT INTO stats ( messageId, message, source_code, severity, rating ) VALUES
('missingSemi', 'Missing semicolon.', 'const yes = 0   ', 1, 3),
('wrongQuotes', 'Strings must use doublequote.', '()=>{}', 1, 4),
('wrongIdentation', 'Expected indentation of 2 spaces but found 1.', 'let rocky = new  dog()', 2, 3),
('trailingSpace', 'Trailing spaces not allowed.','try{}catch{};', 1, 2)
;