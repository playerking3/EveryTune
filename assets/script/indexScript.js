let pesquisa = document.getElementById("searchForm")
let capa = document.getElementById("capa")
let player = document.getElementById("playerprevia")

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
	document.getElementById("box").style.transform = "translateX(0%)"
	fetch(url)

        .then(function(response){
        	console.log('esperando')
            return response.json()
        })

        .then(function(data){
        	console.log(data)
        	document.getElementById("box").style.transform = "translateX(-10%)"
        	capa.style.animationName = 'slideIn'
        	$("#disco").animate({"left": "57%"})
            capa.src = data.data[0].album.cover_big
            player.src = data.data[0].preview
			document.getElementById("artista").innerHTML = data.data[0].artist.name
			document.getElementById("musicaNome").innerHTML = data.data[0].title
			document.getElementById("album").innerHTML = data.data[0].album.title
			document.getElementById("duracao").innerHTML = formatDuration(data.data[0].duration)
        })
}

function playpause(element){
	if (player.paused == false) {
		player.pause()
		element.innerHTML = '<i class="fa-solid fa-play"></i> Tocar prévia'
	} else {
		player.play()
		element.innerHTML = '<i class="fa-solid fa-pause"></i> Tocar prévia'
	}
	progress(player)
}

function progress(player){
	player.addEventListener('timeupdate', () =>{
		let total = player.duration
		let atual = player.currentTime
		let porcentagem = (atual*100)/total
		console.log(porcentagem)
	})
}

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    return formattedDuration;
 }