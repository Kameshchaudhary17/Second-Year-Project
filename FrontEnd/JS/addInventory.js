const userInfoString = localStorage.getItem("user_info");
const userInfo = JSON.parse(userInfoString);
const userId = userInfo.userId;

const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData(e.target);
    const jsonData = {
        user_id: userId 
    };

    // Populate jsonData with form fields
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });


    try {
        const response = await fetch('http://localhost:8030/addResource', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            // Redirect or show success message
            console.log("Adding successful");
            location.reload();
        } else {
            console.error('Adding failed:', data.error);
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

document.getElementById('addInventory').addEventListener('submit', handleSubmit);
