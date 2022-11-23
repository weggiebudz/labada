import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {COLORS} from '../themes/Colors'

function ImageButton({ onPress = () => {},label, imagePath, rate}) {
    return (
            <View style={styles.buttonContainer}>
                <Image style={styles.image} source={imagePath}/>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.labelsecondary}>{rate}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 95,
        width: 95,
        borderRadius: 12,
        alignItems: 'center',
        margin: 7,
        shadowColor: 'lightgray',
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: '100%',
        backgroundColor: 'white'
    },
    label: {
        color: COLORS.PRIMARY,
        textAlign: 'center',
        flex: 1,
        fontSize: 17
    },
    labelsecondary: {
        color: COLORS.PRIMARY,
        textAlign: 'center',
        flex: 1,
        fontSize: 12
    },
    image: {
        height: 30,
        width: 30,
        margin: 10
    }
})

export default ImageButton;