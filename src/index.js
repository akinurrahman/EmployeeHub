(async () => {
  const data = await fetch("./src/data.json");
  const res = await data.json();

  let employees = res;
  let selectedEmployeeId = res[0].id;
  let selectedEmployee = res[0];

  const employeeList = document.querySelector(".employees__names--list");
  const employeeSingleInfo = document.querySelector(".employees__single--info");

  const renderEmployee = () => {
    employeeList.innerHTML = "";

    employees.forEach((item, index) => {
      const employeeContainer = document.createElement("div");
      employeeContainer.classList.add("employee__container");

      const employee = document.createElement("span");
      employee.classList.add("employee");
      employee.textContent = `${item.fname} ${item.lname}`;

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-xmark");

      // Add an event listener to handle employee deletion
      deleteIcon.addEventListener("click", () => {
        const selectedIndex = employees.findIndex((emp) => emp.id === selectedEmployeeId);
        employees.splice(selectedIndex, 1);
        selectedEmployeeId = employees.length > 0 ? employees[0].id : null;
        selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId);
        renderEmployee();
      });

      // Add an event listener to handle employee selection
      employee.addEventListener("click", () => {
        document.querySelectorAll(".employee").forEach((el) => {
          el.classList.remove("selected");
        });
        employee.classList.add("selected");
        selectedEmployeeId = item.id;
        selectedEmployee = item;
        renderSingleEmployee();
      });

      employeeContainer.append(employee, deleteIcon);
      employeeList.append(employeeContainer);

      if (index === 0) {
        employee.classList.add("selected");
        renderSingleEmployee();
      }
    });
  };

  const renderSingleEmployee = () => {
    employeeSingleInfo.innerHTML = "";
    const employeeImg = document.createElement("img");
    employeeImg.setAttribute("src", selectedEmployee.imgurl || "./assets/placeholder.webp");

    const employeeName = document.createElement("span");
    employeeName.classList.add("employee__name");
    employeeName.textContent = `${selectedEmployee.fname} ${selectedEmployee.lname}`;

    const employeeAddress = document.createElement("span");
    employeeAddress.classList.add("employee__address");
    employeeAddress.textContent = selectedEmployee.address;

    const employeeMail = document.createElement("span");
    employeeMail.classList.add("employee__mail");
    employeeMail.textContent = selectedEmployee.email;

    const employeeMobile = document.createElement("span");
    employeeMobile.classList.add("employee__mobile");
    employeeMobile.textContent = `Phone: ${selectedEmployee.contact}`;

    const employeeDOB = document.createElement("span");
    employeeDOB.classList.add("employee__dob");
    employeeDOB.textContent = `DOB: ${selectedEmployee.dob}`;

    employeeSingleInfo.append(
      employeeImg,
      employeeName,
      employeeAddress,
      employeeMail,
      employeeMobile,
      employeeDOB
    );
  };

  renderEmployee();
})();
