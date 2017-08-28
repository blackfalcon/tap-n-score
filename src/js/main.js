// Create the Ball Game function
function theBallGame() {

  var score = 0;
  var points = 0;
  var ballList = ["soccer", "basket", "tennis"];
  var velocity = 10000;
  var interval = null;


  // Build random() function
  function random(min, max){
    return Math.round(Math.random() * (max-min) + min);
  }

  // animation function
  function titleToggle(selector, delay) {
    // test condition for hidden selector on ALL DOM elements
    var test = $('.titles__container').children().length == $('.titles__container').children('.hidden').length;

    // create animation run function
    function runAnimation() {
      $(selector).removeClass('hidden').delay(delay).queue(function(){
        var _this = $(this);

        _this.addClass('animated' + ' ' + 'zoomOut').dequeue();
        setTimeout(function(){
          _this.removeClass('animated' + ' ' + 'zoomOut').addClass('hidden').dequeue();
        }, delay);
      });
    }

    // if true, run animation
    if(test) {
      runAnimation();
    }
  }

  // adjust speed of falling balls
  $("#speed-bar").on("change", function() {
    var speedSetting = this.value;

    // reverse value of slider input for speed math
    if (speedSetting == 10) {
      var speedValue = 1;
    } else if (speedSetting == 9) {
      var speedValue = 2;
    } else if (speedSetting == 8) {
      var speedValue = 3;
    } else if (speedSetting == 7) {
      var speedValue = 4;
    } else if (speedSetting == 6) {
      var speedValue = 5;
    } else if (speedSetting == 5) {
      var speedValue = 6;
    } else if (speedSetting == 4) {
      var speedValue = 7;
    } else if (speedSetting == 3) {
      var speedValue = 8;
    } else if (speedSetting == 2) {
      var speedValue = 9;
    } else if (speedSetting == 1) {
      var speedValue = 10;
    }

    // set value to velocity var
    velocity = (speedValue * 2000);

    // update UI with alert and speed setting
    $('.game-speed').html(speedSetting);
    titleToggle('.change-speed', 500);
  });

  // Create game
  function ballGame(){

    // set random left position of elements
    var position = random(50, ($('.game-board').width() - 100));
    // set random sizes of elements
    var size = random(10, 100);

    // create points value based on ball size
    if (size == 10) {
      points = 10
    } else if (size >= 11 && size <= 20) {
      points = 9
    } else if (size >= 21 && size <= 30) {
      points = 8
    } else if (size >= 31 && size <= 40) {
      points = 7
    } else if (size >= 41 && size <= 50) {
      points = 6
    } else if (size >= 51 && size <= 60) {
      points = 5
    } else if (size >= 61 && size <= 70) {
      points = 4
    } else if (size >= 71 && size <= 80) {
      points = 3
    } else if (size >= 81 && size <= 90) {
      points = 2
    } else if (size >= 91 && size <= 100) {
      points = 1
    }

    // set random value to ball var based on ballList array
    var ball = ballList[Math.floor(Math.random() * ballList.length)];

    // create DOM element for game
    var gameBox = $('<div/>', {
      class: 'target',
      style:  'width:' + size + 'px; height:' + size + 'px; left:' + position + 'px; transition: transform ' + velocity + 'ms linear;',
      'data-points': points
    });

    // insert DOM element
    $('.game-board').append(gameBox);

    // random start for animation
    setTimeout(function(){
      gameBox.addClass('falling' + ' ' + ball);
    }, random(0, 5000) );

  }

  // loop game interval
  function startGame() {

    var i = 0;

    // loop 5x for initial start for the game
    for (i = 0; i < 5; i++) {
      ballGame();
    }

    // set repeating interval of two loops per second
    interval = setInterval(function(){
      for (i = 0; i < 2; i++) {
        ballGame();
      }
    }, 1000);
  }

  // clear falling balls interval loop
  function endGame() {
    clearInterval(interval);
    $('.target').addClass('stop-drop');
  }

  // start / stop game button click events
  $('#game-toggle').on('click', function(){
    var _this = $(this);

    if((_this.data('state') == 'off')) {
      _this.text('Pause').data('state', 'on');
      titleToggle('.start-game', 2000);
      startGame();

    } else if((_this.data('state') == 'on')) {
      _this.data('state', 'off').text('Start');
      titleToggle('.pause-game', 500);
      endGame();
    }
  });

  // Bind click event; update score and animate ball drop from view
  $(document).on('touchstart click', '.target', function(){
    _this = $(this);
    score = score + points;

    $(".my-score").html(score);
    _this.addClass('pop');
  });
}


// Initiate the Gall Game function
theBallGame();
