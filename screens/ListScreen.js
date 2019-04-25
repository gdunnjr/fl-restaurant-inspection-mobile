import React from 'react';
import { AppRegistry, SectionList, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';


export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Search Inspections'
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

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('http://3.89.110.44:5000/tc-health-inspection/v1/failedfirstinspection/county/st-lucie')
    return fetch('http://3.89.110.44:5000/tc-health-inspection/v1/failedfirstinspection')

      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          moviesDataSource: responseJson.inspections,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  
  _onPressItem = (rowItem) => {
  console.log('ListItem was selected');
  // console.log(`User${rowItem}`);
  console.log(`User${rowItem.Id}`);
  this.setState({
      selectedItem: rowItem.value
  });
  //  console.log(`User${this.state.selectedItem}`);
}

  render() {


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return this.state.moviesDataSource instanceof Object ? (


      <View style={{ flex: 1, paddingTop: 20 }}>

        <SearchBar
          placeholder="Type Here..."
        //onChangeText={this.updateSearch}
        //value={search}
        />

        <FlatList
          data={this.state.moviesDataSource}
          ItemSeparatorComponent={this.renderSeparator}
          //renderItem={({item}) => <Text>{item.Name}</Text>}
          renderItem={({ item }) => // <Text>{item.Name}, {item.Violation}</Text>
            (
              <TouchableOpacity >
              <ListItem
               onPress={this._onPressItem(item)}
                id={item.Id}
                //key={'${sectionID}-${rowID}'}
                roundAvatar
                title={item.Name}
                subtitle={item.Violation}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                topDivider
                bottomDivider


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

