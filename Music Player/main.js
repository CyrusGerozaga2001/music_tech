// Get references to HTML elements
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let getLyricsButton = document.querySelector(".get-lyrics-button");
let lyricsContainer = document.querySelector(".lyrics-container");
let lyricsElement = document.querySelector(".lyrics");
let getAlbumsButton = document.querySelector(".get-albums-button");
let albumsContainer = document.querySelector(".lyrics-container");
let albumsElement = document.querySelector(".other-albums");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "All Too Well(Taylor's Version)",
    artist: "Taylor Swift",
    image: "https://www.linkpicture.com/q/Album.png",
    path: "https://dl.sndup.net/hhj4/Taylor%20Swift%20-%20All%20to%20well%20(Lyrics).mp3"
  },

];

function random_bg_image() {
  // Array of background image URLs
  const backgroundImageUrls = [
    "url('https://images.pexels.com/photos/17483120/pexels-photo-17483120/free-photo-of-colorful-abstract-background-paper-composition.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    "url('https://images.pexels.com/photos/17483120/pexels-photo-17483120/free-photo-of-colorful-abstract-background-paper-composition.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    "url('https://images.pexels.com/photos/17483120/pexels-photo-17483120/free-photo-of-colorful-abstract-background-paper-composition.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    // Add more image URLs as needed
  ];

  // Get a random index to select a background image
  const randomIndex = Math.floor(Math.random() * backgroundImageUrls.length);

  // Set the background image based on the random index
  document.body.style.backgroundImage = backgroundImageUrls[randomIndex];
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_image();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (isPlaying) pauseTrack();
  else playTrack();
}
// When the music is playing
function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// When the music is paused
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = (curr_track.currentTime / curr_track.duration) * 100;

    // Set progress bar width and slider position
    seek_slider.style.backgroundSize = `${seekPosition}% 100%`;
    seek_slider.value = seekPosition;

    // Update current time and total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

getLyricsButton.addEventListener("click", function() {
  getLyrics();
});

function getLyrics() {
  // You can set the HTML content for the lyrics here.
  // For this example, let's use a simple HTML string.
  let lyricsHTML = `
    <div>
    I walked through the door with you, the air was cold 
    But something 'bout it felt like home somehow 
    And I left my scarf there at your sister's house 
    And you've still got it in your drawer even now
    
    Oh, your sweet disposition and my wide-eyed gaze
    We're singing in the car, getting lost Upstate
    Autumn leaves falling down like pieces into place
    And I can picture it after all these days
    
    And I know it's long gone
    And that magic's not here no more
    And I might be okay
    But I'm not fine at all
    
    'Cause there we are again on that little town street
    You almost ran the red 'cause you were looking over at me
    Wind in my hair, I was there, I remember it all too well
    
    Photo album on the counter, your cheeks were turning red
    You used to be a little kid with glasses in a twin-sized bed
    And your mother's telling stories 'bout you on a tee-ball team
    You tell me 'bout your past, thinking your future was me
    
    And I know it's long gone
    And there was nothing else I could do
    And I forget about you long enough
    To forget why I needed to
    
    'Cause there we are again in the middle of the night
    We're dancing 'round the kitchen in the refrigerator light
    Down the stairs, I was there, I remember it all too well, yeah
    
    Maybe we got lost in translation, maybe I asked for too much
    But maybe this thing was a masterpiece 'til you tore it all up
    Running scared, I was there, I remember it all too well
    
    And you call me up again just to break me like a promise
    So casually cruel in the name of being honest
    I'm a crumpled up piece of paper lying here
    'Cause I remember it all, all, all... too well
    
    Time won't fly, it's like I'm paralyzed by it
    I'd like to be my old self again, but I'm still trying to find it
    After plaid shirt days and nights when you made me your own
    Now you mail back my things and I walk home alone
    
    But you keep my old scarf from that very first week
    'Cause it reminds you of innocence and it smells like me
    You can't get rid of it 'cause you remember it all too well, yeah
    
    'Cause there we are again, when I loved you so
    Back before you lost the one real thing you've ever known
    It was rare, I was there, I remember it all too well
    
    Wind in my hair, you were there, you remember it all
    Down the stairs, you were there, you remember it all
    It was rare, I was there, I remember it all too well
    </div>
  `;

  // Set the HTML content in the "lyrics" element
  lyricsElement.innerHTML = lyricsHTML;

  // Make the lyrics container visible
  lyricsContainer.style.display = "block";
}

getAlbumsButton.addEventListener("click", function() {
  getAlbums();
});

// Function to display albums
function getAlbums() {
  // Create an array of album objects, each with a picture, name, and year
  let albums = [
    {
      picture: "https://th.bing.com/th/id/OIP.sNWPjPj8D5gjxyqaneooywHaEK?pid=ImgDet&rs=1",
      name: "Fearless(Taylor Version)",
      year: 2021
    },
    {
      picture: "https://th.bing.com/th/id/OIP.8E7jP4c6LPuxLdAsQ-HENAHaHa?pid=ImgDet&rs=1",
      name: "Folklore",
      year: 2020
    },
    {
      picture: "https://www.nme.com/wp-content/uploads/2022/08/taylor-swift-midnights-album.jpeg",
      name: "Midnights",
      year: 2022
    }
  ];

   // Generate HTML content for the albums
   let albumsHTML = '<div><h2></h2><ul class="album-list">';

   for (let album of albums) {
     albumsHTML += `
       <ul class="album-item">
         <img src="${album.picture}" alt="${album.name} Cover" width="450">
         <div class="album-info">
           <p>${album.name}</p>
           <p>Year: ${album.year}</p>
         </div>
       </ul>
     `;
   }
 
   albumsHTML += '</ul></div>';
 
   // Set the HTML content in the "other-albums" element
   albumsElement.innerHTML = albumsHTML;
 
   // Make the albums container visible
   albumsContainer.style.display = "block";
 }