function Ao(props) {
    return (
        <div className="ao_wrapper">
            <div>{props.name}</div>
            <button onClick={props.onClick}>X</button>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raw_data: null,
            components: null,
            ao_list: []
        };
    }
    componentDidMount () {
        fetch('./data.json')
        .then(response => response.json())
        .then(data => this.setState({ raw_data: data, components:JSON.parse(JSON.stringify(data)) }));
    }
    remove(list,obj,data) {
        let new_ao_list = list.filter(item => item.id != obj.id);
        this.setState({
            ao_list:new_ao_list
        })
        data.push(obj);
    }
    random_ao(array) {
        if (array.length == 0) {
            this.setState({
                components: JSON.parse(JSON.stringify(this.state.raw_data)),
                ao_list: []
            })
            return;
        }
        let rand = Math.floor(Math.random()*array.length);
        let chosen = array[rand];
        array.splice(rand,1);
        let new_ao_list = this.state.ao_list.concat([chosen])
        this.setState({
            ao_list:new_ao_list
        })
    }
    render() {
        return(
            <div className="randomizer">
            <button onClick={() => this.random_ao(this.state.components.ancient_ones)}>Randomize</button>
            {this.state.ao_list.map((obj) => <Ao name={obj.name} onClick={() => this.remove(this.state.ao_list,obj,this.state.components.ancient_ones)}/>)}
            </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));