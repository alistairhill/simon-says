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
  getStartButton: function(){
    console.log("getST")
    return document.querySelector(this.startButton)
  }
}

function Controller(view, game) {
  this.view = view
  this.game = game
  console.log("in controller")
}

Controller.prototype = {
  bindListeners: function(){
    var button = this.view.getStartButton()
    button.addEventListener('click', function(){console.log("test")})
  }
}

function Game(){}