import React from 'react';
import {TextInput, StyleSheet, View, Image} from 'react-native';
import { COLORS } from '../themes/Colors';

function SearchInput({label}) {
    return (
        <View style={{marginBottom: 20}}>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/search.png')}/>
                <TextInput style={styles.textInput} placeholderTextColor='gray' placeholder={label} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#F2F4F4',
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    textInput: {
        marginRight: 15,
        width: '100%',
        fontSize: 17,
        flex: 1,
        color: COLORS.PRIMARY,
    },
    image: {
        width: 24,
        height: 24,
        margin: 10,
    }
})

export default SearchInput;