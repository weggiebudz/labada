import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../Network';
import OrderDetailsCard from '../../../components/OrderDetailsCard';
import { COLORS } from '../../../themes/Colors';

function RiderForDeliverDetails({route, navigation}) {
    const ordItem = route.params.item;
    const [orderItems, setOrderItems] = useState([]);
    const [orderCode, setOrderCode] = useState([]);

    const onLoadDetails = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getOrderDetails', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid: ordItem.Order_ID
                })
            });
            const json = await response.json();
            setOrderItems(json);
        } catch(error) {
            console.log(error);
        }
    }

    const onGetOrderCodes = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getOrderCodes', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid: ordItem.Order_ID
                })
            });
            const json = await response.json();
            setOrderCode(json);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onLoadDetails();
        onGetOrderCodes();
    }, []);

    let statusIndex = require('../../../assets/pickup.png');

    switch(ordItem.Status){
        case 1:
            statusIndex = require('../../../assets/pickup.png');
            break;
        case 2:
            statusIndex = require('../../../assets/regular.png');
            break;
        case 3:
            statusIndex = require('../../../assets/delivery.png');
            break;
        default:
            statusIndex = require('../../../assets/complete.png');
            break;
    }

    const onDelivered = async () => {
        Alert.alert(
            "Update",
            "Update order?",
            [
              {
                text: "No",
                onPress: () => console.log("No Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: async () => { 
                    try {
                        const response = await fetch(ROUTES.URL + '/updateDelivered', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderid: ordItem.Order_ID
                            })
                        });
                        const json = await response.json();
                        console.log(json);
                        navigation.dispatch(
                            StackActions.popToTop()
                        );
                    } catch(error) {
                        console.log(error);
                    }
              } }
            ]
          );
    }

    return (
        <SafeAreaView>
            <View style={{height: '100%', padding: 20}}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailHeader}>{'Order #' + ordItem.Order_ID}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <Image style={styles.statusIcon} source={statusIndex}/>
                        <Text style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 17}}>{ordItem.Status_Desc}</Text>
                    </View>
                    <FlatList style={{width: '100%', padding: 10}} data={orderItems} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                        <OrderDetailsCard description={item.itemdesc} qty={item.qty}/>
                    }/>
                    <View style={{padding: 15}}>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>With QR: </Text>
                            <Text style={styles.label}>{ordItem.WithQRQty}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Pick up: </Text>
                            <Text style={styles.label}>{new Date(ordItem.Pickup_Date).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Pick up time: </Text>
                            <Text style={styles.label}>{ordItem.Time}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Deliver: </Text>
                            <Text style={styles.label}>{ordItem.Deliver_Date}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Weight: </Text>
                            <Text style={styles.label}>{ordItem.Weight} kilo/s</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, {flex: 1}]}>Amount: </Text>
                            <Text style={[styles.label, {color: 'green'}]}>₱ {ordItem.Amount.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList style={{width: '100%', padding: 5}} data={orderCode} numColumns={4} renderItem={({item}) => 
                            <View style={{backgroundColor: 'grey', margin: 2}}>
                                <Text style={{padding: 10, fontWeight: 'bold', color: COLORS.SECONDARY }}>{item.ItemCode_Desc}</Text>
                            </View>
                        }/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => { onDelivered() }}>
                            <View style={styles.button}>
                                <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center',flex: 1}}>DELIVERED</Text>
                            </View>
                        </TouchableOpacity>
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
    },
    button: {
        height: 80,
        width: 130,
        backgroundColor: COLORS.PRIMARY,
        margin: 20,
        alignSelf: 'center',
        alignContent: 'center',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
    }
})

export default RiderForDeliverDetails;