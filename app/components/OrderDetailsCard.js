import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function OrderDetailsCard({description, qty}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, {flex: 1}]}>{description}</Text>
            <Text style={styles.label}>{qty}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 5,
        padding: 5
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
})

export default OrderDetailsCard;