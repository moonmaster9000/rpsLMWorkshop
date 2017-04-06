const { RPSController } = require("../src/RPSController")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("play", function () {
    let rps, ui, roundRepo

    beforeEach(function () {
        rps = new RPSController()
        roundRepo = new FakeRoundRepo()
    })

    describe("win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })

        it("rock v. paper", function () {
            rps.play("rock", "paper", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper v. rock", function () {
            rps.play("paper", "rock", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors v. rock", function () {
            rps.play("scissors", "rock", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("rock v. scissors", function () {
            rps.play("rock", "scissors", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper v. scissors", function () {
            rps.play("paper", "scissors", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors v. paper", function () {
            rps.play("scissors", "paper", ui, roundRepo)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })
    })


    describe("ties", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.play("rock", "rock", ui, roundRepo)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.play("paper", "paper", ui, roundRepo)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.play("scissors", "scissors", ui, roundRepo)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. sailboat", function () {
            rps.play("rock", "sailboat", ui, roundRepo)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("sailboat v. sailboat", function () {
            rps.play("sailboat", "sailboat", ui, roundRepo)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })



})