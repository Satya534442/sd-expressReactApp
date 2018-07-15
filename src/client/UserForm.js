import React,{Component} from 'react';
import "./userform.css";

export default class UserForm extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        userName: '',
        password: ''
      };
      this.statechanges = this.statechanges.bind(this);
      this.clearValues = this.clearValues.bind(this);
    }
    statechanges(event) {
      switch(event.target.type) {
        case 'text': this.setState({userName:event.target.value});
                      break;
        case 'password': this.setState({password:event.target.value});
                      break;
        default: break;
      }
    }
    clearValues(){
      this.setState({userName:'', password: ''});
    }

    render() {
        return (
            <div className="signin-form container">
              <form>
                <fieldset>
                  <div className="form-group">
                    <input type="text" className="form-control" id="usr" placeholder="Username" onChange={this.statechanges} value={this.state.userName} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="pwd" placeholder="Password" onChange={this.statechanges} value={this.state.password} />
                  </div>
                  <button type="button" className="btn userform-btn" onClick={this.clearValues}>Clear</button>
                  <button type="button" className="btn btn-primary userform-btn">Submit</button>
                </fieldset>
              </form>
            </div>
        );
    }
}
