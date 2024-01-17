(async () => {
  const data = await fetch("./src/data.json");
  const res = await data.json();

  const employees = res;
  let selectedEmployeeId = res[0].id;
  let selectedEmployee = res[0];

  const employeeList = document.querySelector(".employees__names--list");

  const renderEmployee = () => {
    employeeList.innerHTML = ""; // Clear existing content

    employees.forEach((item, index) => {
      const employeeContainer = document.createElement("div");
      employeeContainer.classList.add("employee__container");

      const employee = document.createElement("span");
      employee.classList.add("employee");
      employee.textContent = `${item.fname} ${item.lname}`;

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-xmark");

      // Add an event listener to handle employee selection
      employee.addEventListener("click", () => {
        // Remove "selected" class from all employees
        document.querySelectorAll(".employee").forEach((el) => {
          el.classList.remove("selected");
        });

        // Add "selected" class to the clicked employee
        employee.classList.add("selected");

        // Update the selected employee ID
        selectedEmployeeId = item.id;

        // Update the selected employee object
        selectedEmployee = item;

        // todo: handle employee selection logic
      });

      employeeContainer.append(employee, deleteIcon);
      employeeList.append(employeeContainer);

      // Add "selected" class to the first employee by default
      if (index === 0) {
        employee.classList.add("selected");
      }
    });
  };

  renderEmployee();
})();
