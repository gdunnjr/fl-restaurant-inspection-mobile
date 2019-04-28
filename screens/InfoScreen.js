import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'About This App',
  };

  constructor() {
    super();
  }

  render() {
    return (<View style={styles.MainContainer}>
      <Text style={{ fontWeight: 'bold' }}>{"\n"}Florida Health Inspections App</Text>
      <Text>{"\n"}This application shows failed first inspections in the last 30 days.
    {"\n"}{"\n"}Data is obtained from TC Palm Restaurant Inspections:{"\n"}</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://data.tcpalm.com/restaurant-inspections')}>
        <Text style={styles.fakeLinkText}>data.tcpalm.com/restaurant-inspections</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>{"\n"}{"\n"} {'\u00A9'} 2019 Gerald C Dunn Jr</Text>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 20,
    paddingLeft: 10,
    //alignItems: 'center',
    //justifyContent: 'left',

  },
  title: {
    color: '#acacac',
    fontWeight: 'bold'
  }, fakeLinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});