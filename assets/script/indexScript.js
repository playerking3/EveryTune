pesquisa = document.getElementById("searchForm")

pesquisa.addEventListener("submit",  function(event) {
	event.preventDefault()
	let data = new FormData(pesquisa)
	let nome = data.get("search")
	APIRequest(nome)
})

function APIRequest(musica){
	let url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q="+musica

	 fetch(url)
        .then(function(response){
            return response.json()
        })

        .then(function(data){
            console.log(data)
        })
}
