const { RPSController } = require("../src/rpsController")
const Round = require("../src/Round")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the UI no history", function () {
            const ui = jasmine.createSpyObj("ui", ["noHistory"])

            rps.history(ui, roundRepo)

            expect(ui.noHistory).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("sends the rounds to the UI", function () {
            const ui = jasmine.createSpyObj("ui", ["history", "winner", "tie", "invalid"])

            rps.play("rock", "paper", ui, roundRepo)
            rps.play("paper", "rock", ui, roundRepo)
            rps.play("paper", "paper", ui, roundRepo)
            rps.play("rock", "sailboat", ui, roundRepo)

            rps.history(ui, roundRepo)

            expect(ui.history).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2"),
                new Round("paper", "rock", "p1"),
                new Round("paper", "paper", "tie"),
                new Round("rock", "sailboat", "invalid"),
            ])
        })

    })

    let rps, roundRepo

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
        rps = new RPSController()
    })
})










