import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import Forecast from './Forecast';
import OpenWeatherMap from "./open_weather_map";

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null };
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      this.setState({ forecast: forecast });
    })
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/flowers.png')}
          resizeMode='cover'
          style={styles.backdrop}>
          <Text style={styles.welcome}>
            Your input {this.state.zip}
          </Text>
          {content}
          <TextInput
            style={styles.input}
            onSubmitEditing={this._handleTextChange}/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  backdrop: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  input: {
    fontSize: 20,
    borderWidth: 2,
    padding: 2,
    height: 40,
    width: 100,
    textAlign: "center"
  },
});

export default WeatherProject;
