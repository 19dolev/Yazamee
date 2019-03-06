/* jshint esversion: 6 */

import { AsyncStorage, I18nManager } from 'react-native';
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
import React, { Component } from 'react';
import QuestionScreen from '../QuestionScreen/QuestionScreen';
import ResultScreen from '../ResultScreen/ResultScreen';
import IntroScreen from '../IntroScreen/IntroScreen';



// const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

export default class Main extends Component {
  constructor() {
    super();
    this.changeValue = this.changeValue.bind(this);
    this.onSkipOrFinish = this.onSkipOrFinish.bind(this);
    this.resetSum = this.resetSum.bind(this);
    this.addSum = this.addSum.bind(this);
    this.state = {
      countQuestion: 1,
      answerSum: 0,
      firstLaunch: null,
    };
  }

  onSkipOrFinish() {
    this.setState({ firstLaunch: 'false' });
    AsyncStorage.setItem('alreadyLaunched', AsyncStorage.getItem('alreadyLaunched') + 1);
  }

  componentDidMount() {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value < 2) {
        AsyncStorage.setItem('alreadyLaunched', AsyncStorage.getItem('alreadyLaunched') + 1); // No need to wait for `setItem` to finish, although you might want to handle errors
        this.setState({ firstLaunch: 'true' });
      } else {
        this.setState({ firstLaunch: 'false' });
      }
    });
  }

  changeValue(value) {
    this.setState({ countQuestion: value });
  }

  addSum(val) {
    this.setState({ answerSum: this.state.answerSum + val });
  }

  resetSum() {
    this.setState({ answerSum: 0 });
  }

  render() {
    if (this.state.firstLaunch == 'false') {
      if (this.state.countQuestion <= 7) {
        return (
          <QuestionScreen
            currQuestion={this.state.countQuestion}
            resetSum={this.resetSum}
            adjustSum={this.addSum}
            changeVal={this.changeValue}
            sum={this.state.answerSum}
          />
        );
      }

      if (this.state.answerSum > 26) return <ResultScreen success="true" />;

      return <ResultScreen success={false} />;
    }
    return <IntroScreen onSkipOrFinish={this.onSkipOrFinish} />;
  }
}
