import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../themes/Colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { StackActions } from '@react-navigation/native';
import { ROUTES } from '../../../Network';

function NewAccount2({route, navigation}) {
    let basicInfo = route.params.basicInfo;
    const [password, setPassword] = useState(null);
    const [repass, setRepass] = useState(null);

    useEffect(() => {
        //console.log(basicInfo);
    }, []);

    const saveInfo = async (info) => {
        try{
            const response = await fetch(ROUTES.URL + '/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: info.Firstname,
                    lastname: info.Lastname,
                    address: info.Address,
                    email: info.Email,
                    phonenumber: info.Phonenumber,
                    password: password})
            });
            const json = await response.json();
            console.log(json);
        } catch(error) {
            console.log(error);
        } finally {
            navigation.dispatch(
                StackActions.popToTop()
            );
        }
    }
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.SECONDARY}}>
            <View style={styles.pageContainer}>
                <Text style={styles.header}>Please create your password</Text>
                <Text style={styles.description}>Create your password for your security.</Text>
                <Input label='Password' password={true} onTextChange={newValue => setPassword(newValue)}/>
                <Input label='Re-enter Password' password={true} onTextChange={newValue => setRepass(newValue)}/>
                <View style={styles.registerBtnContainer}>
                    <Button label='Register' onPress={() => {
                        if(password == null && repass == null){
                            alert("Please fill up the fields.");
                        }
                        else if (password == '' && repass == ''){
                            alert("Please fill up the fields.");
                        } else {
                            if(password == repass){
                                saveInfo(basicInfo);
                            } else {
                                alert("Password and Confirmation do not match.");
                            }
                        }
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.SECONDARY,
    },
    registerBtnContainer: {
        alignItems: 'center',
        marginTop: '30%',
        width: '100%',
        flex: 1
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%'
    },
    description: {
        fontSize: 15,
        marginVertical: 15,
        width: '100%'
    }
})

export default NewAccount2;