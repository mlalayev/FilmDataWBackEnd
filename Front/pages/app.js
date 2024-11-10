const cardgroup = document.getElementById("card-group");

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
}

async function filmData() {
  try {
    // Make a GET request to fetch data from the API
    const response = await fetch("http://localhost:3000/api/films", {
      // Correct endpoint without #
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // mode:"no-cors"
    });

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response

    data.sort((b, a) => b.name - a.name);

    // shuffleArray(data);

    console.log(data); // Log the data to inspect its structure

    // Assuming the data is an array, create a card for each film
    data.forEach((film) => {
      cardgroup.innerHTML += `
        <div class="card rounded border border-2">
          <div class="card-header d-flex align-items-center">
            <h1 class="card-title" style="font-size:26px">${film.name}</h1>
          </div>
          <div class="card-body">
            <img class="card-img img-thumbnail rounded" src="${film.imageUrl}" alt="${film.name}">
            <p class="card-text text-center mt-3">${film.description}</p>
          </div>
          <div class="card-footer d-flex align-items-center justify-content-between">
            <p class="m-0 gap-1 d-flex align-items-center"><i class = "bi bi-star-fill text-warning"></i>${film.imdb}</p> 
            <p class="m-0 gap-1 d-flex align-items-center"><span class="m-0 badge bg-success">${film.metaScore}</span>Metascore</p> 
             
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Error fetching data: ", error); // Log errors to the console
  }
}

// Call the function to populate the cards
filmData();
