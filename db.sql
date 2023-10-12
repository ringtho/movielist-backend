CREATE TABLE MyTable (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UID VARCHAR(30) UNIQUE,
    Name VARCHAR(255)
);

INSERT INTO MyTable (UID, Name) VALUES (TO_BASE64(UNHEX(REPLACE(UUID(), '-',''))), 'John Smith');


  (1, "The Shawshank Redemption", "Drama", "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", '1994-09-23', 4.8, "A classic film.", NOW(), NOW()),

INSERT INTO Movies (id, title, genre, plot, releaseDate, rating, notes, createdAt, updatedAt)
VALUES
  (2, "The Godfather", "Crime", "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", "1972-03-24", 4.7, "A masterpiece of cinema.", NOW(), NOW()),
  (3, "Pulp Fiction", "Crime", "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", "1994-10-14", 4.6, "Quentin Tarantino at his best.", NOW(), NOW()),
  (4, "The Dark Knight", "Action", "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", "2008-07-18", 4.9, "Heath Ledger's legendary performance.", NOW(), NOW()),
  (5, "Schindler''s List", "Biography", "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution.", '1993-12-15', 4.9, 'A harrowing story of heroism.', NOW(), NOW()),
  (6, "Forrest Gump", "Drama", "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.", '1994-07-06', 4.7, 'Life is like a box of chocolates.', NOW(), NOW()),
  (7, "Fight Club", "Drama", "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into an anarchist organization.", '1999-10-15', 4.6, 'First rule of Fight Club...', NOW(), NOW()),
  (8, "Inception", "Sci-Fi", "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", '2010-07-16', 4.8, 'Mind-bending concept.', NOW(), NOW()),
  (9, "The Matrix", "Sci-Fi", "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.", '1999-03-31', 4.5, 'Red pill or blue pill?', NOW(), NOW()),
  (10, "Gladiator", "Action", "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", '2000-05-05', 4.7, 'Are you not entertained?', NOW(), NOW());