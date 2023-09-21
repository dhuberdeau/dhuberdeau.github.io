
// Define function that computes the element-by-element difference:
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

// Define constants for the n-back task and tapping task:
let randomNumber = Math.floor(Math.random() * 100) + 1;
let n_back = null; // set this initially, but will get reset once selection is made
let beat_sequence = '';

let tap_length_training = 3;
const timeOut = 60000; //milliseconds to run experiment.
const TAPS_TO_DISPLAY = tap_length_training*4;
const MAX_CHART_X_LIM = 12;
// const TARGET_ITI = 600;

// Get the canvas element and context
const canvas = document.getElementById("tapTime-chart");
const ctx = canvas.getContext("2d");

// Get the canvas element and context
const canvas2 = document.getElementById("tapTime-chart2");
const ctx2 = canvas2.getContext("2d");

// Get the canvas element and context
const canvas3 = document.getElementById("tapTime-chart3");
const ctx3 = canvas3.getContext("2d");

// Define reset page button to re-load the page
var toggle_button = document.getElementById("reset_page")
toggle_button.addEventListener("click", function() {
  location.reload();
});

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
let current_x_limit = Math.ceil(TAPS_TO_DISPLAY*TARGET_ITI/1000);

let vect2 = []
let vect2_temp = [0.6, 1.2, 2.4, 3.6, 4.2, 5.4, 6.6, 7.2]
for (let c_ = 0; c_ < vect2_temp.length; c_++){
  vect2.push({x: vect2_temp[c_], y: 0});
}

let vect3 = []
let vect3_temp = [.6, 1.8, 2.4, 3.6, 6.0, 7.2, 7.8]
for (let c_ = 0; c_ < vect3_temp.length; c_++){
  vect3.push({x: vect3_temp[c_], y: 0});
}



// Create the first chart, using initial tap data
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
          max: current_x_limit},
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

// Create the second chart:
var chart2 = new Chart(ctx2, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Tap times",
          data: vect2,
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
          max: current_x_limit},
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

// Create the third chart:
var chart3 = new Chart(ctx3, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Tap times",
          data: vect3,
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
          max: current_x_limit},
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
        tap_time_offset = 600;
        chart.data.datasets.push(
          {
            label: "Tap times",
            data: data_vect,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          }
        )
        chart2.data.datasets.push(
          {
            label: "Tap times",
            data: data_vect,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          }
        )
        chart3.data.datasets.push(
          {
            label: "Tap times",
            data: data_vect,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          }
        )
        data_set_ind = data_set_ind + 1;
        setTimeout(function(){
          iti_array = diffArray(tapTimes);
          iti_array.push(null);
          iti_array.push(...count_expected);
          iti_array.push(null);
          iti_array.push(...count_identified);
          iti_array.push(null);
          iti_array.push(...raw_nback_numbers);
        }, timeOut+500)
        let file_save_name = 'ITI_array_nback_data_n' + n_back + '_' + beat_sequence
        setTimeout(function(){saveArrayToFile(iti_array, file_save_name + '.txt')},
             timeOut+750);
        // setTimeout(function(){saveArrayToFile(iti_array, 'ITI_array_data.txt')},
        //      timeOut+750)
        // setTimeout(function(){saveArrayToFile(count_expected, 'count_expected_data.txt')},
        //     timeOut+750)
        // setTimeout(function(){saveArrayToFile(count_identified, 'ITI_array_data.txt')},
        //      timeOut+750)
         var timeoutid = setInterval(changeNumber, 1000);
      }

      var timestamp = new Date().getTime() + tap_time_offset;
      tapTimes.push(timestamp);
      tapTimes_rel.push((timestamp - startTime_rel)/1000);
      data_vect.push(
        {x: (timestamp - startTime_rel)/1000,
        y: chart_display_row}
      );

      // Update the data in the chart:
      // data_vect.push(tapTimes_rel)
      chart.data.datasets[data_set_ind].data = data_vect;
      chart2.data.datasets[data_set_ind].data = data_vect;
      chart3.data.datasets[data_set_ind].data = data_vect;

      // update chart x-limit if necessary:
      let current_max_tap_time = Math.max(...tapTimes_rel);
      let make_new_chart_row = false;
      if (current_max_tap_time > current_x_limit) {
        if (current_max_tap_time <= MAX_CHART_X_LIM) {
          current_x_limit = Math.max(...tapTimes_rel);
          chart.options.scales.x.max = current_x_limit;
          chart2.options.scales.x.max = current_x_limit;
          chart3.options.scales.x.max = current_x_limit;
        } else {
          make_new_chart_row = true;
        }
      }
      chart.update()
      chart2.update()
      chart3.update()

      // after data is updated, check if new row is needed:
      if (tapTimes_rel.length >= TAPS_TO_DISPLAY ||
          make_new_chart_row) {
        tap_time_offset = 0;
        data_vect = [];
        tapTimes_rel  = [];
        startTime_rel = new Date().getTime();
        chart.data.datasets.push(
          {
            label: "Tap times",
            data: data_vect,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          }
        )
        chart2.data.datasets.push(
          {
            label: "Tap times",
            data: data_vect,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          }
        )
        chart3.data.datasets.push(
          {
            label: "Tap times",
            data: data_vect,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          }
        )
        chart_display_row = chart_display_row - 1;
        chart.options.scales.y.min = chart_display_row - 2;
        chart.options.scales.y.max = chart_display_row + 2;
        chart2.options.scales.y.min = chart_display_row - 2;
        chart2.options.scales.y.max = chart_display_row + 2;
        chart3.options.scales.y.min = chart_display_row - 2;
        chart3.options.scales.y.max = chart_display_row + 2;
        data_set_ind = data_set_ind+1;
      }
    }


}

// Save an array to a local file:
function saveArrayToFile(array, filename){
    var array_to_save = new Blob([array.join(", ")],
     {type: "text/plain;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(array_to_save);
    link.download = filename;
    link.click();
}

function specify_nback_level() {
    var select = document.getElementById("T1-selection");
    var option = select.value;
    var nback_display = document.getElementById("n-back-instructions");
    var nback_number = document.getElementById("n-back-number");
    if (option == "default") {
      nback_display.style.display = "none";
      nback_number.style.display = "none";
      n_back = 0;
    }
    if (option == "n1") {
      nback_display.style.display = "inline";
      nback_number.style.display = "block";
      nback_display.innerHTML = "<p>Pay attention to the numbers streaming below. When the same number is presented with a delay of 1, click the button below.</p>"
      n_back = 1;
    }
    if (option == "n2") {
      nback_display.style.display = "inline";
      nback_number.style.display = "block";
      nback_display.innerHTML = "<p>Pay attention to the numbers streaming below. When the same number is presented with a delay of 2, click the button below.</p>"
      n_back = 2;
    }
    if (option == "n3") {
      nback_display.style.display = "inline";
      nback_number.style.display = "block";
      nback_display.innerHTML = "<p>Pay attention to the numbers streaming below. When the same number is presented with a delay of 3, click the button below.</p>"
      n_back = 3;
    }
}

function specify_beat_sequence() {
    var select = document.getElementById("T2-selection");
    var option = select.value;
    var beat_display = document.getElementById("beat-sequence-display");
    if (option == "default") {
        beat_display.style.display = "none";
    }
    if (option == "length1") {
      beat_display.style.display = "inline";
      beat_display.innerHTML = "<h3>1</h3>";
      beat_sequence = beat_sequence + '1';
  }
    if (option == "length3") {
        beat_display.style.display = "inline";
        beat_display.innerHTML = "<h3>1 1 0</h3>";
        beat_sequence = beat_sequence + '110';
    }
    if (option == "length4") {
        var rand_num = Math.random();
        beat_display.style.display = "inline";
        beat_display.innerHTML = "<h3>1 1 0 0</h3>";
        beat_sequence = beat_sequence + '1100';
        // if (rand_num < .5) {
        //     beat_display.innerHTML = "<h3>1 1 0 0</h3>";
        // }
        // if (rand_num >= .5) {
        //     beat_display.innerHTML = "<h3>1 1 1 0</h3>";
        // }
    }
    if (option == "length5") {
        var rand_num = Math.random();
        beat_display.style.display = "inline";
        beat_display.innerHTML = "<h3>1 1 0 1 0</h3>";
        beat_sequence = beat_sequence + '11010';
        // if (rand_num < .25) {
        //     beat_display.innerHTML = "<h3>1 1 0 0 0</h3>";
        // }
        // if (rand_num >= .25 && rand_num < .5) {
        //     beat_display.innerHTML = "<h3>1 0 1 0 0</h3>";
        // }
        // if (rand_num >= .5 && rand_num < .75) {
        //     beat_display.innerHTML = "<h3>1 1 1 0 0</h3>";
        // }
        // if (rand_num >= .75) {
        //     beat_display.innerHTML = "<h3>1 1 0 1 0</h3>";
        // }
    }
    if (option == "length6") {
        var rand_num = Math.random();
        beat_display.style.display = "inline";
        beat_display.innerHTML = "<h3>1 1 1 0 1 0</h3>";
        beat_sequence = beat_sequence + '111010';
        // if (rand_num < .25) {
        //     beat_display.innerHTML = "<h3>1 1 1 0 0 0</h3>";
        // }
        // if (rand_num >= .25 && rand_num < .5) {
        //     beat_display.innerHTML = "<h3>1 1 0 1 0 0</h3>";
        // }
        // if (rand_num >= .5 && rand_num < .75) {
        //     beat_display.innerHTML = "<h3>1 1 1 0 1 0</h3>";
        // }
        // if (rand_num >= .75) {
        //     beat_display.innerHTML = "<h3>1 0 1 1 0 0</h3>";
        // }
    }
    if (option == "length7") {
        var rand_num = Math.random();
        beat_display.style.display = "inline";
        beat_display.innerHTML = "<h3>1 1 0 1 0 1 0</h3>";
        beat_sequence = beat_sequence + '1101010';
        // if (rand_num < .25) {
        //     beat_display.innerHTML = "<h3>1 1 0 1 0 0 0</h3>";
        // }
        // if (rand_num >= .25 && rand_num < .5) {
        //     beat_display.innerHTML = "<h3>1 0 1 1 0 0 0</h3>";
        // }
        // if (rand_num >= .5 && rand_num < .75) {
        //     beat_display.innerHTML = "<h3>1 0 1 0 1 0 0</h3>";
        // }
        // if (rand_num >= .75) {
        //     beat_display.innerHTML = "<h3>1 1 0 1 0 1 0</h3>";
        // }
    }
    if (option == "length8") {
      var rand_num = Math.random();
      beat_display.style.display = "inline";
      beat_display.innerHTML = "<h3>1 0 1 1 0 1 0 0</h3>";
      beat_sequence = beat_sequence + '10110100';
      // if (rand_num < .25) {
      //     beat_display.innerHTML = "<h3>1 1 0 1 0 0 0</h3>";
      // }
      // if (rand_num >= .25 && rand_num < .5) {
      //     beat_display.innerHTML = "<h3>1 0 1 1 0 0 0</h3>";
      // }
      // if (rand_num >= .5 && rand_num < .75) {
      //     beat_display.innerHTML = "<h3>1 0 1 0 1 0 0</h3>";
      // }
      // if (rand_num >= .75) {
      //     beat_display.innerHTML = "<h3>1 1 0 1 0 1 0</h3>";
      // }
    }
    if (option == "length9") {
      var rand_num = Math.random();
      beat_display.style.display = "inline";
      beat_display.innerHTML = "<h3>1 1 0 1 1 1 0 1 0</h3>";
      beat_sequence = beat_sequence + '110111010';
      // if (rand_num < .25) {
      //     beat_display.innerHTML = "<h3>1 1 0 1 0 0 0</h3>";
      // }
      // if (rand_num >= .25 && rand_num < .5) {
      //     beat_display.innerHTML = "<h3>1 0 1 1 0 0 0</h3>";
      // }
      // if (rand_num >= .5 && rand_num < .75) {
      //     beat_display.innerHTML = "<h3>1 0 1 0 1 0 0</h3>";
      // }
      // if (rand_num >= .75) {
      //     beat_display.innerHTML = "<h3>1 1 0 1 0 1 0</h3>";
      // }
  }
  if (option == "length10") {
    var rand_num = Math.random();
    beat_display.style.display = "inline";
    beat_display.innerHTML = "<h3>1 1 1 1 0 1 1 0 1 0</h3>";
    beat_sequence = beat_sequence + '1111011010';
    // if (rand_num < .25) {
    //     beat_display.innerHTML = "<h3>1 1 0 1 0 0 0</h3>";
    // }
    // if (rand_num >= .25 && rand_num < .5) {
    //     beat_display.innerHTML = "<h3>1 0 1 1 0 0 0</h3>";
    // }
    // if (rand_num >= .5 && rand_num < .75) {
    //     beat_display.innerHTML = "<h3>1 0 1 0 1 0 0</h3>";
    // }
    // if (rand_num >= .75) {
    //     beat_display.innerHTML = "<h3>1 1 0 1 0 1 0</h3>";
    // }
  }
}

// Do the n-back task:
var num = 0;
var sequence = [-1,-1,-1];
var n_expected = 0;
var grand_count = 0;
var count_expected = [];
var raw_nback_numbers = [];
function changeNumber() {
    grand_count++;
    num = Math.floor(Math.random()*10);
    raw_nback_numbers.push(num);
    document.getElementById("n-back-number").innerHTML = num;
    setTimeout(function (){
        document.getElementById("n-back-number").innerHTML = '*';
        }, 750)
    sequence.push(num)
    if (sequence.length > n_back+1) {
        sequence.shift()
    }
    if (sequence[0]==num) {
        n_expected = n_expected + 1;
        count_expected.push(grand_count)
    }
}

var n_identified = 0;
var count_identified = [];
function increment() {
    n_identified++;
    count_identified.push(grand_count)
}

