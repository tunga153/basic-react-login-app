import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, CardSection, CustomButton, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA1YRICQm6EREIDLRsG306vmf8Ic1iXmls',
      authDomain: 'authentication-87284.firebaseapp.com',
      databaseURL: 'https://authentication-87284.firebaseio.com',
      storageBucket: 'authentication-87284.appspot.com',
      messagingSenderId: '1005982950087'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <CustomButton onPress={() => firebase.auth().signOut()}>
              Log Out
            </CustomButton>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <View style={styles.spinnerViewStyle}><Spinner /></View>;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default App;
