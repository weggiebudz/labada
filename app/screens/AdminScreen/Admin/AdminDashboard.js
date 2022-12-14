import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageButton from '../../../components/ImageButton';
import { COLORS, SAFEAREAVIEW } from '../../../themes/Colors';
import * as SQLite from 'expo-sqlite';
import { StackActions } from '@react-navigation/native';

function AdminDashboard({navigation}) {
    const [menu, setMenu] = useState([]);
    const [user, setUser] = useState('');
    const db = SQLite.openDatabase('labada_db');

    const loadMenu = () => {
        setMenu([
            {
                "id": 0,
                "label": "Orders",
                "imagePath": require('../../../assets/laundryorder.png')
            },
            {
                "id": 1,
                "label": "Management",
                "imagePath": require('../../../assets/gear.png')
            }
        ]);
    }

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
        loadMenu();
    },[]);

    const onLogout = () => {
        console.log('out');
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

    const onMenuPress = (item) => {
        switch(item.id){
            case 0:
                navigation.navigate('AdminOrders');
                break;
            case 1:
                navigation.navigate('AdminSettings');
                break;
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../../../assets/deliveryman.png')}/>
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
                <Text style={styles.titleHeader}>Menu</Text>
                <FlatList style={styles.flatList} numColumns={3} data={menu} renderItem={({item}) => 
                    <TouchableOpacity style={{borderWidth: 1, margin: 5, borderRadius: 10}} onPress={() => { onMenuPress(item) }}>
                        <ImageButton label={item.label} imagePath={item.imagePath} />
                    </TouchableOpacity>
                }/>
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
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        marginTop: 20
    },
    flatList: {
        padding: 30,
    },
})

export default AdminDashboard;