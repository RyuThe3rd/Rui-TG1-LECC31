

var Pesquisar = localStorage.getItem('pesquisa');

document.getElementById('titulo').textContent = Pesquisar;

window.onload = function() {
    // Recupera o valor da pesquisa do localStorage
    
    // Se a pesquisa existir, altera o título da aba e o título na página
    if (Pesquisar) {
        // Alterar o título da aba (title) com o valor da pesquisa
        document.title = "Pesquisa IMDB - " + Pesquisar;

        // Alterar o título exibido na página
        document.getElementById('titulo').innerText = Pesquisar;
    } else {
        // Caso não haja pesquisa, você pode exibir um título alternativo
        document.title = "Pesquisa IMDB - Nenhum título encontrado";
        document.getElementById('titulo').innerText = "Nenhuma pesquisa realizada";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movieList');
    
    fetch(`https://api.collectapi.com/imdb/imdbSearchByName?query=${Pesquisar}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": "apikey 4GVSSV51QMdmm7cbBSeMXi:4lccEU790kYCRqAL9rWzI2"
        }
      })
      .then(response => response.json())
      .then(data =>  {
        console.log('Dados recebidos:', data);
        if (data.success == true && data.result.length > 0) {
            data.result.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'col';
                movieCard.innerHTML = `
                    <div class="card movie-card">
                        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" rel="noopener noreferrer">
                            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image';">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                        </div>
                    </div>
                `;
                movieList.appendChild(movieCard);
            });
        } else {
            throw new Error('Nenhum resultado encontrado');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
        movieList.innerHTML = `<p class="text-center text-danger">Erro ao carregar os filmes: ${error.message}. Por favor, tente novamente mais tarde.</p>`;
    });
});
    
    /* .then(Response=> {

        return Response.json();
    }).then(data => {
        console.log('Dados recebidos:', data);
        if (data.results && data.results.length > 0) {
            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'col';
                movieCard.innerHTML = `
                    <div class="card movie-card">
                        <a href="https://www.imdb.com/title/${movie.id}" target="_blank" rel="noopener noreferrer">
                            <img src="${movie.image}" class="card-img-top" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image';">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                        </div>
                    </div>
                `;
                movieList.appendChild(movieCard);
            });
        } else {
            throw new Error('Nenhum resultado encontrado');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
        movieList.innerHTML = `<p class="text-center text-danger">Erro ao carregar os filmes: ${error.message}. Por favor, tente novamente mais tarde.</p>`;
    });
}); */