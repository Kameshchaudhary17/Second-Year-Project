const userDataString = localStorage.getItem("user_info");
const userData = JSON.parse(userDataString);
const user_id = userData.userId;

const url = `http://localhost:8030/getBookings?user_id=${user_id}`;

fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data);
        populateDetail(data); // Call the function to populate the container with fetched data
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Function to create detail items and append them to the container
const populateDetail = (data) => {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing content in the container

    // Check if data is available
    if (data.result && data.result.length > 0) {
        data.result.forEach(item => {
            // Create a new detail section
            const detailSection = document.createElement('div');
            detailSection.classList.add('detail');

            // Create a div for info and add data to it
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');
            const resourceNamePara = document.createElement('p');
            resourceNamePara.textContent = `Resource Name: ${item.resourceName}`;
            const studentNamePara = document.createElement('p');
            studentNamePara.textContent = `Student Name: ${item.studentName}`;
            const timePara = document.createElement('p');
            timePara.textContent = `Time: ${item.time}`;

            // Append paragraph elements to the info div
            infoDiv.appendChild(resourceNamePara);
            infoDiv.appendChild(studentNamePara);
            infoDiv.appendChild(timePara);

            // Append info div to the detail section
            detailSection.appendChild(infoDiv);

            // Create a div for buttons
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('btns');

            // Create a delete button and add event listener
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.innerHTML = '<img src="../Images/delete.png" alt="">';
            deleteButton.addEventListener('click', () => {
                detailSection.remove(); // Remove the detail section when the button is clicked
            });

            // Append delete button to the buttons div
            buttonsDiv.appendChild(deleteButton);

            // Create an edit button and add event listener
            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.innerHTML = '<img src="../Images/edit.svg" alt="">';
            editButton.addEventListener('click', () => {
                // Add your edit functionality here
            });

            // Append edit button to the buttons div
            buttonsDiv.appendChild(editButton);

            // Append the buttons div to the detail section
            detailSection.appendChild(buttonsDiv);

            // Append the detail section to the container
            container.appendChild(detailSection);
        });
    } else {
        // If no data is available, display a message
        const noDataPara = document.createElement('p');
        noDataPara.textContent = 'No bookings found';
        container.appendChild(noDataPara);
    }
};
