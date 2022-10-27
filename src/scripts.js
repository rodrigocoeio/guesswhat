window.shuffleArray = function (array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

window.playAudio = (audio_name, extension = "mp3") => {
  var audio = new Audio("/audios/" + audio_name + "." + extension);
  audio.play();
  return audio;
};
