import React, {useState} from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SAFEAREAVIEW } from '../../../themes/Colors';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { StackActions } from '@react-navigation/native';

function RiderDashboard({navigation}) {
    const [user, setUser] = useState('');
    const db = SQLite.openDatabase('labada_db');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM user`,
            null,
            (err, result) => {
                const userContext = result.rows._array[0];
                setUser(userContext);
            },
            error => {
                alert(error.message);
            }
            );
        });
    },[]);

    const onLogout = () => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM user`,
            [],
            () => {
                navigation.dispatch(
                    StackActions.replace('AdminLogin')
                );
            },
            error => {
                alert(error.message);
            }
            );
        });
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../../../assets/profile.png')}/>
                    <View>
                        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
                            <Text style={styles.nametag}>Hi, {user.fullname}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1}}>
                        <TouchableOpacity onPress={onLogout}>
                            <View style={{alignItems: 'center', width: 55, height: 55, paddingTop: 5, borderRadius: 10,borderWidth: 1, alignSelf: 'flex-end'}}>
                                <Image style={{width: 25, height: 25}} source={require('../../../assets/logout.png')}/>
                                <Text>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        height: '100%'
    },
    imageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    imageTitle: {
        width: 50,
        height: 50,
    },
    nametag: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default RiderDashboard;