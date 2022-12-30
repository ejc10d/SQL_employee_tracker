const mysql = require('mysql2');
const inquirer = require('inquirer');
const showtable = require('console.table');



// const PORT = process.env.PORT || 3001;
// const app = expres();


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    });

db.connect(function (error) {
    if (error) throw error;
    console.log(`Now connected to the employee database.`);
    runProgram();
})

function viewDepartments() {
    const sql = "SELECT * FROM departments";
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        returnToMain();
    });
}

function viewRoles() {
    const sql = "SELECT * FROM roles";
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        returnToMain();
    });
}

function viewEmployees() {
    const sql = "SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary AS salary, employees.manager_id AS manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;"
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        returnToMain();
    });
}

const addNewDept = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newDept',
                    message: 'What new department would you like to add?',
                }
            ])
            .then((answers) => {
                db.query('INSERT INTO departments SET ?',
                    {
                        name: answers.newDept,
                    },
                    function (err) {
                        if (err) throw err;
                    });
                console.log('Added new department!')
                viewDepartments();
            });
    };

const addNewRole = () => {
    db.query('SELECT * FROM departments', (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What new role would you like to add?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of this new role?'
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'What is the department of this new role?',
                    choices: departments,
                },
            ])
            .then((answers) => {
                db.query('INSERT INTO roles SET ?',
                    {
                        title: answers.newRole,
                        salary: answers.salary,
                        department_id: answers.departmentId,
                    },
                    function (err) {
                        if (err) throw err;
                    });
                console.log('Added new role!')
                viewRoles();
            });
    });
};

const addNewEmployee = () => {
    db.query('SELECT * FROM roles', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the new employee?',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the new employee?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of this new employee?',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Please select a manager ID for this new employee.',
                    choices: [6, 14, 'null']
                }
            ])
            .then((answers) => {
                db.query('INSERT INTO employees SET ?',
                    {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: answers.role,
                        manager_id: answers.managerId
                    },
                    function (err) {
                        if (err) throw err;
                    });
                console.log('Added new employee!')
                viewEmployees();
            });
    });
};

const updateRoleInDb = () => {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
        });
        db.query('SELECT * FROM roles', (err, roles) => {
            if (err) console.log(err);
            roles = roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            });
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'selectEmployee',
                        message: 'Which employee would you like to update?',
                        choices: employees,
                    },
                    {
                        type: 'list',
                        name: 'selectNewRole',
                        message: 'What new role should this employee have?',
                        choices: roles,
                    },
                ])
                .then((answers) => {
                    db.query('UPDATE employees SET ? WHERE ?',
                        [
                            {
                                role_id: answers.selectNewRole,
                            },
                            {
                                id: answers.selectEmployee,
                            },
                        ],
                        function (err) {
                            if (err) throw err;
                        });
                    console.log('Employee role updated');
                    viewEmployees();
                });
        });
    });
};


const viewAllDepts = 'View All Departments'
const viewAllRoles = 'View all roles'
const viewAllEmplys = 'View all employees'
const addDept = 'Add a department'
const addRole = 'Add a role'
const addEmployee = 'Add an employee'
const updateRole = 'Update an employee role'
const exit = 'Exit'

function returnToMain() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: "return",
                message: "---------------------------",
                choices: ["Return to Main Menu", exit]
            }
        ])
        .then(answers => {
            if (answers.return === "Return to Main Menu") {
                runProgram();
            } else {
                exit;
            }
        })
}



function runProgram() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main',
                message: 'What would you like to do?',
                choices: [viewAllDepts,
                    viewAllRoles,
                    viewAllEmplys,
                    addDept,
                    addRole,
                    addEmployee,
                    updateRole,
                    exit]
            }
        ])
        .then(answers => {
            if (answers.main === viewAllDepts) {
                viewDepartments()
            } else if (answers.main === viewAllRoles) {
                viewRoles()
            } else if (answers.main === viewAllEmplys) {
                viewEmployees()
            } else if (answers.main === addDept) {
                addNewDept()
            } else if (answers.main === addRole) {
                addNewRole()
            } else if (answers.main === addEmployee) {
                addNewEmployee()
            } else if (answers.main === updateRole) {
                updateRoleInDb()
            } else {
                console.log(`You have selected exit.`)
                db.end();
            }

        })
}


