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
    var strBut = this.view.getStartButton(),
    tile1 = this.view.getTiles()[0],
    tile2 = this.view.getTiles()[1],
    tile3 = this.view.getTiles()[2],
    tile4 = this.view.getTiles()[3]
    console.log(this.view.getTiles())
    strBut.addEventListener('click', this.playTile.bind(this))

    tile1.addEventListener('click', this.playTile.bind(this))
    tile2.addEventListener('click', this.playTile.bind(this))
    tile3.addEventListener('click', this.playTile.bind(this))
    tile4.addEventListener('click', this.playTile.bind(this))
  },
  playTile: function(){
    var rand = this.game.randTile()
    this.game.playTiles(this.view["tile"+rand], this.view["tile"+rand+"Snd"])
  }
}

function Game(){
  this.simonsTiles = []
  this.playerTiles = []
}

Game.prototype = {
  randTile: function(){
    return this.randNum = (Math.floor(Math.random()*4)+1)
  },
  playTiles: function(tile, snd){
    document.querySelector(tile).style.opacity = "1"
    snd.play()
    this.timer(
      function(){
        document.querySelector(tile).style.opacity = ".8"
        snd.pause()
        snd.currentTime = 0
      },470
    )
  },
  timer: function(func, amount){
    var timeFunc = setTimeout(func, amount)
  },
  compareTiles: function(){
    console.log(this.simonsTiles == this.playerTiles)
  }
}