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
    return document.querySelector(this.tileContainer)
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
    tile1 = document.querySelector(this.view.tile1),
    tile2 = document.querySelector(this.view.tile2),
    tile3 = document.querySelector(this.view.tile3),
    tile4 = document.querySelector(this.view.tile4)
    strBut.addEventListener('click', this.simonTile.bind(this))
    tile1.addEventListener('click', this.playerTile.bind(this))
    tile2.addEventListener('click', this.playerTile.bind(this))
    tile3.addEventListener('click', this.playerTile.bind(this))
    tile4.addEventListener('click', this.playerTile.bind(this))
  },
  simonTile: function(){
    var rand = this.game.randTile()
    this.game.simonsTiles.push(this.view.getTiles().children[rand])
    console.log(this.game.simonsTiles)
  },
  playerTile: function(tile){
    this.game.playTiles(tile.target, this.view[tile.target.className+"Snd"])
    this.game.playerTiles.push(tile.target)
    console.log(this.game.playerTiles)
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
  compareTiles: function(){
    console.log(this.simonsTiles == this.playerTiles)
  }
}