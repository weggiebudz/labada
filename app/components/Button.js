import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../themes/Colors'

function Button({ onPress = () => {},label}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: COLORS.PRIMARY,
        height: 55,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    label: {
        color: COLORS.SECONDARY,
        textAlign: 'center',
        flex: 1,
        fontSize: 17
    }
})

export default Button;