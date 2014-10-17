window.onload = function() {
  var view = new View(),
  game = new Game(),
  controller = new Controller(view, game)
  controller.bindListeners()
}

function View(){
  this.tileContainer = ".tile-container"
  this.startButton = ".start-button"
  this.tile1 = ".tile1"
  this.tile2 = ".tile2"
  this.tile3 = ".tile3"
  this.tile4 = ".tile4"
  this.round = ".round"
  this.tile1Snd = new Audio("sounds/tile1.mp3")
  this.tile2Snd = new Audio("sounds/tile2.mp3")
  this.tile3Snd = new Audio("sounds/tile3.mp3")
  this.tile4Snd = new Audio("sounds/tile4.mp3")
}

View.prototype = {
  getStartButton: function(){
    return document.querySelector(this.startButton)
  },
  getTiles: function(){
    return document.querySelectorAll(this.tileContainer)
  },
  getRound: function(){
    return document.querySelector(this.round)
  }
}

function Controller(view, game) {
  this.view = view
  this.game = game
}

Controller.prototype = {
  bindListeners: function(){
    var strBut = this.view.getStartButton()
    this.userSays = this.playerTile.bind(this)
    this.tileListeners("addEventListener")
    strBut.addEventListener('click', function(){this.nextRound(); this.game.over(); this.resetRoundNum()}.bind(this))
  },
  tileListeners: function(listenerType) {
    for (var i = 0; i<this.view.getTiles()[0].children.length ; i++){
      this.view.getTiles()[0].children[i][listenerType]('click', this.userSays)
    }
  },
  resetRoundNum: function(){
    this.view.getRound().innerHTML=0
  },
  changeMouse: function(pointer){
    this.tileListeners("addEventListener")
    this.view.getTiles()[0].style.cursor = pointer
  },
  simonSays: function(){
    this.changeMouse("default")
    var currTile = 0,
    siArray = this.game.simonsTiles,
    that = this
    function advanceTiles(){
      that.game.playTiles(siArray[currTile], that.view[siArray[currTile].className+"Snd"])
      currTile++
      if (currTile >= siArray.length){
        that.changeMouse("pointer")
        clearInterval(timeBetweenSimonTiles)
        currTile = 0
      }
    }
    var timeBetweenSimonTiles = setInterval(advanceTiles, 500)
  },
  nextRound: function(){
    this.game.playerTiles = []
    var that = this,
    roundNum = this.game.simonsTiles.length+1
    setTimeout(function(){
      that.view.getTiles()[0].style.pointerEvents = "all"
      that.view.getRound().innerHTML=parseInt(roundNum).toString()
      var rand = that.game.randTile(),
      randTile = that.view.getTiles()[0].children[rand]
      that.game.simonsTiles.push(randTile)
      that.simonSays()
      that.tileListeners("removeEventListener")
    }, 500)
  },
  playerTile: function(tile){
    var that = this
    this.game.playTiles(tile.target, this.view[tile.target.className+"Snd"])
    this.game.playerTiles.push(tile.target)
    compareTiles()
    function compareTiles(){
      for(var i = 0, x = that.game.playerTiles.length; i<x; i++){
        if (that.game.playerTiles[i] != that.game.simonsTiles[i]){
          that.resetRoundNum()
          that.game.over()
          that.changeMouse("default")
          that.tileListeners("removeEventListener")
        } else if (i >= that.game.simonsTiles.length-1) {
          currTile = 0
          that.nextRound()
        }
      }
    }
  }
}

function Game(){
  this.simonsTiles = []
  this.playerTiles = []
}

Game.prototype = {
  randTile: function(){
    return this.randNum = (Math.floor(Math.random()*4))
  },
  playTiles: function(tile, snd){
    tile.style.opacity = "1"
    snd.play()
    this.timer(
      function(){
        tile.style.opacity = ".8"
        snd.pause()
        snd.currentTime = 0
      },470
    )
  },
  timer: function(func, amount){
    var timeFunc = setTimeout(func, amount)
  },
  over: function(){
    console.log("Game Over!")
    this.simonsTiles = []
    this.playerTiles = []
  }
}