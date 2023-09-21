const beepAudio = document.getElementById("beepAudio");
const TARGET_ITI = 600;
var metronome_should_be_live = false;
var toggle_button = document.getElementById("toggle_button")

// Function to play the beep sound
function playBeepSound() {
  beepAudio.currentTime = 0; // Reset the audio to the beginning
  beepAudio.play();
}

// Function to set or clear metronome.
function playMetronome() {
  var interval_player;
  return {
    start() {
      interval_player = setInterval(playBeepSound, TARGET_ITI)
    },
    stop() {
      clearInterval(interval_player)
    }
  }
}

// Declaration of object containing metronome.
var metronome_player = playMetronome()

// Monitor for toggle button press
toggle_button.addEventListener("click", function() {
    if (metronome_should_be_live) {
      metronome_player.stop();
      metronome_should_be_live = false;
    } else {
      metronome_player.start();
      metronome_should_be_live = true;
    }
});

// Function to be executed when the section is in the viewport
function onSectionInView(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // The section is now visible on the screen, put actions here
      if (metronome_should_be_live==false)  {
        metronome_player.start()
        metronome_should_be_live = true;
      }
    } else {
      // The section is not visible on the screen
      metronome_player.stop()
      metronome_should_be_live = false;
    }
  });
}

// Options for the Intersection Observer
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.5, // The section will be considered in view when 50% or more is visible
};

// Create a new Intersection Observer
const observer = new IntersectionObserver(onSectionInView, options);
const observer2 = new IntersectionObserver(onSectionInView, options);
const observer3 = new IntersectionObserver(onSectionInView, options);

// Observe the training section
const targetSection = document.querySelector('#training');
observer.observe(targetSection);

// Observe the training-2 section
const targetSection2 = document.querySelector('#training2');
observer2.observe(targetSection2);

// Observe the training-3 section
const targetSection3 = document.querySelector('#training3');
observer3.observe(targetSection3);