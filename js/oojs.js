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
    container: $(".container"),
    startButton: $(".start-button"),
    roundNum: $(".round"),
    tileArray: [$(".tile1"), $(".tile2"), $(".tile3"), $(".tile4")]
  }

  var sound = {
    tile1: new Audio('sounds/tile1.mp3'),
    tile2: new Audio('sounds/tile2.mp3'),
    tile3: new Audio('sounds/tile3.mp3'),
    tile4: new Audio('sounds/tile4.mp3')
  }

  var getNewRandomTile = {
    rand: function(){return Math.floor(Math.random()*4)+0},
    num: function(){return domObj.tileArray[this.rand()]}
  }

  var updateText = {
    rounds: function(num){
      domObj.roundNum.text(parseInt(num).toString())
    }
  }

  var tileSequence = {
    array: []
  }

  var playTile = {
    change: function(tile, origColor, lightColor, soundName){
      $(tile).css("background-color", lightColor)
      this.darken(tile, origColor)
      this.audio(soundName)
    },
    darken: function(tile, origColor) {
      setTimeout(function(){$(tile).css("background-color", origColor)}, 400)
    },
    audio: function (soundName){
      sound[soundName].play()
      setTimeout(function(){
        sound[soundName].pause()
        sound[soundName].currentTime = 0
      },470)
    }
  }

  var simonSays = {
    doThis: function(arr) {
      var currTile = 0
      t1 = domObj.tileArray[0],
      t2 = domObj.tileArray[1],
      t3 = domObj.tileArray[2],
      t4 = domObj.tileArray[3]
      chgMouse.toggleType("auto")
      chgMouse.unplayable()
      $(domObj.container).css("pointer-events", "none")

      function advanceTiles(){
        switch(arr[currTile]){
          case t1: playTile.change(t1, "#E5E500", "#FFFF00", "tile1")
          break
          case t2: playTile.change(t2, "#CD2626", "#FF3030", "tile2")
          break
          case t3: playTile.change(t3, "#9ACD32", "#B3EE3A", "tile3")
          break
          case t4: playTile.change(t4, "#1874CD", "#1E90FF", "tile4")
          break
        }
        currTile++
        if (currTile >= arr.length) {
          clearInterval(tileInterval)
          currTile = 0
          chgMouse.toggleType("pointer")
          $(domObj.container).css("pointer-events", "all")
        }
      }
      var tileInterval = setInterval(advanceTiles, 500)
    }
  }

  var chgMouse = {
    toggleType: function(type){
      var tileSet = domObj.tileArray
      for (var i = 0, x = domObj.tileArray.length; i < x; i++) {
        $(tileSet[i]).css("cursor", type)
      }
    },
    unplayable: function(){
      var tileSet = domObj.tileArray
      for (var i = 0, x = domObj.tileArray.length; i < x; i++ ) {
        tileSet[i].unbind()
      }
    }
  }

  var gameOver = {
    rst: function() {
      $(domObj.container).css("pointer-events", "none")
      $(domObj.startButton).css("pointer-events", "all")
      tileSequence.array = []
      updateText.rounds(0)
      chgMouse.toggleType("auto")
      chgMouse.unplayable()
    }
  }

  var userSays = {
    tile: function(num){
      var usrArr = [],
          currTile = 0,
          t1 = domObj.tileArray[0],
          t2 = domObj.tileArray[1],
          t3 = domObj.tileArray[2],
          t4 = domObj.tileArray[3]
      chgMouse.toggleType("auto")
      function match() {
        if (usrArr[currTile][0] != tileSequence.array[currTile][0]){
          currTile = 0
          gameOver.rst()
        } else if (currTile >= tileSequence.array.length-1) {
          currTile = 0
          nextRound.go(num)
        } else {
          currTile++
        }
      }
      $(t1).click(function(){
        playTile.change(t1, "#E5E500", "#FFFF00", "tile1")
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
    go: function(num) {
      setTimeout(function(){
        num ++
        updateText.rounds(num)
        tileSequence.array.push(getNewRandomTile.num())
        simonSays.doThis(tileSequence.array)
        userSays.tile(num)
      }, 1000)
    }
  }

  var startGame = {
    clickStart: domObj.startButton.click(function(event){
      gameOver.rst()
      nextRound.go(0)
    })
  }
})