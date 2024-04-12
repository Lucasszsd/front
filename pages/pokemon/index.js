
function changePageTitle(title) {
    document.title = title
  }

  function generateInfoSection(src, pokemonName) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`
  
    const img = document.querySelector('img')
    img.src = src
    img.alt = `Imagem do pokemon ${pokemonName}`
  
    const section = document.querySelector('#info-pokemon')
  
    section.appendChild(h2)
    section.appendChild(img)
  }
  
  async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))
  
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
      const jsonData = await data.json()
  
      generateInfoSection(jsonData.sprites.front_default, name)
      const spritesArray = Object.values(data.sprites);
      const imageLinks = spritesArray.filter(item => typeof item === 'string');
      const imagemPokemon = document.getElementById('imagemPokemon');
      imagemPokemon.src = imageLinks[0];
      imagemPokemon.addEventListener('click', () => {
    const index = imageLinks.indexOf(imagemPokemon.src);
    const proxIndex = index === imageLinks.length - 1 ? 0 : index + 1;
    imagemPokemon.src = imageLinks[proxIndex];
});


    } catch (error) {
      console.error(error)
    }
  }
  
  function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
      return
    }
  
    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)
  
    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')
  
    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
    updateContador()
  })

  function getContador() {
    const contador = localStorage.getItem('contador');
    return contador ? JSON.parse(contador) : { count: 0, lastVisit: '' };
}

function updateContador() {
    let contador = getContador();
    contador.count++;
    contador.lastVisit = new Date();

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(contador.lastVisit);

    localStorage.setItem('contador', JSON.stringify(contador));
    return formattedDate;
}