show tables;
SELECT * FROM Profile;
DESC Profile;

ALTER TABLE Profile ADD COLUMN skills VARCHAR(255);
ALTER TABLE Profile ADD COLUMN technicalSkills VARCHAR(255);
DROP TABLE Profile;


