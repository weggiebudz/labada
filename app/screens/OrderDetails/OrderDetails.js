import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

function OrderDetails({route, navigation}) {
    const item = route.params.item;

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
                    <Text style={styles.detailHeader}>{'Order #' + item.id + ' (' + item.kilo + ' kilo/s)'}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <Image style={styles.statusIcon} source={statusIndex}/>
                        <Text style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 17}}>{item.statusDesc}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Amount : {item.amount}</Text>
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

    }
})

export default OrderDetails;