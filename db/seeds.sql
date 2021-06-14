INSERT INTO department (name)
VALUES 
('Finance'),
('Accounting'),
('IT'),
('Software');

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', 100, 1),
('Accountant', 90, 2),
('Technician', 60, 3),
('Software Engineer', 120, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Hector', 'Rangel', 4, null),
('Julian', 'Villarreal', 3, null),
('Chris', 'Wolfe', 3, 1);


