// TABLE FUNCTION
function myFunction() { //on click event
    var name = document.getElementById("item-to-add").value; //ชื่อสิ่งของ
    var type = document.getElementById("type-to-add").value; //ชื่อคน
    var timer = document.getElementById("time-to-add").value; //ชื่อสิ่งของ
    var table = document.getElementById("main-table").getElementsByTagName('tbody')[0];
  
    var button = document.createElement("button");
    button.innerHTML = "Remove";
    button.id = "add-newrow";
    // button.onclick = "deleteRow(this)";
    button.addEventListener ("click", function() {
        table.removeChild(row);
       });
  
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
  
    cell1.innerHTML = name;
    cell2.innerHTML = type;
    cell3.innerHTML = timer;
    cell4.appendChild(button);
  }
  
  function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }



// POMODORO
var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#reset').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
};



// SPEECH
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-EN'
recognition.continuous = true;
recognition.interimResults = true;

recognition.addEventListener('result', function(event){
    const text = Array.from(event.results)
    .map(result=>result[0])
    .map(result=>result.transcript)

    let last = text[Object.keys(text)[Object.keys(text).length - 1]];

    console.log(last);

    if (last == "work"){
        console.log(last);
        // console.log("0");
        document.querySelector('#work').click();
    }
    else if(last == "short break"){
        console.log(last);
        // console.log("1");
        document.querySelector('#shortBreak').click();
    }
    else if(last == "long break"){
        console.log(last);
        // console.log("2");
        document.querySelector('#longBreak').click();
    }
    else if(last == "reset"){
        console.log(last);
        // console.log("3");
        document.querySelector('#reset').click();
    }
});

recognition.start()



// FULLSCREEN
document.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {     // keyCode = 13 = Enter
      toggleFullScreen();
    }
  }, false);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
}