import React from 'react';
import { Linking, FlatList, ActivityIndicator, TouchableOpacity, View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { getParsedDate_yyyy_mm_dd, fetch_with_timeout } from '../utils/Helpers.js'
import {
  URL_GET_INSPECTION_DETAILS, URL_GET_ALL_INSPECTIONS, URL_GET_ALL_FAILED_INSPECTIONS_TEST,
  INFO_MSG_LOADING_DATA, ERROR_MSG_TIMEOUT
} from '../utils/Constants.js'
import { TabRouter } from 'react-navigation';

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
    this.state = { isLoading: true, search: '', errorOccurred: false };
    this.arrayholder = [];
    this.inspectionVisitID = props.navigation.state.params.inspectionVisitID;
    console.log(props.navigation.state.params)
  }



  getData() {

    fetch_with_timeout(URL_GET_INSPECTION_DETAILS + this.inspectionVisitID, 20000)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.inspections,
        }, function () {
          this.arrayholder = responseJson.inspections;
          console.log(responseJson.inspections[0]);
          console.log(URL_GET_INSPECTION_DETAILS + this.inspectionVisitID)
        });
      })
      .catch((error) => {
        this.setState({
          errorOccurred: true,
          isLoading: false,
          dataSource: null,
        }),
          console.log(error);
        console.log(URL_GET_INSPECTION_DETAILS + this.inspectionVisitID)
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
          <Text style={{ flex: 1 }}>{"\n" + INFO_MSG_LOADING_DATA}</Text>
        </View>
      )
    }

    return this.state.dataSource instanceof Object ? (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}> {this.state.dataSource[0].Name}</Text>
          <Text style={{ fontSize: 12 }}> {this.state.dataSource[0].Address +
            this.state.dataSource[0].City + this.state.dataSource[0].PostalCode}</Text>
          <Text style={{ fontSize: 12 }}> {'Inspection Date: ' + this.state.dataSource[0].Name}</Text>
          <Text></Text>

          <Text style={{ fontSize: 12, alignSelf: 'flex-start', fontWeight: 'bold', backgroundColor: this.state.dataSource[0].NumTotalViolations == '0' ? '#008000' : '#e5e5e5' }}> {'Total Violations: ' + this.state.dataSource[0].NumTotalViolations}</Text>
          <Text style={{ fontSize: 12, alignSelf: 'flex-start', paddingLeft: 10, backgroundColor: this.state.dataSource[0].NumHighViolations != '0' ? '#f44336' : '#e5e5e5' }}> {'High Risk Violations: ' + this.state.dataSource[0].NumHighViolations}</Text>
          <Text style={{ fontSize: 12, alignSelf: 'flex-start', paddingLeft: 10, backgroundColor: this.state.dataSource[0].NumIntermediateViolations != '0' ? '#fad201' : '#e5e5e5' }}> {'Intermediate Violations: ' + this.state.dataSource[0].NumIntermediateViolations}</Text>
          <Text style={{ fontSize: 12, alignSelf: 'flex-start', paddingLeft: 10, backgroundColor: this.state.dataSource[0].NumBasicViolations != '0' ? '#fad201' : '#e5e5e5' }}> {'Basic Violations: ' + this.state.dataSource[0].NumBasicViolations}</Text>

          <Text></Text>
  
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}> {this.state.dataSource[0].NumTotalViolations != '0' ? 'Violation Details' : ''} </Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: this.state.dataSource[0].NumTotalViolations != '0' ? 1 : 0, }} />

          <FlatList
            data={this.state.dataSource[0].violations}
            ItemSeparatorComponent={this.state.dataSource[0].NumTotalViolations != '0' ? this.FlatListItemSeparator : null}
            backgroundColor='white'
            renderItem={({ item }) =>
              <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ fontSize: 10 }}>{item.ViolationDesc}</Text></View>
                <View style={{ flex: 0, alignItems: 'right', justifyContent: 'right', margin: 10 }}><Text style={{ fontSize: 10 }}>{item.ViolationCount}</Text></View>
              </View>
            }
          />
          <View style={{ paddingTop: 10, borderTopColor: 'black', borderTopWidth: this.state.dataSource[0].NumTotalViolations != '0' ? 1 : 0, }} />
          <Text style={{ fontSize: 12, fontStyle: 'italic' }}> {this.state.dataSource[0].NumTotalViolations != '0' ? 'Note' : ''} </Text>
          <Text style={{ fontSize: 9, paddingLeft: 10, fontStyle: 'italic' }}>{this.state.dataSource[0].NumTotalViolations != '0' ? '† Denotes Risk Factors' : ''} </Text>
          <Text style={{ fontSize: 9, paddingLeft: 10, fontStyle: 'italic' }}>{this.state.dataSource[0].NumTotalViolations != '0' ? '* Denotes good retail practices that are considered a primary concern that must be corrected immediately.' : ''} </Text>
          <View style={{ paddingTop: 10, borderBottomColor: 'black', borderBottomWidth: 1, }} />

        </View>
      </ScrollView>

    ) : <View style={{ flex: 1, padding: 20 }}><Text style={{ padding: 20 }}>{"\n" + INFO_MSG_LOADING_DATA}</Text><ActivityIndicator /></View>;
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
    backgroundColor: "#e5e5e5"
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

