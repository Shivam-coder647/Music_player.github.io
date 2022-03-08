const main_div = document.querySelector(".main_div");
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const music = document.querySelector("audio");
const img = document.querySelector("img");
const progress_div = document.getElementById("progress_div");
let progress = document.getElementById("progress");
let tot_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const musiclist = document.querySelector(".music_list");
const moreMusicbtn = document.querySelector("#more-music");
const closemoreMusic = document.querySelector("#close");

const songs =[
{
	name:"1",
	title:"RAATEIN LAMBIYAAN",
	artist:"jubin nautiyal",
},

{
   name:"2",
	title:"Akele Hum Akele Tum",
	artist:"Udit Narayan",
},

{
   name:"3",
	title:"All Black",
	artist:"Raftaar",
},
{
	name:"4",
	title:"Suno na Sungemarmar",
	artist:"Arijit Singh",
},
{
	name:"5",
	title:"Subhanallah",
	artist:"ShreeRam",
},
{
	name:"6",
	title:"Soch na Sake",
	artist:"Arijit Singh",
},
{
	name:"7",
	title:"Sooraj Dhuba h",
	artist:"Arijit Singh",
},
{
	name:"8",
	title:"Malamaal",
	artist:"Mika Singh",
},
{
	name:"9",
	title:"Jeena Jeena",
	artist:"Atif Aslam",
},
{
	name:"10",
	title:"Jee Karda",
	artist:"G khan",
},
{
	name:"11",
	title:"Hasi ban gye",
	artist:"Ami Mishra",
},
{
	name:"12",
	title:"Gerua",
	artist:"Arijit Singh",
},
{
	name:"13",
	title:"Gal ban gyi",
	artist:"Meet Bros",
},
{
	name:"14",
	title:"Bapu Zamindar",
	artist:"Jassie Gill",
},
]
let isPlaying = false;
// for playing song
const playMusic  =() => {
	music.play();
	isPlaying = true;
	play.classList.replace("fa-circle-play","fa-circle-pause");
	img.classList.add("anime");
};
// for pausing song
const pauseMusic = () => {
	music.pause();
	isPlaying = false;
	play.classList.replace("fa-circle-pause","fa-circle-play");
	img.classList.remove("anime");
};

play.addEventListener("click", () => {
	if (isPlaying) {
		pauseMusic();
	}
	else{
		playMusic();
	}
})

//changing song data

const loadSong = (songs) =>{
  title.textContent = songs.title;
  artist.textContent = songs.artist;
 music.src =  songs.name + ".mpeg";
 img.src = songs.name + ".jpg";
};


let songIndex = Math.floor((Math.random() * songs.length) + 1);;
loadSong(songs[songIndex]);
const nextSong = () =>{
	songIndex = (songIndex + 1) % songs.length;
loadSong(songs[songIndex]);
playMusic();
};

const prevSong = () =>{
	songIndex = (songIndex - 1 + songs.length) % songs.length;
loadSong(songs[songIndex]);
playMusic();
};

//progress js work
music.addEventListener('timeupdate',(event) => {
	const {currentTime,  duration} = event.srcElement;
  let progress_time = (currentTime / duration * 100);
  progress.style.width = `${progress_time}%`;

  //music duration update
let minute_duration = Math.floor(duration / 60);
let sec_duration = Math.floor(duration % 60);
let total_duration = `${minute_duration}: ${sec_duration}`;
if (duration) {
	tot_duration.textContent = `${total_duration}`;
}



//current  duration update
let minute_current_time = Math.floor(currentTime / 60);
let sec_current_time = Math.floor(currentTime % 60);
var total_current_time = `${minute_current_time}: ${sec_current_time}`;

current_time.textContent = `${total_current_time}`;

});
progress_div.addEventListener('click', (event) => {
	const {duration} = music;
let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
console.log(move_progress);
music.currentTime = move_progress;

});


// function to play nextsong if currentsong ends
music.addEventListener("ended", nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click',prevSong);

//show music list onclick of music icon

 moreMusicbtn.addEventListener('click', () =>{
  musiclist.classList.toggle("show");
});

 closemoreMusic.addEventListener("click", ()=>{
  moreMusicbtn.click();
});

 const ulTag = main_div.querySelector("ul");

 for (let i = 0; i < songs.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}" id="list">
                <div class="row">
                  <span>${songs[i].title}</span>
                  <p>${songs[i].artist}</p>
                </div>
                <span id="${songs[i]}.src" class="audio-duration"></span>
                <audio class="${songs[i].src}" src="${songs[i + 1]}.mp3"></audio>
              </li>`;

        ulTag.insertAdjacentHTML("beforeend", liTag);
         let liAudioDuartionTag = ulTag.querySelector(`#${songs[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${songs[i+1].src}`);

  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}
  //playing particular song when clicked

 