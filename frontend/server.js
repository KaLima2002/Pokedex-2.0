fetch('http://localhost:3000/POKEMON')
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {
    console.error('Erro ao buscar dados da API:', error);
});