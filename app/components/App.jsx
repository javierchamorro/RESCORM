import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import Header2 from './Header2.jsx';
import FinishScreen from './FinishScreen.jsx';
import Quiz from './Quiz.jsx';
import UserInfo from './UserInfo.jsx';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startUp:true};
    I18n.init();
  }

  onAnswerUserInformation(){
    if(SAMPLES.quiz_example.UserName === "" || SAMPLES.quiz_example.Age === 0 || SAMPLES.quiz_example.Location === "" || SAMPLES.quiz_example.Studies === ""){
      console.log("Falta Info");
    } else {
      this.setState({startUp:false});
    }
  }

  render(){
    let appHeader = (<Header user_profile={this.props.user_profile} quiz={SAMPLES.quiz_example} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n} />);
    let appHeader2 = "";
    let appContent = "";
    if(this.state.startUp){
      appContent = (<UserInfo I18n={I18n} quiz={SAMPLES.quiz_example} onCompleteInformation={this.onAnswerUserInformation.bind(this)}/>);
    } else if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader2 = (<Header2 user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n} />);
      if(this.props.wait_for_user_profile !== true){
        appContent = (<Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n} />);
      }
    } else {
      appContent = (<FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n} />);
    }

    return (<div id="container">
      <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG} />
      {appHeader}
      {appHeader2}
      {appContent}
    </div>);
  }

}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);