# Employee-Tracker

## Description 
An app that lets you view and manage departments, roles and employees in your company. This allows you to organize and plan your business.

## Tasks
GIVEN a command-line application that accepts user input

WHEN I start the application

THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments

THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles

THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees

THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department

THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role

THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee

THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

WHEN I choose to update an employee role

THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Packages
- Inquirer
- MySQL2
- console.table

## ScreenShots
![image](https://user-images.githubusercontent.com/79381847/121837484-51d76580-cc9b-11eb-966d-98dd7fdfed9c.png)

![image](https://user-images.githubusercontent.com/79381847/121837537-76334200-cc9b-11eb-9c7a-b3ccc6c4ece5.png)


## Walkthrough Video
[Link to walkthrough video](https://drive.google.com/file/d/1cbcRUYSzpuRC45froUejusGGkS9f2RVq/view)

![Screen recording of application](./Assets/recording.gif)