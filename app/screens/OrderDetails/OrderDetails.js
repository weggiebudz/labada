import { StackActions, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { ROUTES } from '../../../Network';
import OrderDetailsCard from '../../components/OrderDetailsCard';
import { COLORS } from '../../themes/Colors';

function OrderDetails({route, navigation}) {
    const item = route.params.item;
    const [orderItems, setOrderItems] = useState([]);
    const [orderCode, setOrderCode] = useState([]);

    const onGetOrderCodes = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getOrderCodes', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid: item.id
                })
            });
            const json = await response.json();
            setOrderCode(json);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadOrderDetails();
        onGetOrderCodes();
    }, []);

    const loadOrderDetails = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getOrderDetails', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid: item.id
                })
            });
            const json = await response.json();
            console.log(json);
            setOrderItems(json);
        } catch(error) {
            console.log(error);
        }
    };

    let statusIndex = require('../../assets/pickup.png');

    switch(item.status){
        case 1:
            statusIndex = require('../../assets/pickup.png');
            break;
        case 2:
            statusIndex = require('../../assets/regular.png');
            break;
        case 3:
            statusIndex = require('../../assets/delivery.png');
            break;
        default:
            statusIndex = require('../../assets/complete.png');
            break;
    }

    const onPressConfirmed = async() => {
        try{
            const response = await fetch(ROUTES.URL + '/orderConfirmed', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid: item.id
                })
            });
            const json = await response.json().finally(() => {
                Alert.alert(
                    "Confirm",
                    "Order Confirmed.",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                            navigation.dispatch(
                                StackActions.popToTop()
                            );
                        }
                      }
                    ]
                  );
            });
            
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView>
            <View style={{height: '100%', padding: 20}}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailHeader}>{'Order #' + item.id}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <Image style={styles.statusIcon} source={statusIndex}/>
                        <Text style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 17}}>{item.statusDesc}</Text>
                    </View>
                    <FlatList style={{width: '100%', padding: 10}} data={orderItems} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                        <OrderDetailsCard description={item.itemdesc} qty={item.qty}/>
                    }/>
                    <View style={{padding: 15}}>
                        <View>
                            <FlatList style={{width: '100%', padding: 5}} data={orderCode} numColumns={4} renderItem={({item}) => 
                                <View style={{backgroundColor: 'grey', margin: 2}}>
                                    <Text style={{padding: 10, fontWeight: 'bold', color: COLORS.SECONDARY }}>{item.ItemCode_Desc}</Text>
                                </View>
                            }/>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>With QR: </Text>
                            <Text style={styles.label}>{item.withqr}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Pick up: </Text>
                            <Text style={styles.label}>{new Date(item.pickup).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Pick up time: </Text>
                            <Text style={styles.label}>{item.time}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Deliver: </Text>
                            <Text style={styles.label}>{new Date(item.deliver).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Weight: </Text>
                            <Text style={styles.label}>{item.kilo} kilo/s</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Amount: </Text>
                            <Text style={[styles.label, {color: 'green'}]}>₱ {item.amount.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                        </View>
                            {
                            !item.isConfirmed && item.status === 4 ?
                                <View style={{backgroundColor: COLORS.PRIMARY, alignSelf: 'center', borderRadius: 10}}>
                                    <TouchableOpacity style={{width: 150, height: 50, alignItems: 'center', flexDirection: 'row'}} onPress={onPressConfirmed}>
                                            <Text style={{fontWeight: 'bold', textTransform: 'uppercase', width: '100%', textAlign: 'center', color: COLORS.SECONDARY}}>Confirm</Text>
                                    </TouchableOpacity>
                                </View> : null
                            }
                            {
                                item.isConfirmed ?
                                <Text style={{backgroundColor: 'green', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 15, padding: 5, color: 'white'}}>Confirmed</Text>
                                : null
                            }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#D5DBDB',
        borderRadius: 10,
        height: '100%',
    },
    detailHeader: {
        alignSelf: 'center',
        margin: 12,
        fontWeight: 'bold',
        fontSize: 20
    },
    statusIcon: {
        height: 22,
        width: 22,
        marginHorizontal: 5
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    labelContainer: {
        flexDirection: 'row',
        margin: 5
    }
})

export default OrderDetails;