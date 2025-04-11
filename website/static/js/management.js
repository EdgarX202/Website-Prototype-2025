

document.addEventListener('DOMContentLoaded', function() {
    function populatePetTable() {
        fetch('/petitions')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#petitions-table-container tbody');
                tableBody.innerHTML = '';

                data.forEach(petition => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${petition.id}</td>
                        <td>${petition.title}</td>
                        <td>${petition.goal}</td>
                        <td><button class="btn btn-danger btn-sm delete-petition-button" data-petition-id="${petition.id}">Delete</button></td>
                    `;
                    tableBody.appendChild(row);
                });

                const deleteButtons = document.querySelectorAll('.delete-petition-button');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const petitionId = this.dataset.petitionId;
                        fetch(`/delete_pet/${petitionId}`, {
                            method: 'DELETE'
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                // Remove the row from the table
                                this.parentElement.parentElement.remove();
                            } else {
                                alert('Error deleting petition: ' + data.message);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('An error occurred. Please try again.');
                        });
                    });
                });
            });
    }

    function populateMembersTable() {
        fetch('/members')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#members-table-container tbody');
                tableBody.innerHTML = '';

                data.forEach(member => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${member.id}</td>
                        <td>${member.email}</td>
                        <td>${member.first_name}</td>
                        <td>${member.last_name}</td>
                        <td>${member.city}</td>
                        <td><button class="btn btn-warning btn-sm block-member-button">Block</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }

    populatePetTable();
    populateMembersTable();

    const petitionsButton = document.getElementById('petitions-button');
    const membersButton = document.getElementById('members-button');
    const petitionsTableContainer = document.getElementById('petitions-table-container');
    const membersTableContainer = document.getElementById('members-table-container');

    petitionsButton.addEventListener('click', () => {
        petitionsTableContainer.style.display = 'block';
        membersTableContainer.style.display = 'none';
        petitionsButton.classList.add('active');
        membersButton.classList.remove('active');
    });

    membersButton.addEventListener('click', () => {
        petitionsTableContainer.style.display = 'none';
        membersTableContainer.style.display = 'block';
        membersButton.classList.add('active');
        petitionsButton.classList.remove('active');
    });
        petitionsButton.classList.add('active');
});