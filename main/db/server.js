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

db.connect(function(error){
    if(error) throw error;
    console.log(`Now connected to the employee database.`);
    runProgram();
})

function viewDepartments(){
    const results = db.query("SELECT * FROM departments")
    console.log(results);
    returnToMain();
}

function viewRoles(){
    const results = db.query('SELECT * FROM roles')
    showtable(results);
    returnToMain();
}

function viewEmployees(){
    const results = db.query('SELECT * FROM employees')
    showtable(results);
    returnToMain();
}

const viewAllDepts = 'View All Departments'
const viewAllRoles = 'View all roles'
const viewAllEmplys = 'View all employees'
const addRole = 'Add a role'
const addEmployee = 'Add an employee'
const updateRole = 'Update an employee role'
const exit = 'exit'
const quit = console.log(`Be sure to ^C to quit the application.`)

function returnToMain() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: "return",
        message: "",
        choices: ["Return to Main Menu", exit]
        }
    ])
    .then(answers => {
        if (answers.return === "Return to Main Menu") {
            runProgram();
        } else {
            quit;
    }})
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
                console.log(`User wants to ${viewAllRoles}`)
            } else if (answers.main === viewAllEmplys) {
                console.log(`User wants to ${viewAllEmplys}`)
            } else if (answers.main === addRole) {
                console.log(`User wants to ${addRole}`)
            } else if (answers.main === addEmployee) {
                console.log(`User wants to ${addEmployee}`)
            } else if (answers.main === updateRole) {
                console.log(`User wants to ${updateRole}`)
            } else {
                exit
            }

            })
}



// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
