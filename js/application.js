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

  var domObj = {
    startButton: $(".start-button"),
    roundNum: $(".round-num"),
    tile1: $(".t-left"),
    tile2: $(".t-right"),
    tile3: $(".b-left"),
    tile4: $(".b-right")
  }

  var tiles = {
    array: [domObj.tile1, domObj.tile2, domObj.tile3, domObj.tile4]
  }

  var sound = {
    tile1: new Audio('sounds/tile1.mp3'),
    tile2: new Audio('sounds/tile2.mp3'),
    tile3: new Audio('sounds/tile3.mp3'),
    tile4: new Audio('sounds/tile4.mp3')
  }

  var getNewRandomTile = {
    rand: function(){return Math.floor(Math.random()*4)+0},
    num: function(){return tiles.array[this.rand()]}
  }

  var updateRoundText = {
    zero: function() {domObj.roundNum.text("0")},
    subseq: function(){domObj.roundNum.text(parseInt(+1).toString())}
  }

  var tileSequence = {
    array: []
  }

  var playTile = {
    change: function(tile, origColor, lightColor, soundNum){
      $(tile).css("background-color", lightColor)
      this.darken(tile, origColor)
      this.audio(soundNum)
    },
    darken: function(tile, origColor) {
      setTimeout(function(){$(tile).css("background-color", origColor)}, 400)
    },
    audio: function(soundNum){sound[soundNum].play()}
  }

  var playTiles = {
    go: function(arr) {
      var currTile = 0
      function advanceTiles(){
        if (arr[currTile] == domObj.tile1) {
          console.log("tile1 lighten")
          playTile.change(domObj.tile1, "#EEE685", "#FFF68F", "tile1")
        } else if (arr[currTile] == domObj.tile2) {
          console.log("tile2 lighten")
          playTile.change(domObj.tile2, "#CD2626", "#FF3030", "tile2")
        } else if (arr[currTile] == domObj.tile3) {
          console.log("tile3 lighten")
          playTile.change(domObj.tile3, "#9ACD32", "#B3EE3A", "tile3")
        } else if (arr[currTile] == domObj.tile4) {
          console.log("tile4 lighten")
          playTile.change(domObj.tile4, "#1874CD", "#1E90FF", "tile4")
        }
        currTile++
        if (currTile >= arr.length) {
          clearInterval(tileInterval)
          currTile = 0
        }
      }
      var tileInterval = setInterval(advanceTiles, 500)
    }
  }

  var chgMouse = {
    toggle: function(type){
      var arrLen = tiles.array.length-1
      for (var i = 0; i <= arrLen; i++) {
        $(tiles.array[i]).css("cursor", type)
      }
    },
    unplayable: function(){
      domObj.tile1.unbind()
      domObj.tile2.unbind()
      domObj.tile3.unbind()
      domObj.tile4.unbind()
    }
  }

  var gameOver = {
    rst: function() {
      usrArr = []
      tileSequence.array = []
      updateRoundText.zero()
      chgMouse.toggle("auto")
      chgMouse.unplayable()
      console.log("Game Over!")
    }
  }

  var userSel = {
    tile: function(){
      var usrArr = []
      var currTile = 0
      var t1 = domObj.tile1
      var t2 = domObj.tile2
      var t3 = domObj.tile3
      var t4 = domObj.tile4
      chgMouse.toggle("pointer")
      function match() {
        if (usrArr[currTile] == tileSequence.array[currTile]) {
          currTile++
          nextRound.go()
        } else {
          gameOver.rst()
        }
      }
      $(t1).click(function(){
        playTile.change(t1, "#EEE685", "#FFF68F", "tile1")
        usrArr.push(t1)
        match()
      })
      $(t2).click(function(){
        playTile.change(t2, "#CD2626", "#FF3030", "tile2")
        usrArr.push(t2)
        match()
      })
      $(t3).click(function(){
        playTile.change(t3, "#9ACD32", "#B3EE3A", "tile3")
        usrArr.push(t3)
        match()
      })
      $(t4).click(function(){
        playTile.change(t4, "#1874CD", "#1E90FF", "tile4")
        usrArr.push(t4)
        match()
      })
    }
  }

  var nextRound = {
    go: function() {
      tileSequence.array.push(getNewRandomTile.num())
      playTiles.go(tileSequence.array)
      updateRoundText.subseq()
      userSel.tile()
      console.log("got in here")
    }
  }

  var startGame = {
    clickStart: domObj.startButton.click(function(){
      tileSequence.array.push(getNewRandomTile.num())
      updateRoundText.subseq()
      playTiles.go(tileSequence.array)
      userSel.tile()
    })
  }
})