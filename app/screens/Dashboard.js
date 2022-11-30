import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import SearchInput from '../components/SearchInput';
import ImageButton from '../components/ImageButton';
import { COLORS, SAFEAREAVIEW } from '../themes/Colors'
import OrderCard from '../components/OrderCard';
import FullButton from '../components/FullButton';
import { StackActions } from '@react-navigation/native';
import { ROUTES } from '../../Network';
import { useEffect } from 'react';

function Dashboard({navigation}) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrderHistory();
    }, []);

    const loadOrderHistory = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getOrderHistory', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerid: 1
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

    const onLogout = () => {
        navigation.dispatch(
            StackActions.replace('WelcomeScreen')
        );
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
                            <Text style={styles.nametag}>Hi, Johnny Knoxville</Text>
                            <Text style={styles.address}>Siaton, Negros Oriental</Text>
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
                <FlatList style={{width: '100%'}} data={orders} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                    <OrderCard onPress={() => {onOrderDetails(item)}} label={'Order #' + item.id + ' (' + item.kilo + ' kilo/s)'} statusDesc={item.statusDesc} status={item.status} price={'₱' + item.amount.toLocaleString(undefined, {maximumFractionDigits:2})}/>
                }/>
                <View style={{width: '100%'}}>
                    <FullButton onPress={onScheduleOrder} label='book pick up' imagePath={require('../assets/appointment.png')}/>
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