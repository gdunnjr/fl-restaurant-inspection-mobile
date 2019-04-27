import React from 'react';
import { AppRegistry, Linking, FlatList, ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Search'
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
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
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('http://3.89.110.44:5000/tc-health-inspection/v1/failedfirstinspection/county/st-lucie')
    return fetch('http://3.89.110.44:5000/tc-health-inspection/v1/failedfirstinspection')

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
        console.error(error);
      });
  }

  getParsedDate(date) {
    var m = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };
    formatted_date = '';
    if (date != '') {
      date = String(date).split('-');
      day = String(date[0]);
      month_name = date[1];
      year = String(date[2]);
      formatted_date = m[month_name] + "/" + day + "/" + year;
    }

    return formatted_date;
  }

  render() {


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
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
          //renderItem={({item}) => <Text>{item.Name}</Text>}
          renderItem={({ item }) => // <Text>{item.Name}, {item.Violation}</Text>
            (
              <TouchableOpacity >
                <ListItem
                  onPress={() => {

                    Linking.openURL(item.DetailsURL);
                  }}
                  id={item.Id}
                  roundAvatar
                  title={item.Name}
                  subtitle={item.Violation + ' ' + this.getParsedDate(item.Date)}
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
        {/* <FlatList
          data={this.state.moviesDataSource}
          renderItem={({item}) => // <Text>{item.Name}, {item.Violation}</Text>
          (
            <ListItem
            roundAvatar
            title={item.Name}
            subtitle={item.Violation}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            topDivider
            bottomDivider


          />
          )
        }
          keyExtractor={item => item.id}
        /> */}
      </View>

      //   <View style={styles.container}>
      //   <SectionList
      //     sections={[
      //       {title: 'A', data: ['Alvins Restaurant']},
      //       {title: 'B', data: ['Billies Ribs', 'BBQ Soutwest', 'Barbs Diner', 'Billy Bobs Fried Chicken']},
      //     ]}
      //     renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      //     renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      //     keyExtractor={(item, index) => index}
      //   />
      // </View>
    ) : <View style={{ flex: 1, padding: 20 }}><ActivityIndicator /></View>;
  }
}


// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   item: {
//     padding: 10,
//     //fontSize: 13,
//     //height: 44,
//   },
//   separator: {
//     height: 0.5,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   text: {
//     fontSize: 15,
//     color: 'black',
//   },
//   smallText: {
//     fontSize: 10,
//     color: 'black',
//   },
// })

