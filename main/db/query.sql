SELECT * FROM departmets;

SELECT * FROM roles;

SELECT * FROM employees;

SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department_name, roles.salary as salaries, employees.manager_id
FROM employees
JOIN role ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;