import React, {useState} from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { COLORS, SAFEAREAVIEW } from '../../../themes/Colors';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { StackActions } from '@react-navigation/native';
import { ROUTES } from '../../../../Network';
import OrderCard from '../../../components/OrderCard';

function RiderDashboard({navigation}) {
    const [user, setUser] = useState('');
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const db = SQLite.openDatabase('labada_db');

    const loadOrders = async () => {
        setRefresh(true);
        try{
            const response = await fetch(ROUTES.URL + '/getOrders', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const json = await response.json();
            setOrders(json);
            setRefresh(false);
        } catch(error) {
            console.log(error);
            setRefresh(false);
        }
    }

    const onOrderDetails = (item) => {
        navigation.navigate('Services',{item});
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
        loadOrders();
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
                <Text style={styles.titleHeader}>Orders</Text>
                <FlatList style={{width: '100%'}} data={orders} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => { loadOrders() }}/>} renderItem={({item}) => 
                    <OrderCard onPress={() => {onOrderDetails(item)}} label={item.fullname + ' #' + item.Order_ID} statusDesc={item.address} status={item.Status} price={'₱' + item.Amount.toLocaleString(undefined, {maximumFractionDigits:2})}/>
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
})

export default RiderDashboard;