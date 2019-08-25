import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import data from '../datas/data';

var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missionName: '',
            missionDescription: ''
        };
    }
    showEditModal = (editingmission, missionItem) => {     
        // console.log(`editingmission = ${JSON.stringify(editingmission)}`);           
        this.setState({
            key: editingmission.key,
            missionName: editingmission.missionName,
            missionDescription: editingmission.description,
            missionItem: missionItem
        });
        this.refs.myModal.open();
    } 
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});        
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>mission's information</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}           
                    onChangeText={(text) => this.setState({ missionName: text })}
                    placeholder="Enter mission's name"
                    value={this.state.missionName}                 
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}
                    
                    onChangeText={(text) => this.setState({ missionDescription: text })}
                    placeholder="Enter mission's description"
                    value={this.state.missionDescription}
                />
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {
                         if (this.state.missionName.length == 0 || this.state.missionDescription.length == 0) {
                            alert("You must enter mission's name and description");
                            return;
                        }       
                        //Update existing mission
                        var foundIndex = data.findIndex(item => this.state.key == item.key);
                        if (foundIndex < 0) {
                            return; //not found
                        }
                        data[foundIndex].missionName = this.state.missionName;
                        data[foundIndex].description = this.state.missionDescription;
                        //Refresh flatlist item
                        this.state.missionItem.refreshMissionItem();
                        this.refs.myModal.close();                                                                       
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}