/*fetch data*/

let data;

fetch('./data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    data = res;
  });

/*app*/

function Ao(props) {
    return (
        <div className="ao_wrapper">{props.name}</div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: null,
            ao: []
        };
    }
    random_ao(array) {
        if (array.length == 0) {
            this.setState({
                components: data,
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
            <button onClick={() => this.random_ao(data.ancient_ones)}>Randomize</button>
            <Ao name={this.state.ao}/>
            </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));