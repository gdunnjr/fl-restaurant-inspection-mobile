import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View, Linking } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { getParsedDate, fetch_with_timeout } from '../utils/Helpers.js'
import { URL_GET_ALL_FAILED_INSPECTIONS, URL_GET_ALL_FAILED_INSPECTIONS_TEST,
  INFO_MSG_LOADING_DATA,ERROR_MSG_TIMEOUT } from '../utils/Constants.js'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '',errorOccurred: false };
  }

  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
  };

  getData() {
    fetch_with_timeout(URL_GET_ALL_FAILED_INSPECTIONS,20000)  
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
    this._getLocationAsync();
    this.getData();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

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
          // Use this to center on current location
          //region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}

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
                Linking.openURL(e.DetailsURL);
              }}
              key={i}
            >
              <MapView.Callout tooltip style={styles.customView}>
                <View style={styles.calloutText}>
                  <Text>{e.Name}{"\n"}{e.Violation}{"\n"}{getParsedDate(e.Date)}</Text>
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  fakeLinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

