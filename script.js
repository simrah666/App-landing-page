document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("show");
});

const featureSwiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".animate").forEach((el) => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// GPA Calculator Logic
let courses = [];

function addCourse() {
  const inputs = document.querySelectorAll("#gpa-form input");
  const name = inputs[0].value;
  const grade = parseFloat(inputs[1].value);
  const credit = parseFloat(inputs[2].value);

  if (!name || isNaN(grade) || isNaN(credit)) return;

  courses.push({ name, grade, credit });
  inputs.forEach(input => input.value = "");

  renderCourses();
  calculateGPA();
}

function renderCourses() {
  const list = document.getElementById("course-list");
  list.innerHTML = "<h3>Courses Added:</h3><ul>" + courses.map(course =>
    `<li>${course.name}: Grade ${course.grade}, Credit ${course.credit}</li>`).join("") + "</ul>";
}

function calculateGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    totalPoints += course.grade * course.credit;
    totalCredits += course.credit;
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
  document.getElementById("result").innerHTML = `<h3>Your GPA: ${gpa}</h3>`;
}
