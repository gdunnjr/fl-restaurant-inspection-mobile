//export default class ListScreen extends React.Component {

import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert } from "react-native";
import { CODES_DEFINITION } from "../utils/Constants";

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }

renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 9 }}> † Denotes Risk Factors </Text>
        <Text style={{ fontSize: 9 }}> * Denotes good retail practices that are considered a primary concern that must be corrected immediately. </Text>
        <Text></Text>
        <Text stype={{ fontSize: 12, borderWidth: 1, borderColor: 'black' }}> Violation and Number Found</Text>

        <FlatList
          data={CODES_DEFINITION}

          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) =>

            <View style={{ flex: 0, alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 10, paddingBottom: 10 }}>
              <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{ fontSize: 10 }}>{item.description}</Text></View>
              <View style={{ flex: 0, alignItems: 'right', justifyContent: 'right', margin: 10 }}><Text style={{ fontSize: 10 }}>{item.key}</Text></View>
            </View>

          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5"
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