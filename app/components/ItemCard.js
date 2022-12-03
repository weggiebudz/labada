import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

function ItemCard({description, id, qty, onIncrement = () => {}, onDecrement = () => {}}) {
    const [quantity, setQuantity] = useState(qty);
    return (
        <View style={styles.container}>
            <Text style={[styles.label, {flex: 1}]}>{description}</Text>
            <TouchableOpacity onPress={onDecrement}>
                <Text style={{width: 25, height: 25, backgroundColor: 'yellow'}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.label}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrement}>
                <Text style={{width: 25, height: 25, backgroundColor: 'yellow'}}>+</Text>
            </TouchableOpacity>
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

export default ItemCard;