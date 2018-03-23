function Ao(props) {
    return (
        <div className="ao_wrapper">
            <div>{props.name}</div>
            <button onClick={props.onClick}>X</button>
        </div>
    );
}

function Inv(props) {
    return (
        <div className="inv_wrapper">
            <div>{props.name}</div>
            <button onClick={props.onClick}>X</button>
        </div>
    );
}

function Prelude(props) {
    return (
        <div className="pre_wrapper">
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
            ao_list: [],
            inv_list: [],
            pre_list: []
        };
    }
    componentDidMount () {
        fetch('./data.json')
        .then(response => response.json())
        .then(data => this.setState({ raw_data: data, 
        ao_data:JSON.parse(JSON.stringify(data)).ancient_ones, 
        pre_data:JSON.parse(JSON.stringify(data)).preludes,
        inv_data: JSON.parse(JSON.stringify(data)).investigators
        }));
    }
    remove(list,obj,data) {
        let new_list = list.filter(item => item.id != obj.id);
        if(list==this.state.inv_list) {
            this.setState({
                inv_list:new_list
            })
        }
        else if(list==this.state.ao_list) {
            this.setState({
                ao_list:new_list
            })
        }
        else if(list==this.state.pre_list) {
            this.setState({
                pre_list:new_list
            })
        }

        data.push(obj);
    }
    random_ao(array) {
        if (array.length == 0) {
            this.setState({
                ao_data: JSON.parse(JSON.stringify(this.state.raw_data)).ancient_ones,
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
    random_inv(array) {
        if (array.length == 0) {
            this.setState({
                inv_data: JSON.parse(JSON.stringify(this.state.raw_data)).investigators,
                inv_list: []
            })
            return;
        }
        let rand = Math.floor(Math.random()*array.length);
        let chosen = array[rand];
        array.splice(rand,1);
        let new_inv_list = this.state.inv_list.concat([chosen])
        this.setState({
            inv_list:new_inv_list
        })
    }
    random_pre(array) {
        if (array.length == 0) {
            this.setState({
                pre_data: JSON.parse(JSON.stringify(this.state.raw_data)).preludes,
                pre_list: []
            })
            return;
        }
        let rand = Math.floor(Math.random()*array.length);
        let chosen = array[rand];
        array.splice(rand,1);
        let new_pre_list = this.state.pre_list.concat([chosen])
        this.setState({
            pre_list:new_pre_list
        })
    }
    render() {
        return(
            <div className="randomizer">
            <button onClick={() => this.random_ao(this.state.ao_data)}>Random ao</button>
            <button onClick={() => this.random_inv(this.state.inv_data)}>Random inv</button>
            <button onClick={() => this.random_pre(this.state.pre_data)}>Random pre</button>
            {this.state.ao_list.map((obj) => <Ao name={obj.name} onClick={() => this.remove(this.state.ao_list,obj,this.state.ao_data)}/>)}
            {this.state.inv_list.map((obj) => <Inv name={obj.name} onClick={() => this.remove(this.state.inv_list,obj,this.state.inv_data)}/>)}
            {this.state.pre_list.map((obj) => <Prelude name={obj.name} onClick={() => this.remove(this.state.pre_list,obj,this.state.pre_data)}/>)}
            </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));