import React from 'react';
import { Linking, FlatList, ActivityIndicator, TouchableOpacity, View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { getParsedDate_yyyy_mm_dd, fetch_with_timeout } from '../utils/Helpers.js'
import { URL_GET_INSPECTION_DETAILS, URL_GET_ALL_INSPECTIONS, URL_GET_ALL_FAILED_INSPECTIONS_TEST,
  INFO_MSG_LOADING_DATA,ERROR_MSG_TIMEOUT } from '../utils/Constants.js'

  export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };

  FlatListItemSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
    );
  };

    clear = () => {
    this.search.clear();
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '',errorOccurred: false };
    this.arrayholder = [];
    this.inspectionVisitID = props.navigation.state.params.inspectionVisitID;
    console.log(props.navigation.state.params)
  }


  
  getData() {
    
    fetch_with_timeout(URL_GET_INSPECTION_DETAILS+this.inspectionVisitID,20000)  
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         dataSource: responseJson.inspections,
       }, function () {
         this.arrayholder = responseJson.inspections;
         console.log( responseJson.inspections[0].violations);
         console.log(URL_GET_INSPECTION_DETAILS+this.inspectionVisitID)
       });
     })
     .catch((error) => {
      this.setState({
        errorOccurred: true,
        isLoading: false,
        dataSource: null,
      }),
       console.log(error);
       console.log(URL_GET_INSPECTION_DETAILS+this.inspectionVisitID)
     }).catch();
 }

componentDidMount() {
  this.getData();
  console.log(this.state.errorOccurred)
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
        <View style={{ flex: 1, padding: 20, paddingTop: 20 }}>
          <ActivityIndicator />
          <Text style={{ flex: 1}}>{"\n"+INFO_MSG_LOADING_DATA}</Text>
        </View>
      )
    }

    return this.state.dataSource instanceof Object ? (
    
      <View style={styles.container}>
        <Text style={{ fontSize: 12}}> { this.state.dataSource.Name }</Text>
        
        <Text style={{ fontSize: 9 }}> † Denotes Risk Factors </Text>
        <Text style={{ fontSize: 9 }}> * Denotes good retail practices that are considered a primary concern that must be corrected immediately. </Text>
        <Text></Text>
        <Text stype={{ fontSize: 12, borderWidth: 1, borderColor: 'black' }}> Violation and Number Found</Text>

        <FlatList
          data={this.state.dataSource[0].violations}
          
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) =>

            <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10, paddingBottom: 10 }}>
              <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ fontSize: 10 }}>{item.ViolationDesc}</Text></View>
              <View style={{ flex: 0, alignItems: 'right', justifyContent: 'right', margin: 10 }}><Text style={{ fontSize: 10 }}>{item.ViolationCount}</Text></View>
            </View>

          }
        />
      </View>


   
    
    ) : <View style={{ flex: 1, padding: 20 }}><Text style={{ padding: 20 }}>{"\n"+INFO_MSG_LOADING_DATA}</Text><ActivityIndicator /></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {}
    }),
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  },
  
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 45,
  }
});

