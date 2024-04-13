const form = document.createElement("form");

form.id = "myForm";
form.style.width = "360px";

function createLabel(text) {
  const label = `<label>${text}</label>`;
  return label;
}

function createInput(type, placeholder, id) {
  const input = `<input type="${type}" placeholder="${placeholder}" id="${id}" />`;
  return input;
}

form.innerHTML = `
  <h2>Add User</h2>
  <div>
    <label>First Name:</label>
    <input type="text" placeholder="First Name" id="FirstName" />
  </div>
  <div>
    ${createLabel("Last Name:")} ${createInput(
  "text",
  "Last Name:",
  "LastName"
)}
  </div>
  <div>
    ${createLabel("Birth Day:")} ${createInput("date", null, "Dob")}
  </div>
  <div>
    ${createLabel("Email:")} ${createInput("email", "Email", "Email")}
  </div>
  <div>
    ${createLabel("Password:")} ${createInput(
  "password",
  "Enter your Password",
  "Password"
)}
  </div>
  <button class="btn" type="submit">Submit</button>
`;
document.body.appendChild(form);

document
  .querySelector("form")
  .querySelectorAll("div")
  .forEach(function (div) {
    div.className = "input-container";
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  document.body.style.display = "grid";
  document.body.style.gridTemplateColumns = "repeat(2, 1fr)";

  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;

  function getFullName() {
    const fullName = `${firstName} ${lastName}`;
    return fullName;
  }

  const dob = document.getElementById("Dob").value;

  function calcAge(dob) {
    let birthday = new Date(dob);
    let ageDif = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDif);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;

  validation();

  function validation() {
    if (
      firstName == "" ||
      lastName == "" ||
      dob == "" ||
      email == "" ||
      password == ""
    ) {
      alert("All fields must be completed");
      return;
    } else {
      createUser();
      const inputs = document.querySelectorAll("input");
      inputs.forEach(function (inputField) {
        inputField.value = "";
      });
    }
  }

  createUser();

  function createUser() {
    const ul = document.createElement("ul");
    ul.id = "UserDetails";
    ul.classList = "animateIn";
    ul.innerHTML = `
    <h4>${getFullName()}</h4>
    <img src="https://source.unsplash.com/PpyOVWQtEjE" style="height:150px;border-radius:25px"/>
    <li>First Name: <span>${firstName}</span></li>
    <li>Last Name: <span>${lastName}</span></li>
    <li>Birth Day: <span>${dob}</span></li>
    <li>Age: <span>${calcAge(dob)}</span></li>
    <li>Email: <span>${email}</span></li>
    `;
    document.body.appendChild(ul);
  }
});
