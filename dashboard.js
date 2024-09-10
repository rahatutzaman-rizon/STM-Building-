const apiBaseUrl = 'https://stm-server.vercel.app'; // API base URL




// Fetch Employees
function fetchEmployees() {
  fetch(`${apiBaseUrl}/employees`)
    .then(response => response.json())
    .then(data => {
      const employeeTable = document.getElementById("employeeTable");
      employeeTable.innerHTML = data
        .map(
          employee => `
            <tr>
              <td><img src="${employee.imageUrl ? `${apiBaseUrl}/uploads/${employee.imageUrl}` : 'https://via.placeholder.com/50'}" alt="Image" style="width: 50px; height: 50px; object-fit: cover;"></td>
              <td>${employee.name}</td>
              <td>${employee.position}</td>
              <td>${employee.email}</td>
              <td>${employee.phone}</td>
              <td>${employee.description}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editEmployee('${employee._id}', '${employee.name}', '${employee.position}', '${employee.email}', '${employee.phone}', '${employee.description}', '${employee.imageUrl}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${employee._id}')">Delete</button>
              </td>
            </tr>`
        )
        .join("");

      // Update employee count
      document.getElementById("employeeCount").textContent = data.length;
    });
}

// Add Employee
document.getElementById("employeeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById("name").value);
  formData.append('position', document.getElementById("position").value);
  formData.append('email', document.getElementById("email").value);
  formData.append('phone', document.getElementById("phone").value);
  formData.append('description', document.getElementById("description").value);
  formData.append('image', document.getElementById("image").files[0]);

  fetch(`${apiBaseUrl}/employees`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(() => {
    fetchEmployees();
    $('#addEmployeeModal').modal('hide');
    document.getElementById("employeeForm").reset();
  });
});

// Edit Employee
function editEmployee(id, name, position, email, phone, description, imageUrl) {
  document.getElementById("employeeId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editPosition").value = position;
  document.getElementById("editEmail").value = email;
  document.getElementById("editPhone").value = phone;
  document.getElementById("editDescription").value = description;
  document.getElementById("editImage").value = '';

  $('#editEmployeeModal').modal('show');
}

document.getElementById("editEmployeeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("employeeId").value;
  const formData = new FormData();
  formData.append('name', document.getElementById("editName").value);
  formData.append('position', document.getElementById("editPosition").value);
  formData.append('email', document.getElementById("editEmail").value);
  formData.append('phone', document.getElementById("editPhone").value);
  formData.append('description', document.getElementById("editDescription").value);
  formData.append('image', document.getElementById("editImage").files[0]);

  fetch(`${apiBaseUrl}/employees/${id}`, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(() => {
    fetchEmployees();
    $('#editEmployeeModal').modal('hide');
    document.getElementById("editEmployeeForm").reset();
  });
});

// Delete Employee
function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`${apiBaseUrl}/employees/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
      fetchEmployees();
    });
}}


// Add Employee
document.getElementById("employeeForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', document.getElementById("name").value);
    formData.append('position', document.getElementById("position").value);
    formData.append('email', document.getElementById("email").value);
    formData.append('phone', document.getElementById("phone").value);
    formData.append('description', document.getElementById("description").value);
    formData.append('image', document.getElementById("image").files[0]);
  
    fetch(`${apiBaseUrl}/employees`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(() => {
      fetchEmployees();
      document.getElementById("employeeForm").reset();
    });
  });
  
  // Edit Employee
  function editEmployee(id, name, position, email, phone, description, imageUrl) {
    document.getElementById("employeeId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editPosition").value = position;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editDescription").value = description;
    document.getElementById("editImage").value = ''; // Clear file input
    const editEmployeeModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
    editEmployeeModal.show();
  }
  
  // Update Employee
  document.getElementById("editEmployeeForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', document.getElementById("editName").value);
    formData.append('position', document.getElementById("editPosition").value);
    formData.append('email', document.getElementById("editEmail").value);
    formData.append('phone', document.getElementById("editPhone").value);
    formData.append('description', document.getElementById("editDescription").value);
    if (document.getElementById("editImage").files[0]) {
      formData.append('image', document.getElementById("editImage").files[0]);
    }
  
    const id = document.getElementById("employeeId").value;
  
    fetch(`${apiBaseUrl}/employees/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(() => {
      fetchEmployees();
      const editEmployeeModal = bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
      editEmployeeModal.hide();
    });
  });
  
  // Delete Employee
  function deleteEmployee(id) {
    fetch(`${apiBaseUrl}/employees/${id}`, {
      method: 'DELETE'
    })
    .then(() => fetchEmployees());
  }
  

// Fetch and Display Emails
function fetchEmails() {
  fetch(`${apiBaseUrl}/emails`)
    .then(response => response.json())
    .then(data => {
      const emailTable = document.getElementById("emailTable");
      emailTable.innerHTML = data
        .map(
          email => `
            <tr>
              <td>${email.email}</td>
              <td>
                <button class="btn btn-sm btn-danger" onclick="deleteEmail('${email._id}')">Delete</button>
              </td>
            </tr>`
        )
        .join("");
    });
}

// Fetch and Display Messages
function fetchMessages() {
  fetch(`${apiBaseUrl}/form`)
    .then(response => response.json())
    .then(data => {
      const messageTable = document.getElementById("messageTable");
      messageTable.innerHTML = data
        .map(
          message => `
            <tr>
              <td>${message.name}</td>
              <td>${message.email}</td>
              <td>${message.phone}</td>
              <td>${message.message}</td>
              <td>
                <button class="btn btn-sm btn-danger" onclick="deleteMessage('${message._id}')">Delete</button>
              </td>
            </tr>`
        )
        .join("");
    });
}


// Add Email
document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("adminEmail").value;

  fetch(`${apiBaseUrl}/emails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  .then(response => response.json())
  .then(() => {
    fetchEmails();
    document.getElementById("emailForm").reset();
  });
});

// Delete Email
function deleteEmail(id) {
  fetch(`${apiBaseUrl}/emails/${id}`, {
    method: 'DELETE'
  })
  .then(() => fetchEmails());
}

// Delete Message
function deleteMessage(id) {
  fetch(`${apiBaseUrl}/form/${id}`, {
    method: 'DELETE'
  })
  .then(() => fetchMessages());
}

// Initial Data Load
document.addEventListener("DOMContentLoaded", function() {
  fetchEmployees();
  fetchEmails();
  fetchMessages();

  // Handle sidebar link clicks
  document.getElementById("employeeLink").addEventListener("click", function() {
    document.getElementById("employeeSection").style.display = "block";
    document.getElementById("emailSection").style.display = "none";
    document.getElementById("messageSection").style.display = "none";
  });

  document.getElementById("emailLink").addEventListener("click", function() {
    document.getElementById("employeeSection").style.display = "none";
    document.getElementById("emailSection").style.display = "block";
    document.getElementById("messageSection").style.display = "none";
  });

  document.getElementById("messageLink").addEventListener("click", function() {
    document.getElementById("employeeSection").style.display = "none";
    document.getElementById("emailSection").style.display = "none";
    document.getElementById("messageSection").style.display = "block";
  });
});
