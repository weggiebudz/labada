import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS, SAFEAREAVIEW } from '../themes/Colors';
import { StackActions } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { ROUTES } from '../../Network';

function WelcomeScreen({ navigation }) {
    const [mobilephone, setMobilePhone] = useState('');
    const [password, setPassword] = useState('');
    const db = SQLite.openDatabase('labada_db');

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT, address TEXT, clientid INT)',
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

    const onNewAccount = () => {
        navigation.navigate('NewAccount');
    }

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    const onLogin = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobilephone: mobilephone,
                    password: password,
                })
            });
            const json = await response.json();

            if(json.customer_id){
                db.transaction(tx => {
                    tx.executeSql(`INSERT INTO credentials (fullname, address, clientid) VALUES (?,?,?)`,
                    [json.firstname + ' ' + json.lastname, json.address, json.customer_id],
                    () => {
                        navigation.dispatch(
                            StackActions.replace('DashboardStack') 
                        );
                    },
                    error => {
                        alert(error.message);
                    }
                    );
                });
            } else {
                alert("Invalid phone number or password.");
            }
        } catch(error) {
            alert(error.message);
        }
    }

    const onAdminLogin = () => {
        navigation.dispatch(
            StackActions.replace("AdminStack")
        );
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../assets/labadalogin.jpg')}/>
                </View>
                <Input label='Phone number' kbType='numeric' maxLength={11} onTextChange={newValue => setMobilePhone(newValue)}/>
                <Input label='Password' password={true} onTextChange={newValue => setPassword(newValue)}/>
                <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={onForgotPassword}>
                        <Text style={styles.touchableText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <Button label='Login →' onPress={onLogin}/>
                <View style={styles.signupContainer}>
                    <Text style={{fontSize: 15, marginTop: 2}}>Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={onNewAccount}>
                        <Text style={styles.touchableText}> Sign up now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <TouchableOpacity onPress={onAdminLogin}>
                        <Text style={styles.touchableText}>Login as Admin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    imageTitle: {
        width: 250,
        height: 130
    },
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
    touchableText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
    forgotContainer: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end'
    },
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    }
})

export default WelcomeScreen;