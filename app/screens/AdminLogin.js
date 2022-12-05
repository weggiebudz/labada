import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SAFEAREAVIEW } from '../themes/Colors';
import Input from '../components/Input';
import Button from '../components/Button';
import * as SQLite from 'expo-sqlite';
import { ROUTES } from '../../Network';
import { StackActions } from '@react-navigation/native';

function AdminLogin({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const db = SQLite.openDatabase('labada_db');

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT, userid INT, usertype INT)',
                [],
                (sqltxt, res) => {
                    console.log('table created successfully!');
                },
                error => {
                    console.log('error on creating table ' + error.message);
                }
            )
        })
    }

    useEffect(() => {
        createTable();
    },[]);

    const onLogin = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/adminlogin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            });
            const json = await response.json();

            if(json.usertype == 1){
                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO user (fullname, userid, usertype) VALUES (?,?,?)`,
                    [json.firstname + ' ' + json.lastname, json.userid, json.usertype],
                    () => {
                        navigation.dispatch(
                            StackActions.replace('AdminDashboard')
                        );
                    },
                    error => {
                        alert(error.message);
                    }
                    );
                });
            }
            else if (json.usertype == 2) {
                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO user (fullname, userid, usertype) VALUES (?,?,?)`,
                    [json.firstname + ' ' + json.lastname, json.userid, json.usertype],
                    () => {
                        navigation.dispatch(
                            StackActions.replace('RiderDashboard')
                        );
                    },
                    error => {
                        alert(error.message);
                    }
                    );
                });
            } else {
                alert("Invalid username or password.");
            }
        } catch(error) {
            alert(error.message);
        }
    }

    const onMemberLogin = () => {
        navigation.dispatch(
            StackActions.replace("WelcomeScreen")
        );
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../assets/labadalogin.jpg')}/>
                </View>
                <Text style={{fontWeight: 'bold', fontSize: 20, margin: 20}}>Admin Login</Text>
                <Input label='Username' maxLength={11} onTextChange={newValue => setUsername(newValue)}/>
                <Input label='Password' password={true} onTextChange={newValue => setPassword(newValue)}/>
                <Button label='Login →' onPress={onLogin}/>
                <View style={styles.signupContainer}>
                    <TouchableOpacity onPress={onMemberLogin}>
                        <Text style={styles.touchableText}>Login as member</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: COLORS.SECONDARY,
        height: '100%'
    },
    imageContainer: {
        padding: 40,
        alignItems: 'center',
    },
    imageTitle: {
        width: 250,
        height: 130
    },
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    },
    touchableText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
})

export default AdminLogin;