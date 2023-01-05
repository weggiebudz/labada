import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ROUTES } from '../../../../Network';
import { COLORS } from '../../../themes/Colors';
import io from 'socket.io-client';

function AdminAddUser({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [usertype, setUsertype] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        onGetUser();

        const socket = io(ROUTES.URL.replace('/api',''));

        socket.on('chatMessage', msg => {
            onGetUser();
        });

        return () => {
            socket.disconnect();
        }
    },[]);

    const onGetUser = async () => {
        const response = await fetch(ROUTES.URL + '/getUsers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const json = await response.json()
        setUsers(json);
    }

    const onCancel = () => {
        navigation.dispatch(
            StackActions.pop()
        );
    }

    const onAddUser = async () => {
        const response = await fetch(ROUTES.URL + '/saveUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                usertype: usertype
            })
        });
        const json = await response.json().then(() => {
            const socket = io(ROUTES.URL.replace('/api',''));

            socket.emit('chatMessage', 'any');

            setUsername('');
            setPassword('');
            setFirstname('');
            setLastName('');
            setUsertype(null);
        });
    }

    return (
        <SafeAreaView>
            <View style={styles.maincontent}>
                <View style={styles.textinputboarder}>
                    <TextInput style={styles.textinput} value={username} placeholder='Username' onChangeText={newValue => setUsername(newValue)}/>
                </View>
                <View style={styles.textinputboarder}>
                    <TextInput style={styles.textinput} value={password} placeholder='Password' onChangeText={newValue => setPassword(newValue)}/>
                </View>
                <View style={styles.textinputboarder}>
                    <TextInput style={styles.textinput} value={firstname} placeholder='Firstname' onChangeText={newValue => setFirstname(newValue)}/>
                </View>
                <View style={styles.textinputboarder}>
                    <TextInput style={styles.textinput} value={lastname} placeholder='Lastname' onChangeText={newValue => setLastName(newValue)}/>
                </View>
                <View style={[styles.textinputboarder, {alignItems: 'center'}]}>
                    <SelectDropdown style={styles.dropdown}
                        data={[{id: 1, label: 'Admin'},{id: 2, label: 'Rider'}]} 
                        // defaultButtonText={0}
                        onSelect={(selectedItem, index) => {
                            setUsertype(selectedItem.id);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.label;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.label;
                        }}
                        selectedRowTextStyle={styles.dropdown}
                        rowStyle={styles.dropdown}
                        dropdownStyle={styles.dropdown}
                        buttonTextStyle={styles.dropdown}
                        buttonStyle={styles.dropdown}
                        defaultButtonText='Select User Type'
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={onCancel} style={{flex: 1, borderWidth: 1, padding: 12, margin: 5, borderRadius: 10, backgroundColor: 'maroon'}}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onAddUser} style={{flex: 1, borderWidth: 1, padding: 12, margin: 5, borderRadius: 10, backgroundColor: COLORS.PRIMARY}}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 17, paddingTop: 17}}>
                    <Text style={[styles.label, {width:12}]}>T</Text>
                    <Text style={[styles.label, {flex: 1}]}>Firstname</Text>
                    <Text style={[styles.label, {flex: 1, alignSelf: 'center'}]}>Lastname</Text>
                    <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>Username</Text>
                    <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>Password</Text>
                </View>
                <FlatList style={{width: '100%', padding: 12}} data={users} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                    <View style={{flexDirection: 'row', alignItems: 'center', margin: 2, flex: 1}}>
                            <View style={{flexDirection: 'row', backgroundColor: '#D6EAF8', padding: 5, borderRadius: 5}}>
                            <Text style={[styles.label, { alignSelf: 'center', width: 12}]}>{item.usertype}</Text>
                            <Text style={[styles.label, {flex: 1}]}>{item.firstname}</Text>
                            <Text style={[styles.label, {flex: 1, alignSelf: 'center'}]}>{item.lastname}</Text>
                            <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>{item.username}</Text>
                            <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>{item.password}</Text>
                        </View>
                    </View>                      
                }/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textinput: {
        padding: 7,
        fontSize: 20
    },
    textinputboarder: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    maincontent: {
        padding: 10
    },
    dropdown: {
        borderRadius: 10,
    },
    buttonText : {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12
    },
})

export default AdminAddUser;