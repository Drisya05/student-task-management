let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");
const average = document.getElementById("average");
const averageBtn = document.getElementById("averageBtn");
const removeBtn = document.getElementById("removeBtn");

function displayStudents(callback) {
    table.innerHTML = "";

    students.forEach(callback);
}

function createRow(student) {
    const row = document.createElement("tr");

    const status = student.marks >= 50 ? "Pass" : "Fail";

    if (student.marks < 50) {
        row.classList.add("fail");
    } else {
        row.classList.add("pass");
    }

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.subject}</td>
        <td>${student.marks}</td>
        <td>${status}</td>
    `;

    table.appendChild(row);
}

function showStudents() {
    displayStudents(createRow);
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (name === "" || subject === "" || marks === "") {
        message.textContent = "Please fill all fields";
        return;
    }

    const student = {
        name: name,
        subject: subject,
        marks: Number(marks)
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    showStudents();

    message.textContent = "Student added successfully";

    setTimeout(() => {
        message.textContent = "";
    }, 2000);

    form.reset();
});

averageBtn.addEventListener("click", () => {

    if (students.length === 0) {
        average.textContent = "No student records available";
        return;
    }

    const total = students.reduce((sum, student) => {
        return sum + student.marks;
    }, 0);

    const result = total / students.length;

    average.textContent = "Average Marks: " + result.toFixed(2);
});

removeBtn.addEventListener("click", () => {

    const name = prompt("Enter student name to remove:");

    if (name === null || name.trim() === "") {
        return;
    }

    const oldLength = students.length;

    students = students.filter(student =>
        student.name.toLowerCase() !== name.trim().toLowerCase()
    );

    if (students.length === oldLength) {
        message.textContent = "Student not found";
    } else {
        localStorage.setItem("students", JSON.stringify(students));
        showStudents();
        message.textContent = "Student removed successfully";
    }

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
});

showStudents();
