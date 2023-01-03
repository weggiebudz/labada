import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity, RefreshControl, RecyclerViewBackedScrollView } from 'react-native';
import SearchInput from '../components/SearchInput';
import ImageButton from '../components/ImageButton';
import { COLORS, SAFEAREAVIEW } from '../themes/Colors'
import OrderCard from '../components/OrderCard';
import FullButton from '../components/FullButton';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { ROUTES } from '../../Network';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

function Dashboard({navigation}) {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const db = SQLite.openDatabase('labada_db');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM credentials`,
            null,
            (err, result) => {
                const userContext = result.rows._array[0];
                setUser(userContext);
                loadOrderHistory(userContext);
            },
            error => {
                alert(error.message);
            }
            );
        });
    }, []);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         loadOrderHistory(user);
    //       }, [])
    // );

    const loadOrderHistory = async (userInfo) => {
        try{
            const response = await fetch(ROUTES.URL + '/getOrderHistory', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerid: userInfo.clientid
                })
            });
            const json = await response.json();
            setOrders(json);
        } catch(error) {
            console.log(error);
        }
    };

    const onScheduleOrder = async () => {
        navigation.navigate('ScheduleOrder');
    }

    const onPressMemberChat = async () => {
        navigation.navigate('MemberChat');
    }

    const onLogout = () => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM credentials`,
            [],
            () => {
                navigation.dispatch(
                    StackActions.replace('WelcomeScreen')
                );
            },
            error => {
                alert(error.message);
            }
            );
        });
    }

    const onOrderDetails = (item) => {
        navigation.navigate('OrderDetails',{item});
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../assets/profile.png')}/>
                    <View>
                        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
                            <Text style={styles.nametag}>Hi, {user.fullname}</Text>
                            <Text style={styles.address}>{user.address}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1}}>
                        <TouchableOpacity onPress={onLogout}>
                            <View style={{alignItems: 'center', width: 55, height: 55, paddingTop: 5, borderRadius: 10,borderWidth: 1, alignSelf: 'flex-end'}}>
                                <Image style={{width: 25, height: 25}} source={require('../assets/logout.png')}/>
                                <Text>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.titleHeader}>Order History</Text>
                <FlatList style={{width: '100%'}} data={orders} refreshControl={<RefreshControl refreshing={false} onRefresh={() => { loadOrderHistory(user) }}/>} renderItem={({item}) => 
                    <OrderCard onPress={() => {onOrderDetails(item)}} label={'Order #' + item.id + ' (' + item.kilo + ' kilo/s)'} statusDesc={item.statusDesc} status={item.status} price={'₱' + item.amount.toLocaleString(undefined, {maximumFractionDigits:2})}/>
                }/>
                <View style={{width: '100%', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onPressMemberChat} style={{backgroundColor: COLORS.PRIMARY, flex: 1, borderRadius: 18, marginVertical: 12, marginRight: 6, justifyContent: 'center'}}>
                        <View>
                            <Image style={{alignSelf: 'center'}} source={require('../assets/chat.png')}/>
                            <Text style={{color: COLORS.SECONDARY, alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>CHAT</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex: 3, marginLeft: 6}}>
                        <FullButton onPress={onScheduleOrder} label='book pick up' imagePath={require('../assets/appointment.png')}/>
                    </View>
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
        width: 50,
        height: 50,
    },
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
    nametag: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    address: {
        marginTop: -2,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        marginTop: 20
    },
    flatList: {
        marginTop: 10,
        marginBottom: 20
    }
})

export default Dashboard;