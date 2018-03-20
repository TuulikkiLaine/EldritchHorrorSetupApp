/**app**/

function Ao(props) {
    return (
        <div className="ao_wrapper">{props.name}</div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raw_data: null,
            components: null,
            ao: []
        };
    }
    componentDidMount () {
        fetch('./data.json')
        .then(response => response.json())
        .then(data => this.setState({ raw_data: data, components:JSON.parse(JSON.stringify(data)) }));
    }
    random_ao(array) {
        if (array.length == 0) {
            this.setState({
                components: JSON.parse(JSON.stringify(this.state.raw_data)),
                ao: []
            })
            return;
        }
        let rand = Math.floor(Math.random()*array.length);
        let chosen = array[rand];
        array.splice(rand,1);
        let new_ao = this.state.ao.concat([chosen.name])
        this.setState({
            ao:new_ao
        })
    }
    render() {
        return(
            <div className="randomizer">
            <button onClick={() => this.random_ao(this.state.components.ancient_ones)}>Randomize</button>
            <Ao name={this.state.ao}/>
            </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));