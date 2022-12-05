import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, RefreshControl } from 'react-native';
import { ROUTES } from '../../../Network';
import OrderDetailsCard from '../../components/OrderDetailsCard';

function OrderDetails({route, navigation}) {
    const item = route.params.item;
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        loadOrderDetails();
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
                        <Text style={styles.label}>{item.deliver}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, {flex: 1}]}>Weight: </Text>
                        <Text style={styles.label}>{item.kilo} kilo/s</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, {flex: 1}]}>Amount: </Text>
                        <Text style={[styles.label, {color: 'green'}]}>₱ {item.amount.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                    </View>
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