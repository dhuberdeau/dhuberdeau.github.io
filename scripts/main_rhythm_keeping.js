// const myHeading = document.querySelector("h1");
// myHeading.textContent = "Interior Design Page..";

function diffArray(arr) {
    var diffs = []
    if (arr.length < 2){
        diffs.push(0);
    } else {
        for (var i = 0; i < arr.length-1; i++){
            diffs.push(arr[i+1] - arr[i]);
        }
    }
    return diffs;
}

let randomNumber = Math.floor(Math.random() * 100) + 1;

let tap_length_training = 3;
const timeOut = 60000; //milliseconds to run experiment.
const TAPS_TO_DISPLAY = tap_length_training*4;
// const TARGET_ITI = 600;

// Get the canvas element and context
const canvas = document.getElementById("tapTime-chart");
const ctx = canvas.getContext("2d");

// Set up the initial tap data example to dispaly
let tapTimes = [];
let vect_seed = 0;
let vect_iteration = .6;
let vect = []
for (let c_ = 0; c_ < TAPS_TO_DISPLAY; c_++){
  if (c_ % tap_length_training !== 0) {
    vect.push({x: vect_seed + c_*vect_iteration, y: 0});
  }
}
let chart_display_row = 0;

// Create the chart, using initial tap data
var chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Tap times",
          data: vect,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
        }
      ],
    },
    options: {
      scales: {
        x: {type: 'linear',
          position: 'bottom',
          title: {display: true, text: 'Time (sec)'},
          min: 0,
          max: Math.ceil(TAPS_TO_DISPLAY*TARGET_ITI/1000)},
        y: {
          display: false,
          title: {display: false, text: 'Inter tap interval'},
          min: chart_display_row - 2,
          max: chart_display_row + 2
        }
      },
      plugins: {
            legend: {
                display: false // Hide legend (dataset label)
            }
        }
    }
});

chart_display_row = chart_display_row - 1;
let data_vect = [];
let tapTimes_rel = [];
let startTime = new Date().getTime();
let data_set_ind = 0;
let first_tap = true;
document.onkeydown = function(event){
    if (event.code === "KeyB"){
      if (first_tap) {
        startTime_rel = new Date().getTime();
        first_tap = false;
      }

      var timestamp = new Date().getTime();
      tapTimes.push(timestamp);
      tapTimes_rel.push((timestamp - startTime_rel)/1000);
      data_vect.push(
        {x: (timestamp - startTime_rel)/1000,
        y: chart_display_row}
      );

      // Update the data in the chart:
      // data_vect.push(tapTimes_rel)
      // chart.data.datasets[0].data = data_vect;
      chart.data.datasets.push(
        {
          label: "Tap times",
          data: data_vect,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
        }
      )
      chart.update()

      // after data is updated, check if new row is needed:
      if (tapTimes_rel.length >= TAPS_TO_DISPLAY) {
        data_vect = [];
        tapTimes_rel  = [];
        startTime_rel = new Date().getTime();
        chart_display_row = chart_display_row - 1;
        chart.options.scales.y.min = chart_display_row - 2;
        chart.options.scales.y.max = chart_display_row + 2;
        data_set_ind = data_set_ind+1;
      }
    }
}

// n-back task code: (n = 2)
// const n_back = 2;
// var num = 0;
// var sequence = [];
// var n_expected = 0;
// var grand_count = 0;
// var count_expected = [];
// function changeNumber() {
//     grand_count++;
//     num = Math.floor(Math.random()*10);
//     document.getElementById("n-back-number").innerHTML = num;
//     setTimeout(function (){
//         document.getElementById("n-back-number").innerHTML = '*';
//         }, 750)
//     sequence.push(num)
//     if (sequence.length > n_back) {
//         sequence.shift()
//     }
//     if (sequence[0]==num) {
//         n_expected = n_expected + 1;
//         count_expected.push(grand_count)
//     }
// }
// var timeoutid = setInterval(changeNumber, 1000);
//
// var n_identified = 0;
// var count_identified = [];
// function increment() {
//     n_identified++;
//     count_identified.push(grand_count)
// }

// Save an array to a local file:
function saveArrayToFile(array, filename){
    var array_to_save = new Blob([array.join(", ")],
     {type: "text/plain;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(array_to_save);
    link.download = filename;
    link.click();
}

function showContent() {
    var select = document.getElementById("T1-selection");
    var option = select.value;
    var num_gam = document.getElementById("number-game");
    var n_back = document.getElementById("n-back-task");
    if (option == "number-game") {
        num_gam.style.display = "block";
        n_back.style.display = "none";
    } else if (option == "n-back-task") {
        num_gam.style.display = "none";
        n_back.style.display = "block";
    }
}

// setTimeout(function(){
//     clearTimeout(timeoutid);
//     alert('Terminate present experiment');
// }, timeOut)
setTimeout(function(){iti_array = diffArray(tapTimes)}, timeOut+500)
setTimeout(function(){saveArrayToFile(iti_array, 'ITI_array_data.txt')},
     timeOut+750)



// some work to try to get foot-pedal to work with map
// let var2 = [];
// const mapFrame = document.getElementById('map-frame');
// iframe_el = $('#map-frame')
// iframe_el.addEventListener("keydown", function(){var2.push(1);})
// mapFrame.contentWindow.document.addEventListener("keydown", function(event){
//     var2.push(event.key);
//     console.log('Pressed key: ' + event.key);
// })
