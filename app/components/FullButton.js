import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {COLORS} from '../themes/Colors'

function FullButton({ onPress = () => {},label, imagePath}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Image style={styles.image} source={imagePath}/>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 80,
        width: '100%',
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 12,
        flexDirection: 'row',
        backgroundColor: '#34495E'
    },
    label: {
        color: COLORS.SECONDARY,
        textAlign: 'center',
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    image: {
        height: 40,
        width: 40,
        margin: 20
    }
})

export default FullButton;