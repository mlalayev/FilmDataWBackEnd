const btn = document.querySelector('#btn')

document.getElementById('filmForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const filmData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        imageUrl: document.getElementById('imageUrl').value,
        imdb: parseFloat(document.getElementById('imdb').value),
        metaScore: parseFloat(document.getElementById('metaScore').value),
    };

    fetch('http://localhost:3000/api/films', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmData),
    })
    .then(response => {
        console.log('Response status:', response.status);  // Log response status
        return response.json();
    })
    .then(data => {
        console.log('Film added:', data);
        alert('Film added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding film.');
    });
});
