import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../themes/Colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { StackActions } from '@react-navigation/native';

function NewAccount({navigation}) {

    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [phonenumber, setPhoneNumber] = useState();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.SECONDARY}}>
            <View style={styles.pageContainer}>
                <Text style={styles.header}>Create New Account</Text>
                <Text style={styles.description}>Create an account so you can manage your personal finances.</Text>
                <Input defaultValue={firstname} onTextChange={newValue => setFirstName(newValue)} label='Firstname'/>
                <Input defaultValue={lastname} onTextChange={newValue => setLastName(newValue)} label='Lastname'/>
                <Input defaultValue={address} onTextChange={newValue => setAddress(newValue)} label='Address'/>
                <Input defaultValue={email} onTextChange={newValue => setEmail(newValue)} label='Email'/>
                <Input defaultValue={phonenumber} onTextChange={newValue => setPhoneNumber(newValue)} label='Phone number'/>
                <View style={styles.registerBtnContainer}>
                    <Button label='Next' onPress={() => {
                        if(firstname == null || lastname == null || 
                            email == null || address == null || phonenumber == null){
                            alert("Please complete all the fields.");
                        } else {
                            let basicInfo = {
                                "Firstname":firstname,
                                "Lastname":lastname,
                                "Address":address,
                                "Email":email,
                                "Phonenumber":phonenumber
                            };
                            navigation.navigate("NewAccount2",{basicInfo});
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
        marginTop: '10%',
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

export default NewAccount;