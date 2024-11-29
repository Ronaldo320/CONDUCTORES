document.getElementById('fetchData').addEventListener('click', () => {
    fetch('http://localhost:8080/api/HomeController.java') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
});
