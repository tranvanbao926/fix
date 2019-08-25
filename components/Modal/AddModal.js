import React, { Component } from "react";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  Platform,
  TouchableHighlight,
  Dimensions,
  TextInput,
  AsyncStorage
} from "react-native";
import Modal from "react-native-modalbox";
import Button from "react-native-button";
// import data from '../datas/data';

var screen = Dimensions.get("window");
export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMissionName: "",
      newMissionDescription: ""
    };
  }
  showAddModal = () => {
    this.refs.myModal.open();
  };
  generateKey = numberOfCharacters => {
    return require("random-string")({ length: numberOfCharacters });
  };
  render() {
    return (
      <Modal
        ref={"myModal"}
        style={{
          justifyContent: "center",
          borderRadius: Platform.OS === "ios" ? 30 : 0,
          shadowRadius: 10,
          width: screen.width - 80,
          height: 280
        }}
        position="center"
        backdrop={true}
        onClosed={() => {
          // alert("Modal closed");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40
          }}
        >
          New my mission
        </Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 1
          }}
          onChangeText={text => this.setState({ newMissionName: text })}
          placeholder="Enter new mission's name"
          value={this.state.newMissionName}
        />
        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
            marginBottom: 20,
            borderBottomWidth: 1
          }}
          onChangeText={text => this.setState({ newMissionDescription: text })}
          placeholder="Enter new mission's description"
          value={this.state.newMissionDescription}
        />
        <Button
          style={{ fontSize: 18, color: "white" }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: "mediumseagreen"
          }}
          onPress={async () => {
            if (
              this.state.newMissionName.length == 0 ||
              this.state.newMissionDescription.length == 0
            ) {
              alert("You must enter mission's name and description");
              return;
            }
            const newKey = this.generateKey(24);
            const newmission = {
              key: newKey,
              missionName: this.state.newMissionName,
              description: this.state.newMissionDescription
            };
            try {
              let data = await AsyncStorage.getItem("todolist");
              if (data) {
                data = JSON.parse(data);
                data.push(newmission);
                console.log(data);
                AsyncStorage.setItem("todolist", JSON.stringify(data));
              } else {
                AsyncStorage.setItem("todolist", JSON.stringify([newmission]));
              }
            } catch (error) {
              console.log(error);
              // Error saving data
            }
            this.props.parentFlatList.refreshFlatList(newKey);
            this.refs.myModal.close();
          }}
        >
          Save
        </Button>
      </Modal>
    );
  }
}
