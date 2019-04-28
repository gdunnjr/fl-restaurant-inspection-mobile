import React from 'react';
import { Linking, FlatList, ActivityIndicator, TouchableOpacity, View, Text } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { getParsedDate, fetch_with_timeout } from '../utils/Helpers.js'
import { URL_GET_ALL_FAILED_INSPECTIONS, URL_GET_ALL_FAILED_INSPECTIONS_TEST,
  INFO_MSG_LOADING_DATA,ERROR_MSG_TIMEOUT } from '../utils/Constants.js'

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Search'
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

  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '',errorOccurred: false };
    this.arrayholder = [];
  }

  getData() {
    fetch_with_timeout(URL_GET_ALL_FAILED_INSPECTIONS,20000)  
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         dataSource: responseJson.inspections,
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
       console.log("Error ");
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
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SearchBar
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
                  onPress={() => { Linking.openURL(item.DetailsURL);}}
                  id={item.Id}
                  roundAvatar
                  title={item.Name}
                  subtitle={item.Address.replace(/\s+/g, ' ').replace(item.Name+' ', '').replace('(' + item.CountyName + ' county)', '').replace(' ,', ',') + '\n' + item.Violation + ' ' + getParsedDate(item.Date)}
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
        />
      </View>
    ) : <View style={{ flex: 1, padding: 20 }}><Text style={{ padding: 20 }}>{"\n"+INFO_MSG_LOADING_DATA}</Text><ActivityIndicator /></View>;
  }
}
