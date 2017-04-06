const Round = require("./Round")

function RPS(){
    this.play = function(p1, p2, ui, roundRepo){
        new PlayUseCase(p1, p2, ui, roundRepo).execute()
    }

    this.history = function(ui, roundRepo){
        if (roundRepo.isEmpty()){
            ui.noHistory()
        } else {
            ui.history(roundRepo.getAll())
        }
    }
}

function PlayUseCase(p1, p2, ui, roundRepo){
    this.execute = function(){
        if (inputInvalid()){
            handleInvalid()
        } else if (tie() ){
            handleTie()
        } else if (p1Wins()){
            handleWinner("p1")
        } else {
            handleWinner("p2")
        }
    }

    const validInput = ["rock", "paper", "scissors"]

    function invalid(playerThrow) {
        return !validInput.includes(playerThrow)
    }

    function inputInvalid() {
        return invalid(p1) || invalid(p2)
    }

    function tie() {
        return p1 === p2
    }

    function p1Wins() {
        return p1 === "paper" && p2 === "rock" ||
            p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper"
    }

    function handleInvalid() {
        roundRepo.save(new Round(p1, p2, "invalid"))
        ui.invalid()
    }

    function handleTie() {
        roundRepo.save(new Round(p1, p2, "tie"))
        ui.tie()
    }

    function handleWinner(winner) {
        roundRepo.save(new Round(p1, p2, winner))
        ui.winner(winner)
    }
}

module.exports = {
    RPS,
    Round
}