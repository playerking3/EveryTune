let pesquisa = document.getElementById("searchForm")
let capa = document.getElementById("capa")
let player = document.getElementById("playerprevia")
let info = document.getElementsByClassName("info")

pesquisa.addEventListener("submit",  function(event) {
	event.preventDefault()
	let data = new FormData(pesquisa)
	let nome = data.get("search")
	APIRequest(nome)
})

function APIRequest(musica){
	let url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q="+musica
	capa.style.animationName = 'slideOut'
	$(".info").fadeOut()
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
			setTimeout(()=>{
				info[0].style.animationName = "slideIn2"
				info[0].style.display = "inline-block"
				setTimeout(()=>{
					info[1].style.animationName = "slideIn2"
					info[1].style.display = "inline-block"
					setTimeout(()=>{
						info[2].style.animationName = "slideIn2"
						info[2].style.display = "inline-block"
						setTimeout(()=>{
							info[3].style.animationName = "slideIn2"
							info[3].style.display = "inline-block"
						}, 250)
					}, 250)
				}, 250)
			}, 250)
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
	progress(player, element)
}

function progress(player, element){
	player.addEventListener('timeupdate', () =>{
		let total = player.duration
		let atual = player.currentTime
		let porcentagem = (atual*100)/total
		console.log(porcentagem)
		element.style.background = "linear-gradient(90deg, rgba(255,163,55,1) "+porcentagem+"%, rgba(77,77,77,1) "+porcentagem+"%)"
	})
}

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    return formattedDuration;
 }