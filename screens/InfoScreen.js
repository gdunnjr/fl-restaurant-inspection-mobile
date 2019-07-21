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
      <Text>{"\n"}Version 1.0 - 7/21/2019</Text>
      <Text>
        {"\n"}
        Use the Home screen to show all first inspections completed in the last 30 days in the state of Florida. 
        Use the Search screen to find establishments having first inspections in the last 30 days. 
        {"\n"}{"\n"}
        Data is obtained from Florida Department of Business and Professional Regulation which updates its data weekly.
        {"\n"}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('http://www.myfloridalicense.com/DBPR/hotels-restaurants/')}>
        <Text style={styles.fakeLinkText}>www.myfloridalicense.com/DBPR/hotels-restaurants/</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold' }}>{"\n"}Look for an update to this app soon to improve load times and add more features!</Text>
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