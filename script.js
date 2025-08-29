// ===== GPA CALCULATOR LOGIC =====
let mode = "polytechnic";
let courses = [];

// Switch mode
document.getElementById("polyBtn").addEventListener("click", () => {
  mode = "polytechnic";
  alert("Switched to Polytechnic GPA");
});
document.getElementById("uniBtn").addEventListener("click", () => {
  mode = "university";
  alert("Switched to University GPA");
});

// Add course
document.getElementById("addBtn").addEventListener("click", () => {
  const code = document.getElementById("courseCode").value.trim();
  const unit = parseInt(document.getElementById("courseUnit").value);
  const grade = document.getElementById("courseGrade").value;

  if (!code || isNaN(unit) || unit <= 0) {
    alert("Please enter valid course details!");
    return;
  }

  courses.push({ code, unit, grade });
  renderCourses();

  document.getElementById("courseCode").value = "";
  document.getElementById("courseUnit").value = "";
});

// Render courses
function renderCourses() {
  const tbody = document.getElementById("courseTable");
  tbody.innerHTML = "";

  courses.forEach((c, index) => {
    let points = getPoints(c.grade) * c.unit;
    tbody.innerHTML += `
      <tr>
        <td>${c.code}</td>
        <td>${c.unit}</td>
        <td>${c.grade}</td>
        <td>${points}</td>
      </tr>
    `;
  });
}

// Get grade points
function getPoints(grade) {
  if (mode === "polytechnic") {
    switch (grade) {
      case "A": return 4.0;
      case "B": return 3.5;
      case "C": return 3.0;
      case "D": return 2.5;
      case "E": return 2.0;
      case "F": return 0.0;
    }
  } else {
    switch (grade) {
      case "A": return 5.0;
      case "B": return 4.0;
      case "C": return 3.0;
      case "D": return 2.0;
      case "E": return 1.0;
      case "F": return 0.0;
    }
  }
  return 0;
}

// Calculate GPA
document.getElementById("calcBtn").addEventListener("click", () => {
  if (courses.length === 0) {
    alert("Please add at least one course!");
    return;
  }

  let totalPoints = 0;
  let totalUnits = 0;

  courses.forEach(c => {
    totalPoints += getPoints(c.grade) * c.unit;
    totalUnits += c.unit;
  });

  let gpa = (totalPoints / totalUnits).toFixed(2);
  document.getElementById("gpaResult").textContent = gpa;
});

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
  courses = [];
  document.getElementById("courseTable").innerHTML = "";
  document.getElementById("gpaResult").textContent = "-";
});
