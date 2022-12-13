import React, { useState } from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {COLORS} from '../themes/Colors'

function OrderCard({ onPress = () => {},label, price, statusDesc, status}) {
    let statusIndex = require('../assets/pickup.png');

    switch(status){
        case 1:
            statusIndex = require('../assets/pickup.png');
            break;
        case 2:
            statusIndex = require('../assets/regular.png');
            break;
        case 3:
            statusIndex = require('../assets/delivery.png');
            break;
        default:
            statusIndex = require('../assets/complete.png');
            break;
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image style={styles.image} source={require('../assets/order.png')}/>
                    <Image style={{
                                height: 22,
                                width: 22,
                                marginHorizontal: 16,
                                alignSelf: 'flex-end'
                    }} source={statusIndex}/>
                </View>
                <View>
                <Text style={styles.label}>{label}</Text>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <Text style={{fontWeight: 'bold', flex: 1}}>{statusDesc}</Text>
                </View>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 80,
        width: '100%',
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 7,
        backgroundColor: '#EBEDEF',
        flexDirection: 'row'
    },
    label: {
        color: COLORS.PRIMARY,
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    price: {
        color: COLORS.PRIMARY,
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-end',
        marginTop: 18,
        flex: 1,
        textAlign: 'right',
        marginRight: 14,
    },
    image: {
        height: 30,
        width: 30,
        marginHorizontal: 12,
        alignSelf: 'flex-start',
    }
})

export default OrderCard;