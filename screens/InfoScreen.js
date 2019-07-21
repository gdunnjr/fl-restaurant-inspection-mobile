import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Info & Help',
  };

  constructor() {
    super();
  }

  render() {
    return (
    <ScrollView>
      <View style={styles.MainContainer}>
      <Text style={{ fontWeight: 'bold' }}>{"\n"}Florida Health Inspections App</Text>
      <Text>{"\n"}Version 1.0 - 4/28/2019</Text>
      <Text>
        {"\n"}
        Use the Home screen to show all first inspections in the last 30 days. 
        Use the Search screen to find establishments having first inspections in the last 30 days. 
        {"\n"}{"\n"}
        Data is obtained from State of Florida 
        {"\n"}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://data.tcpalm.com/restaurant-inspections')}>
        <Text style={styles.fakeLinkText}>data.tcpalm.com/restaurant-inspections</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold' }}>{"\n"}Look for an update soon that will also show restuarants with the most failures in the last 30 days and also show restaurants that passed inspections!</Text>
      <Text style={styles.textStyle}>{"\n"}{"\n"} {'\u00A9'} 2019 Gerald C Dunn Jr{"\n"}</Text>

    </View>
    </ScrollView>
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