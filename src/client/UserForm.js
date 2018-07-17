import React,{Component} from 'react';
import "./userform.css";
import axios from 'axios';

export default class UserForm extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        userName: '',
        password: ''
      };
      this.statechanges = this.statechanges.bind(this);
      this.clearValues = this.clearValues.bind(this);
      this.submitValues = this.submitValues.bind(this);
    }
    statechanges(event) {
      this.setState({showResponse: false, showClientError: false});
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
    submitValues(event){
      var data = {
          username: this.state.userName,
          password: this.state.password
      }
      if(this.state.userName && this.state.password) {
        axios.post('/api/person', data)
        .then(res => {
          console.log(res);
          // console.log(res.data);
          if(res.status === 200) {
            this.setState({userName:'', password: '', showResponse: true, showClientError: false})
          }
        });
      }
      else {
        this.setState({showClientError: true, showResponse: false});
      }

    }

    render() {
        return (
            <div className="signin-form container border border-info">
              {this.state.showResponse ? <div className="alert alert-success alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                  User Details Saved Successfully!!
              </div>: null}
              {this.state.showClientError ? <div className="alert alert-danger alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                  Please enter Valid data
              </div>: null}
              <form>
                <fieldset>
                  <div className="form-group">
                    <input type="text" name="username" className="form-control" id="usr" placeholder="Username" onChange={this.statechanges} value={this.state.userName} />
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" className="form-control" id="pwd" placeholder="Password" onChange={this.statechanges} value={this.state.password} />
                  </div>
                  <button type="button" className="btn btn-secondary userform-btn btn-lg" onClick={this.clearValues}>Clear</button>
                  <button type="button" className="btn btn-primary userform-btn btn-lg" onClick={this.submitValues}>Submit</button>
                </fieldset>
              </form>
            </div>
        );
    }
}
