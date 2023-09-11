let pesquisa = document.getElementById("searchForm")
let capa = document.getElementById("capa")

pesquisa.addEventListener("submit",  function(event) {
	event.preventDefault()
	let data = new FormData(pesquisa)
	let nome = data.get("search")
	APIRequest(nome)
})

function APIRequest(musica){
	let disco = document.getElementById("disco")
	let url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q="+musica
	capa.style.animationName = 'slideOut'
	$("#disco").animate({"left": "50%"})

	fetch(url)

        .then(function(response){
        	console.log('esperando')
            return response.json()
        })

        .then(function(data){
        	console.log(data)
        	document.getElementById("box").style.transform = "translateX(-15%)"
        	capa.style.animationName = 'slideIn'
        	$("#disco").animate({"left": "57%"})
            capa.src = data.data[0].album.cover_big
            
        })
}