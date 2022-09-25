import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View, Linking } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { getParsedDate_yyyy_mm_dd, fetch_with_timeout } from '../utils/Helpers.js'
import { URL_GET_ALL_FAILED_INSPECTIONS, URL_GET_ALL_FAILED_INSPECTIONS_TEST, URL_GET_ALL_INSPECTIONS,
  INFO_MSG_LOADING_DATA,ERROR_MSG_TIMEOUT } from '../utils/Constants.js'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '',errorOccurred: false };
  }

  getData() {
    fetch_with_timeout(URL_GET_ALL_INSPECTIONS,20000)  
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         inspectionsDataSource: responseJson.inspections,
       }, function () {
         this.arrayholder = responseJson.inspections;
       });
     })
     .catch((error) => {
      this.setState({
        errorOccurred: true,
        isLoading: false,
        dataSource: null,
      }),
       console.log(error);
     }).catch();
 }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.errorOccurred) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>{ERROR_MSG_TIMEOUT}</Text>
        </View>
      )
    }

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
          <Text >{"\n"+INFO_MSG_LOADING_DATA}</Text>
         </View>
      )
    }

    return this.state.inspectionsDataSource instanceof Object ? (
      
      <View style={styles.container}>
        <MapView style={styles.map}
          // Center in mid FL and zoom out so whole state is visible
          region={{ latitude: 28.549445, longitude: -81.772854, latitudeDelta: 6.222, longitudeDelta: 1.911 }}>
          {this.state.inspectionsDataSource.map((e, i) =>
            <MapView.Marker
              coordinate={{
                latitude: Number(e.Lat),
                longitude: Number(e.Lng)
              }}
              title={e.Name}
              description={e.Violation}
              onCalloutPress={() => {
                //Linking.openURL(e.DetailsURL);
                console.log('Here');
                this.props.navigation.navigate("Details", { inspectionVisitID: e.InspectionVisitID });
              }}
              key={i}
              pinColor={e.NumTotalViolations == "0" ? '#008000' : e.NumHighViolations == "0" ? '#fad201':  '#f44336' } //'#f44336'
            >
            <MapView.Callout tooltip style={styles.customView}>
                <View style={styles.calloutText}>
                  {/* <Text>{e.Name}{"\n"}{e.Violation}{"\n"}{getParsedDate(e.Date)}</Text> */}
                  <Text>{e.Name}{"\n"}{"Inspected: " + getParsedDate_yyyy_mm_dd(e.Date)}{"\n"}{"Violations: " + e.NumTotalViolations}</Text>
                  {/* <Text>{e.Name}</Text> */}

                  <Text style={styles.fakeLinkText}>{"Click for more details..."}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          )}
        </MapView>
      </View>
    ) : <View style={{ flex: 1, padding: 20 }}><ActivityIndicator /><Text>{INFO_MSG_LOADING_DATA}</Text></View>;
  }
}

const styles = StyleSheet.create({
  callout: {
    flex: 1
  },
  link: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  customView: {
    top: 10,
    left: 10,
    backgroundColor: 'lightgray'
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  contentContainer: {
    paddingTop: 30,
  },
  fakeLinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

