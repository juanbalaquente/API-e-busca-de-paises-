const listaPaises = document.getElementById('listaPaises');
const listaFavoritos = document.getElementById('listaFavoritos');
const quantidadePaises = document.getElementById('quantidadePaises');
const totalPopulacao = document.getElementById('totalPopulacao');
var paises = [];
var favoritos = [];
var data

var btnTodos = document.getElementById("todos");
var btnAfrica = document.getElementById("africa");
var btnAmericas = document.getElementById("americas");
var btnAsia = document.getElementById("asia");
var btnEuropa = document.getElementById("europa");
var btnOceania = document.getElementById("oceania");

async function buscarPaises() {
    try {
        const response = await fetch('https://restcountries.com/v2/all');
         data = await response.json();

        paises = data.map(pais => ({
            nome: pais.name,
            bandeira: pais.flags.png,
            populacao: pais.population,
            id: pais.numericCode,
        }));

        paises.sort((a, b) => a.nome.localeCompare(b.nome));
        exibirPaises();
    } catch (error) {
        console.error('Erro ao buscar países:', error);
    }
}

function exibirPaises() {
    listaPaises.innerHTML = '';
    quantidadePaises.textContent = paises.length;
    totalPopulacao.textContent = paises.reduce((total, pais) => total + pais.populacao, 0);

    paises.forEach(pais => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${pais.bandeira}" alt="${pais.nome}" /> ${pais.nome} (População: ${pais.populacao}) <button onclick="adicionarAosFavoritos('${pais.id}')">Adicionar aos Favoritos</button>`;
        listaPaises.appendChild(li);
    });
}

function exibirPaisesFiltrados(filtro) {
    listaPaises.innerHTML = '';
    quantidadePaises.textContent = filtro.length;
    totalPopulacao.textContent = filtro.reduce((total, pais) => total + pais.populacao, 0);

    filtro.forEach(pais => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${pais.bandeira}" alt="${pais.nome}" /> ${pais.nome} (População: ${pais.populacao}) <button onclick="adicionarAosFavoritos('${pais.id}')">Adicionar aos Favoritos</button>`;
        listaPaises.appendChild(li);
    });
}

function adicionarAosFavoritos(paisId) {
    const pais = paises.find(p => p.id === paisId);
    if (pais) {
        const indicePais = paises.findIndex(p => p.id === paisId);
        if (indicePais !== -1) {
            paises.splice(indicePais, 1);
        }

        favoritos.push(pais);
        favoritos.sort((a, b) => a.nome.localeCompare(b.nome));
        exibirFavoritos();
        exibirPaises();
    }
}

function exibirFavoritos() {
    listaFavoritos.innerHTML = '';
    favoritos.forEach(favorito => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${favorito.bandeira}" alt="${favorito.nome}" /> ${favorito.nome} <button onclick="removerDosFavoritos('${favorito.id}')">Remover dos Favoritos</button>`;
        listaFavoritos.appendChild(li);
    });
}

function removerDosFavoritos(paisId) {
    const pais = favoritos.find(f => f.id === paisId);
    if (pais) {
        const indiceFavorito = favoritos.findIndex(f => f.id === paisId);
        if (indiceFavorito !== -1) {
            favoritos.splice(indiceFavorito, 1);
        }

        paises.push(pais);
        paises.sort((a, b) => a.nome.localeCompare(b.nome));
        exibirFavoritos();
        exibirPaises();
    }
}

buscarPaises();

var searchInput = document.getElementById("pesquisar");

var searchResults = document.getElementById("pesqresult");

searchInput.addEventListener("input", function () {
    var pesqtermo = searchInput.value.toLowerCase();

    var filtrados = paises.filter(function (pais) {
        return pais.nome.toLowerCase().includes(pesqtermo);
    });

    displayResults(filtrados);
});

function displayResults(results) {
    searchResults.innerHTML = '';

    results.forEach(function (result) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${result.bandeira}" alt="${result.nome}" /> ${result.nome} (População: ${result.populacao}) <button onclick="adicionarAosFavoritos('${result.id}')">Adicionar aos Favoritos</button>`;

        searchResults.appendChild(listItem);
    });
}


async function buscarPaises() {
    try {
        const response = await fetch('https://restcountries.com/v2/all');
        data = await response.json();

        paises = data.map(pais => ({
            nome: pais.name,
            bandeira: pais.flags.png,
            populacao: pais.population,
            id: pais.numericCode,
            region: pais.region, 
        }));

        paises.sort((a, b) => a.nome.localeCompare(b.nome));
        exibirPaises();
    } catch (error) {
        console.error('Erro ao buscar países:', error);
    }
}


btnTodos.addEventListener("click", function () {
    exibirPaises();
});

btnAfrica.addEventListener("click", function () {
    const paisesAfrica = paises.filter(pais => pais.region === "Africa");
    exibirPaisesFiltrados(paisesAfrica);
});

btnAmericas.addEventListener("click", function () {
    const paisesAmericas = paises.filter(pais => pais.region === "Americas");
    exibirPaisesFiltrados(paisesAmericas);
});

btnAsia.addEventListener("click", function () {
    const paisesAsia = paises.filter(pais => pais.region === "Asia");
    exibirPaisesFiltrados(paisesAsia);
});

btnEuropa.addEventListener("click", function () {
    const paisesEuropa = paises.filter(pais => pais.region === "Europe");
    exibirPaisesFiltrados(paisesEuropa);
});

btnOceania.addEventListener("click", function () {
    const paisesOceania = paises.filter(pais => pais.region === "Oceania");
    exibirPaisesFiltrados(paisesOceania);
});







function displayResults(results) {
    searchResults.innerHTML = '';

    results.forEach(function (result) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${result.bandeira}" alt="${result.nome}" /> ${result.nome} (População: ${result.populacao}) <button onclick="adicionarAosFavoritos('${result.id}')">Adicionar aos Favoritos</button>`;

        searchResults.appendChild(listItem);
    });

    if (results.length === 0) {
        document.getElementById("continente").style.display = "block";
    } else {
        document.getElementById("continente").style.display = "none";
    }
}

searchInput.addEventListener("input", function () {
    var pesqtermo = searchInput.value.toLowerCase();

    var filtrados = paises.filter(function (pais) {
        return pais.nome.toLowerCase().includes(pesqtermo);
    });

    displayResults(filtrados);
});