import React from 'react';
import { AppRegistry, Linking, FlatList, ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
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
/*     return <SearchBar placeholder="Type Here H..." 
            lightTheme round       
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}   />; */

  };


  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.title.toUpperCase()}   
      ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
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

  GetItem (item) {
   
    Alert.alert(item.Name);
   
    }

    getParsedDate(date){
      var m = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, 
           Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 };
      formatted_date = '';
      if (date!='') {
        date = String(date).split('-');
        day = String(date[0]);
        month_name = date[1];
        year = String(date[2]);
        formatted_date = m[month_name]+"/"+day+"/"+year;
      }

      return formatted_date ;
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
      autoCorrect={false} 
      ref={component => this.messageInput = component} 
      value={this.state.message} 
      onChangeText={(text) => this.setState({ message: text })}
      placeholder="Type your message here..."
        />

        <FlatList
          data={this.state.moviesDataSource}
          ItemSeparatorComponent={this.renderSeparator}
          //renderItem={({item}) => <Text>{item.Name}</Text>}
          renderItem={({ item }) => // <Text>{item.Name}, {item.Violation}</Text>
            (
              <TouchableOpacity >
              <ListItem
                onPress={() => {
                  
                  Linking.openURL(item.DetailsURL);
                }}   
                //onPress={this.GetItem.bind(this, item)}
                id={item.Id}
                //key={'${sectionID}-${rowID}'}
                roundAvatar
                title={item.Name}
                subtitle={item.Violation+' '+this.getParsedDate(item.Date)}
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

