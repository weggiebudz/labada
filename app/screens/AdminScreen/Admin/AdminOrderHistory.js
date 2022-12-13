import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ROUTES } from '../../../../Network';
import OrderCard from '../../../components/OrderCard';
import { COLORS, SAFEAREAVIEW } from '../../../themes/Colors';

function AdminOrderHistory({navigation}) {
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const onGetOrders = async () => {
        setRefresh(true);
        try{
            const response = await fetch(ROUTES.URL + '/adminOrdersHistory', {
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

    useEffect(() => {
        onGetOrders();
    },[]);

    const onOrderDetails = (item) => {
        const params = {
            'item': item,
            'isOrderHistory': true
        }
        navigation.navigate('AdminOrderDetails',{params});
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <FlatList style={{width: '100%'}} data={orders} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => { onGetOrders() }}/>} renderItem={({item}) => 
                    <OrderCard onPress={() => { onOrderDetails(item) }} label={item.fullname + ' #' + item.Order_ID} statusDesc={item.address} status={item.Status} price={'₱' + item.Amount.toLocaleString(undefined, {maximumFractionDigits:2})}/>
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
})

export default AdminOrderHistory;