//variables

let songIndex = 0;
let masterPLay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById('songInfo');
let songs = [
    {songName: "Little Bit More", filePath: "songs/song1.mp3", coverPath: "cover/cover1.jpg"},
    {songName: "Bachna Ae Haseeno", filePath: "songs/song2.mp3", coverPath: "cover/cover2.jpg"},
    {songName: "Tum Mile", filePath: "songs/song3.mp3", coverPath: "cover/cover3.jpg"},
    {songName: "Abhi Na Jao Chhod Kr", filePath: "songs/song4.mp3", coverPath: "cover/cover4.jpg"},
    {songName: "Wavy", filePath: "songs/song5.mp3", coverPath: "cover/cover5.jpg"},
]
songItems.forEach((element,i)=>{
    console.log(element,i)
       element.getElementsByTagName("img")[0].src = songs[i].coverPath;
       element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}

)
let audioElement = new Audio('songs/song1.mp3');
//play/pause by MasterClick
masterPLay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPLay.classList.remove("fa-circle-play");
        masterPLay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPLay.classList.remove("fa-circle-pause");
        masterPLay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    ProgressBar.value = progress;
})
ProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (ProgressBar.value*audioElement.duration/100);
})
const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
 Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays(); 
        songIndex = parseInt(e.target.id)
        songInfo.innerText=songs[songIndex-1].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src =  `songs/song${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    })
 })
 document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
        songIndex -= 1;
    }
      audioElement.src =  `songs/song${songIndex}.mp3`;
      songInfo.innerText=songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
 })
  document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>5){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
      audioElement.src =  `songs/song${songIndex}.mp3`;
      songInfo.innerText=songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
 })