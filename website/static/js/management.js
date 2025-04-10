

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