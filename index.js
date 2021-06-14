const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./db/connection');

// // start question
function initialize() {
    inquirer.prompt
        ([
            {
                type: "list",
                name: "choices",
                message: "What do you want to do?",
                //Use switch statement
                choices: ["View all Departments", "View all Roles", "View all Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"],
            },
        ]).then((result) => {
            console.log(result.choices);
            switch (result.choices) {
                case "View all Departments":
                    viewAllDepartments();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRoll();
                    break;

                case "Exit":
                    console.log("Goodbye");
                    connection.end();
                    break;
            }
        });
};

// view all departments
function viewAllDepartments() {
    connection.promise()
        .query(`SELECT * FROM department`)
        .then((data) => {
            const [rows] = data;
            console.log("\n");
            console.table('Departments', rows);
            initialize();
        });
}
// view all roles
function viewAllRoles() {
    connection.promise()
        .query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role
        LEFT JOIN department ON (department.id = role.department_id)
        ORDER BY role.id;`)
        .then((data) => {
            const [rows] = data;
            console.log("\n");
            console.table('Roles', rows);
            initialize();
        });
}

// view all employees
function viewAllEmployees() {
    connection.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`
    ).then((data) => {
        const [rows] = data;
        console.table('Employees', rows);
        initialize();
    });
}
// add a department
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "New department name:",
            name: "new_department",
        })
        .then(function (answer) {
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    name: answer.new_department,
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            ),
                console.log("New department added to database.");
            console.log("\n");
            console.table('New department', answer);
            initialize();
        });
}

// add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "New role name:",
                name: "new_role"
            },
            {
                type: "number",
                message: "New role salary:",
                name: "new_salary"
            }
        ])
        .then(answer => {
            const params = [answer.new_role, answer.new_salary];
            const roleQuery = `SELECT name, id FROM department`;
            connection.query(roleQuery, (err, data) => {
                if (err) throw err;
                const depts = data.map(({ name, id }) => ({ name: name, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'new_dept',
                        message: "New role department:",
                        choices: depts
                    }
                ])
                    .then(deptChoice => {
                        const department = deptChoice.new_dept;
                        params.push(department);
                        console.log(params);
                        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                        connection.query(sql, params, (err, result) => {
                            if (err) throw err;
                            console.log("\nNew role " + answer.new_role + "added to database.\n");
                            initialize();
                        })
                    })
            })
        })
};

// add an employee
function addEmployee() {
    connection.query("SELECT * FROM role", (err, result) => {
        if (err) throw err;
        const roles = result.map((role) => ({
            value: role.id,
            name: role.title,
        }));
        connection.query("SELECT * FROM employee", (err, result) => {
            if (err) throw err;
            const managers = result.map((employee) => ({
                value: employee.id,
                name: employee.first_name + " " + employee.last_name,
            }));
            managers.push({ name: "None", value: null });
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "New employee first name:",
                        name: 'first_name',
                    },
                    {
                        type: "input",
                        message: "New employee last name:",
                        name: 'last_name'
                    },
                    {
                        type: "list",
                        message: "New employee role:",
                        name: "role_id",
                        choices: roles
                    },
                    {
                        type: "list",
                        message: "New employee manager:",
                        name: "manager_id",
                        choices: managers,
                    }
                ]
                )
                .then(function (answer) {
                    connection.query(
                        "INSERT INTO employee SET ?",
                        answer,
                        function (err, result) {
                            if (err) {
                                throw err;
                            }
                            console.log("\nNew employee " + answer.first_name + " " + answer.last_name + "added to database.\n");
                            initialize();
                        }
                    );
                });
        });
    })
};

//update employee role
function updateEmployeeRoll() {
    connection.query("SELECT * FROM employee", (err, result) => {
        if (err) throw err;
        const employees = result.map((employee) => ({
            value: employee.id,
            name: employee.first_name + " " + employee.last_name,
        }));
        connection.query("SELECT * FROM role", (err, result) => {
            if (err) throw err;
            const roles = result.map((role) => ({
                value: role.id,
                name: role.title,
            }));
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which employee are you updating?",
                        name: 'id',
                        choices: employees
                    },
                    {
                        type: "list",
                        message: "Employee's new role:",
                        name: 'role_id',
                        choices: roles
                    }
                ]
                )
                .then(function (answer) {
                    connection.query(
                        "UPDATE employee SET role_id = ? WHERE id = ?", [answer.role_id, answer.id],
                        function (err, result) {
                            if (err) {
                                throw err;
                            }
                            console.log("\nEmployee role updated");
                            initialize();
                        }
                    );
                });
        });
    });
};

initialize();