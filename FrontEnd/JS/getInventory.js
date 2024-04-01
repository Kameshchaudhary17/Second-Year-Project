const userDataString = localStorage.getItem("user_info");
const userData = JSON.parse(userDataString);
const user_id = userData.userId;

const url = `http://localhost:8030/getInventory?user_id=${user_id}`;

fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data);
        populateDetail(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Function to create detail items and append them to the container
const populateDetail = (data) => {
    const container = document.querySelector('.item');
    container.innerHTML = ''; // Clear existing content in the container

    // Check if data is available
    if (data.result && data.result.length > 0) {
        data.result.forEach(item => {
            // Create a new detail section
            const detailSection = document.createElement('div');
            detailSection.classList.add('list');

            // Create a div for info and add data to it
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');
            const resourceNamePara = document.createElement('p');
            resourceNamePara.textContent = `Resource Name: ${item.resourceTitle}`;
            const studentNamePara = document.createElement('p');
            studentNamePara.textContent = `Student Name: ${item.resourceQuantity}`;
            const timePara = document.createElement('p');
            timePara.textContent = `Time: ${item.time}`;

            // Append paragraph elements to the info div
            infoDiv.appendChild(resourceNamePara);
            infoDiv.appendChild(studentNamePara);
            infoDiv.appendChild(timePara);

            // Append info div to the detail section
            detailSection.appendChild(infoDiv);

            // Create an edit button and add event listener
            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            editButton.addEventListener('click', () => {
                // Handle edit functionality here
            });
            detailSection.appendChild(editButton);

            // Create a delete button and add event listener
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.innerHTML = '<img src="../Images/delete.png" alt="">';
            deleteButton.addEventListener('click', async () => {
                try {
                    const response = await fetch(`http://localhost:8030/deleteResources?resourceId=${item.resourceId}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        // If the deletion was successful, remove the detail section
                        detailSection.remove();
                    } else {
                        // Handle errors or display a message if deletion failed
                        console.error('Deletion failed:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
            detailSection.appendChild(deleteButton);

            // Append the detail section to the container
            container.appendChild(detailSection);
        });
    } else {
        // If no data is available, display a message
        const noDataPara = document.createElement('p');
        noDataPara.textContent = 'No resources found';
        container.appendChild(noDataPara);
    }
};
