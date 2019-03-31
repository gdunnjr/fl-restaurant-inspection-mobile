import React from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';


export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'List & Search Inspections'
    };

  render() {
    return (
      <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'A', data: ['Alvins Restaurant']},
          {title: 'B', data: ['Billies Ribs', 'BBQ Soutwest', 'Barbs Diner', 'Billy Bobs Fried Chicken']},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

