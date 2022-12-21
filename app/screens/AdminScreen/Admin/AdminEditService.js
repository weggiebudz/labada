import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../Network';
import { COLORS } from '../../../themes/Colors';

function AdminEditService({route, navigation}) {
    const [servicename, setServicename] = useState('');
    const [rate, setRate] = useState('');

    const service = route.params.item;

    const onBack = () => {
        navigation.dispatch(
            StackActions.pop()
        );
    }

    const onSave = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/editService', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    servicename: servicename.toString(),
                    rate: rate,
                    serviceid: service.serviceid
                })
            });
            const json = await response.json();
            if(json){
                navigation.dispatch(
                    StackActions.pop()
                );
            }
        } catch(error) {
            console.log(error);
        }
    }

    const onDelete = async () => {
        Alert.alert(
            "DELETE",
            "Delete service?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("No Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: async () => { 
                try{
                    const response = await fetch(ROUTES.URL + '/deleteService', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            serviceid: service.serviceid
                        })
                    });
                    const json = await response.json();
                    if(json){
                        navigation.dispatch(
                            StackActions.pop()
                        );
                    }
                } catch(error) {
                    console.log(error);
                }
              } }
            ]
          );
    }

    return (
        <SafeAreaView>
            <View style={{padding: 10, borderWidth: 1, borderRadius: 10, margin: 15}}>
                <TextInput placeholder='Description' defaultValue={service.servicename} onChangeText={value => setServicename(value)}/>
            </View>
            <View style={{padding: 10, borderWidth: 1, borderRadius: 10, margin: 15, marginTop: 5}}>
                <TextInput placeholder='Rate' keyboardType='numeric' defaultValue={service.rate.toString()} onChangeText={value => setRate(value)}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, margin: 15, marginRight: 7.5}} onPress={onDelete}>
                    <View style={{backgroundColor: 'maroon', padding: 10, borderRadius: 10}}>
                        <Text style={{textAlign: 'center', color: COLORS.SECONDARY}}>Delete</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, margin: 15, marginRight: 7.5}} onPress={onBack}>
                    <View style={{backgroundColor: COLORS.PRIMARY, padding: 10, borderRadius: 10}}>
                        <Text style={{textAlign: 'center', color: COLORS.SECONDARY}}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, margin: 15, marginLeft: 7.5}} onPress={onSave}>
                    <View style={{backgroundColor: COLORS.PRIMARY, padding: 10, borderRadius: 10}}>
                        <Text style={{textAlign: 'center', color: COLORS.SECONDARY}}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
})

export default AdminEditService;