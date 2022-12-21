import { StackActions } from '@react-navigation/native';
import React,{ useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert} from 'react-native';
import { ROUTES } from '../../../../Network';
import { COLORS } from '../../../themes/Colors';

function AdminAddService({navigation}) {
    const [servicename, setServicename] = useState('');
    const [rate, setRate] = useState('');

    const onBack = () => {
        navigation.dispatch(
            StackActions.pop()
        );
    }

    const onSave = async () => {
        Alert.alert(
            "SAVE",
            "Save service?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("No Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: async () => { 
                try{
                    const response = await fetch(ROUTES.URL + '/addService', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            servicename: servicename.toString(),
                            rate: rate
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
                <TextInput placeholder='Description' onChangeText={value => setServicename(value)}/>
            </View>
            <View style={{padding: 10, borderWidth: 1, borderRadius: 10, margin: 15, marginTop: 5}}>
                <TextInput placeholder='Rate' keyboardType='numeric' onChangeText={value => setRate(value)}/>
            </View>
            <View style={{flexDirection: 'row'}}>
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

export default AdminAddService;