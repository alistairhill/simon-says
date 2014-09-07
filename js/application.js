/*
1. click on start button
2. game array is emptied and round is set to 0.
2. on first click round changes from 0 to 1
4. one second delay and a new random tile is selected:
  -tile ID is pushed into a game array
  -each tile in the current array is played w/ 250 delay in between
  -tile flashes ligher color and a sound is played simultaneously
5. user must now click on correct sequence of tiles
6. if user tile(s) selection matches current game array order, round iterates to next level and back to step 3. Else back to step 1.
*/

$(document).ready(function() {

  var getDOMStuff = {
    startButton: $(".start-button"),
    roundNum: $(".round-num"),
    tile1: $(".t-left"),
    tile2: $(".t-right"),
    tile3: $(".b-left"),
    tile4: $(".b-right")
  }

  var sound = {
    tile1: new Audio('sounds/tile1.mp3'),
    tile2: new Audio('sounds/tile2.mp3'),
    tile3: new Audio('sounds/tile3.mp3'),
    tile4: new Audio('sounds/tile4.mp3')
  }

  var tileArray = {
    tileSet: [getDOMStuff.tile1, getDOMStuff.tile2, getDOMStuff.tile3, getDOMStuff.tile4]
  }

  var getNewTile = {
    rand: function(){return Math.floor(Math.random()*4)+0},
    num: function(){return tileArray.tileSet[this.rand()]}
  }

  var updateRound = {
    first: function() {getDOMStuff.roundNum.text("1")}
  }

  var tileSequence = {
    array: []
  }

  var playTiles = {
    go: function(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[arr.length-1] == getDOMStuff.tile1) {
          console.log("tile1")
          sound.tile1.play();
        } else if (arr[arr.length-1] == getDOMStuff.tile2) {
          console.log("tile2")
          sound.tile2.play();
        } else if (arr[arr.length-1] == getDOMStuff.tile3) {
          console.log("tile3")
          sound.tile3.play();
        } else if (arr[arr.length-1] == getDOMStuff.tile4) {
          console.log("tile4")
          sound.tile4.play();
        }

        $(arr[i]).css("background-color", "yellow")
      }
    }
  }

  var startGame = {
    clickStart: getDOMStuff.startButton.click(function(){
      tileSequence.array.push(getNewTile.num())
      // console.log(tileSequence.array)
      // updateRound.first()
      playTiles.go(tileSequence.array)
    })
  }



})