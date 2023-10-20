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
	let url = "https://api.deezer.com/search/track?q="+musica
	capa.style.animationName = 'slideOut'
	$("#disco").animate({"left": "50%"})
	document.getElementById("box").style.transform = "translateX(0%)"

	var myHeaders = new Headers();
	myHeaders.append("Cookie", "_abck=1A804339439688BFA7F945E0ECB43B1C~-1~YAAQlmvcF2kgCD6LAQAA3s9lTgruCuYM3a7ft1GaS4ypsdwqbfkVb5FNB128ohJGkVakGYCnk05/UHr0e6B24LclRiKiidomtYRQmzNsaAjeMiDTgGQpOuYfgrMHsTXQ04cjdTe6bdv2+Lklp4tzI8MNO7XTuXQxTs07/tmdHTHwDCz2+UVchucu33v1607c34asszySSNpd0dQMtA8t6eH0sBwR4l7UssnmWupN+Irm/tzbpGV/MCt/1osI7UCDXNPLX/jxxpr02tLqSdKTJf4GnyfrQb+j1OfYsn+DJ/fxicckIoLI1qEesEuxXEh0U9sueAPkYaLlCYZjOscBUD5JrLnVPiGvzyoPhd1y0zV4IeDkIUvnAc4=~-1~-1~-1; bm_sz=7863E7CB0EA33FA59291FBFC06F1622F~YAAQlmvcF2ogCD6LAQAA3s9lThUpmclQa41VsoD1zLGaD3oLW4o7Q4yWdINTyIkfTSG0PAG78vCUBwi7yGIOg81gKgkZIW9l8z35RXYCiNFoHSvGbtXNIF5UPfqDjy5ygyq3c1GoZC8deXYzxEwRp2FtBVLqiokm2gfkS7z3dg9r0YHh2g/XJCzUDM4IY14iWkX//ehzwC+Xv+75dq0ICc8D/Fly4Cr+d8cnlZHeOPmoKlZZa07QA80cdXqG7LRYTeyQwiZwiqdrGQhl0uQlfuXsw4KINnFyaFc0r3VLPtckr2g=~4404791~4273465; dzr_uniq_id=dzr_uniq_id_frff6abf7863783f0d8d5b0add0464f7c42b5303");

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};


	fetch(url, requestOptions)

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