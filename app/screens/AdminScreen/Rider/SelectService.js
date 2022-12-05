import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ROUTES } from '../../../../Network';
import OrderCard from '../../../components/OrderCard';

function SelectService({route, navigation}) {
    const order = route.params.item;
    const [refresh, setRefresh] = useState(false);
    const [services, setServices] = useState([]);

    const onLoadServices = async() => {
        try{
            const response = await fetch(ROUTES.URL + '/getServices', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const json = await response.json();
            setServices(json);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onLoadServices();
    }, []);

    const onClickServices = (service) => {
        const data = {
            order: order,
            service: service
        }
        navigation.navigate('RiderOrderDetails',{data});
    }

    return (
        <SafeAreaView style={styles.safeareaview}>
            <FlatList style={{width: '100%', padding: 20}} data={services} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => { }}/>} renderItem={({item}) => 
                <OrderCard onPress={() => {onClickServices(item)}} label={item.servicename} price={'₱' + item.rate.toLocaleString(undefined, {maximumFractionDigits:2})}/>
            }/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeareaview: {

    }
})

export default SelectService;