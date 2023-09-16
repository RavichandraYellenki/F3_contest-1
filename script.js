const apiKeyInput = document.getElementById("api-key");
        const movieTitleInput = document.getElementById("movie-title");
        const searchButton = document.getElementById("search-btn");
        const loader = document.getElementById("loader");
        const movieResults = document.getElementById("movie-results");

        searchButton.addEventListener("click", () => {
            const apiKey = apiKeyInput.value.trim();
            const movieTitle = movieTitleInput.value.trim();

            if (apiKey === "" || movieTitle === "") {
                alert("API Key and Movie Title are required.");
                return;
            }

            // Show loader while fetching data
            loader.style.display = "block";
            movieResults.innerHTML = ""; // Clear previous results
             // Make API request
             fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
             .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Hide loader once data is fetched
                loader.style.display = "none";

                if (data.Response === "True") {
                    const movies = data.Search;
                    movies.forEach((movie) => {
                        const movieCard = createMovieCard(movie);
                        movieResults.appendChild(movieCard);
                    });
                } else {
                    alert(data.Error || "An error occurred while fetching data.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                loader.style.display = "none";
                alert("Invalid API Key");
            });
        });

        // Function to create a movie card
        function createMovieCard(movie) {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <div>
                    <img src="${movie.Poster}" alt="${movie.Title}">
                </div>
                <div>
                    <p><strong>Title:</strong> ${movie.Title}</p>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>imdbID:</strong> ${movie.imdbID}</p>
                    <p><strong>Type:</strong> ${movie.Type}</p>
                    <p><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a></p>
                </div>
            `;
            return movieCard;
        }