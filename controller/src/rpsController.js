const Round = require("./Round")

function RPSController(){
    this.play = function(p1, p2, view, roundRepo){
        new rules(p1, p2, view, roundRepo).execute()
    }

    this.history = function(view, roundRepo){
        if (roundRepo.isEmpty()){
            view.noHistory()
        } else {
            view.history(roundRepo.getAll())
        }
    }
}

function rules(p1Throw, p2Throw, view, roundRepo){
    this.execute = function(){
        if (areThrowsInvalid()){
            handleInvalid()
        } else if (tie() ){
            handleTie()
        } else if (p1Wins()){
            handleWinner("p1")
        } else {
            handleWinner("p2")
        }
    }

    const validThrows = ["rock", "paper", "scissors"]

    function invalid(playerThrow) {
        return !validThrows.includes(playerThrow)
    }

    function areThrowsInvalid() {
        return invalid(p1Throw) || invalid(p2Throw)
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return p1Throw === "paper" && p2Throw === "rock" ||
            p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper"
    }

    function handleInvalid() {
        roundRepo.save(new Round(p1Throw, p2Throw, "invalid"))
        view.invalid()
    }

    function handleTie() {
        roundRepo.save(new Round(p1Throw, p2Throw, "tie"))
        view.tie()
    }

    function handleWinner(winner) {
        roundRepo.save(new Round(p1Throw, p2Throw, winner))
        view.winner(winner)
    }
}

module.exports = {
    RPSController
}