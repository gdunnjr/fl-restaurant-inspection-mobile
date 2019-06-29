import React from 'react';
import { Linking, FlatList, ActivityIndicator, TouchableOpacity, View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { getParsedDate_yyyy_mm_dd, fetch_with_timeout } from '../utils/Helpers.js'
import { URL_GET_INSPECTION_DETAILS, URL_GET_ALL_INSPECTIONS, URL_GET_ALL_FAILED_INSPECTIONS_TEST,
  INFO_MSG_LOADING_DATA,ERROR_MSG_TIMEOUT } from '../utils/Constants.js'

import Table  from '../utils/Table.js'

  export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    );
  };

    clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

//   renderTableData() {
//     return this.state.dataSource.map((inspection, index) => {
//        const { Id, Name, Date, Violation } = inspection //destructuring
//        return (
//           <tr key={Id}>
//              <td>{Id}</td>
//              <td>{Name}</td>
//              <td>{Date}</td>
//              <td>{Violation}</td>
//           </tr>
//        )
//     })
//  }

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
         console.log( responseJson.inspections);
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
    
      <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between'
     }}>
      {/* <View style={{ flex: 1, paddingTop: 20 }}>
   */}
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10, paddingBottom:10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ fontSize: 10}}>test</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>This is column 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>dff</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row 3 col 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>This is a byunch of text in column 1. A whole bunch.</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row 4 col 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>dff</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row5 col 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>dff</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row Six col 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>dff</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row Six col 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>dff</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row Seven col 2</Text></View>
      </View>
      <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10 }}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>dff</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>Row Eight col 2</Text></View>
      </View>
        {/* <Text style={styles.title}>react-native-simple-table</Text>
        <Table bodyStyle={{ color: 'aqua', fontSize:10}} height={320} columnWidth={60} columns={[{
    title: 'Id',
    dataIndex: 'Id',
    width: 105
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    width: 140
  }]} dataSource={this.state.dataSource} /> */}


        {/* <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type a Name Here"
          value={this.state.search}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => 
            (
              <TouchableOpacity >
                <ListItem
                  backgroundColor= {'#f44336'}
                  badge={{ value: '', textStyle: { color: 'orange' }, badgeStyle: { backgroundColor: item.NumTotalViolations == "0" ? '#008000' : item.NumHighViolations == "0" ? '#fad201':  '#f44336' , marginTop: -20 }  }}
                  onPress={() => { Linking.openURL(item.DetailsURL);}}
                  id={item.Id}
                  roundAvatar
                  title={item.Name}
                  subtitleStyle={{fontSize:12}}
                  //TiteStyle={{ color: 'white', fontWeight: 'bold' }
                  subtitle={item.Address +' '+ item.City + ' '+ item.Zip+ '\n' + getParsedDate_yyyy_mm_dd(item.Date) + ' ' + item.Violation }
                  subtitleStyle={{fontSize:10}}
                  //subtitle={item.Address.replace(/\s+/g, ' ').replace(item.Name+' ', '').replace('(' + item.CountyName + ' county)', '').replace(' ,', ',') + '\n' + item.Violation + ' ' + getParsedDate_yyyy_mm_dd(item.Date)}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                  topDivider
                  bottomDivider
                  chevron
                //                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15 } }}
                />
              </TouchableOpacity>
            )
          }
          keyExtractor={(item, index) => item.Id}
        /> */}
      {/* </View> */}
      </ScrollView>
    
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
  
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: 1
  }
,
 
box1: {
    flex: 1,
    backgroundColor: 'white',
  },
  box3: {
    backgroundColor: 'orange'
  },
  two: {
    flex: 2
  }
});

