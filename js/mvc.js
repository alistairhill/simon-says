window.onload = function() {
  var view = new View()
  var game = new Game()
  var controller = new Controller(view, game)
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
}

View.prototype = {
  getAudio: function(){
    this.tile1 = new Audio("sounds/tile1.mp3")
    this.tile2 = new Audio("sounds/tile2.mp3")
    this.tile3 = new Audio("sounds/tile3.mp3")
    this.tile4 = new Audio("sounds/tile4.mp3")
  },
  getStartButton: function(){
    return document.querySelector(this.startButton)
  },
  getTiles: function(){
    console.log("getting tiles")
    return document.querySelectorAll(this.tile1, this.tile2, this.tile3, this.tile4)
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
    strBut.addEventListener('click', this.playTile.bind(this))
  },
  playTile: function(){
    var play = this.game.playTiles(this.view.tile4)

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
  playTiles: function(tile){
     document.querySelector(tile).style.backgroundColor += "#444"

  }
}