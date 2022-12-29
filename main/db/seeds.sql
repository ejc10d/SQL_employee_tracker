INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Customer Service"),
        ("Finance"),
        ("Human Resources"),
        ("Support Staff"),
        ("Management");

INSERT INTO roles (id, title, deparment_id, salary)
VALUES  (1, "Paper Salesperson", 1, 49500),
        (2, "Head of Accounting", 3, 49500),
        (3, "Accountant", 3, 42500),
        (4, "Customer Service Provider", 2, 41000),
        (5, "Human Resources Employee", 4, 52000),
        (6, "Receptionist", 5, 39000),
        (7, "Temp", 5, 32000),
        (8, "Assistant to the Regional Manager", 1, 49501),
        (9, "Regional Manager", 7, 60000);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Jim", "Halpert", 1, 14),
        (2, "Pam", "Beasley", 6, 14),
        (3, "Dwight", "Schrute", 1, 14),
        (4, "Stanley", "Hudson", 1, 14),
        (5, "Phyllis", "Vance", 1, 14),
        (6, "Angela", "Martin", 2, 14),
        (7, "Oscar", "Martinez", 3, 6),
        (8, "Kevin", "Malone", 1, 6),
        (9, "Creed", "Bratton", 2, 14),
        (10, "Meredeth", "Palmer", 2, 14),
        (11, "Kelly", "Kapur", 2, 14),
        (12, "Ryan", "Howard", 7, 14),
        (13, "Toby", "Flenderson", 1, null),
        (14, "Michael", "Scott", 9, null);
