const React = require("react")

const RpsView = React.createClass({
    getInitialState(){
        return {
            message: null
        }
    },

    submitForm(){
        this.props.rps.play(this.state.p1Throw, this.state.p2Throw, this)
    },

    invalid(){
        this.setState({message: "INVALID"})
    },

    tie(){
        this.setState({message: "TIE"})
    },

    winner(player){
        this.setState({message: `${player.toUpperCase()} WINS`})
    },

    p1ThrowChangeHandler(e){
        this.setState({p1Throw: e.target.value})
    },

    p2ThrowChangeHandler(e){
        this.setState({p2Throw: e.target.value})
    },

    render(){
        return (
            <div>
            {this.state.message}
    <input type="text" id="p1Throw" onChange={this.p1ThrowChangeHandler}/>
    <input type="text" id="p2Throw" onChange={this.p2ThrowChangeHandler}/>
    <button id="playButton" onClick={this.submitForm}>Play</button>
        </div>
    )
    }
})

module.exports = RpsView;