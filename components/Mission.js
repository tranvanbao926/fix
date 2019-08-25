import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from "react-native";
// import data from "./datas/data";

import AddModal from "./Modal/AddModal";
import EditModal from "./Modal/EditModal";

const width = Dimensions.get("window").width;

class MissionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null, // save key
      numberOfRefresh: 0
    };
  }
  refreshMissionItem = () => {
    this.setState(prevState => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1
      };
    });
  };

  _onPressDelete = async () => {
    alert('aa')
    this.setState({ activeRowKey: this.props.item.key });
    data.splice(this.props.index, 1);
    this.props.parentFlatList.refreshFlatList(this.state.activeRowKey);
  };
  _onPressEdit = () => {
    this.setState({ activeRowKey: this.props.item.key });
    this.props.parentFlatList.refs.editModal.showEditModal(data[this.props.index], this);
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#BFB291",
          borderColor: "red",
          margin: 5,
          borderRadius: 5
        }}
      >
        <Text style={styles.txtmissionName}>{this.props.item.missionName}</Text>
        <Text style={styles.txtDescription}>{this.props.item.description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.btnItem}
            onPress={this._onPressDelete}
          >
            <Text>Xoa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnItem} onPress={this._onPressEdit}>
            <Text>Sua</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnItem}>
            <Text>HoanThanh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null, //savekey
      todo: []
    };
  }
  refreshFlatList = async activeKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: activeKey
      };
    });
    try {
        let data = await AsyncStorage.getItem("todolist");
        console.log(data);
        this.setState({ todo: JSON.parse(data) });
      } catch (error) {}
    // this.refs.flatList.scrollToEnd();
  };
  _onPressAdd = async () => {
    // alert("You add Item");
    this.refs.addModal.showAddModal();
  }

  componentDidMount = async () => {
    try {
      const data = await AsyncStorage.getItem("todolist");
      console.log(data);
      this.setState({ todo: JSON.parse(data) });
    } catch (error) {}
  };

  render() {
    const data = this.state.todo
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 34 : 0 }}>
        <View
          style={{
            backgroundColor: "#78ADC1",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            height: 64
          }}
        >
        </View>
        <FlatList
          ref={"flatList"}
          data={data}
          renderItem={({ item, index }) => {
            //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
            return (
              <MissionItem
                item={item}
                index={index}
                parentFlatList={this}
              ></MissionItem>
            );
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <TouchableOpacity style={styles.btnAdd} onPress={this._onPressAdd}>
            <Text> Them cong viec</Text>
          </TouchableOpacity>
        </View>
        <AddModal ref={"addModal"} parentFlatList={this}></AddModal>
        <EditModal ref={"editModal"} parentFlatList={this}></EditModal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  txtmissionName: {
    color: "white",
    padding: 10,
    fontSize: 20
  },
  txtDescription: {
    color: "white",
    padding: 10,
    fontSize: 15
  },
  btnItem: {
    height: 35,
    backgroundColor: "#BFB291",
    borderRadius: 5,
    width: width / 4,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1
  },
  btnAdd: {
    height: 35,
    backgroundColor: "#78ADC1",
    borderRadius: 5,
    width: width / 2,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1
  },
  MissionItem: {
    color: "white",
    padding: 10,
    fontSize: 16
  }
});
