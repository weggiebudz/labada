import React from 'react';
import {TextInput, StyleSheet, View, Keyboard} from 'react-native';
import { COLORS } from '../themes/Colors';

function Input({defaultValue,label, iconName, error, password=false, onFocus = () => {}, kbType, maxLength, onTextChange = () => {}}) {
    return (
        <View style={{marginBottom: 20}}>
            <View style={styles.inputContainer}>
                <TextInput defaultValue={defaultValue} onChangeText={onTextChange} style={styles.textInput} placeholderTextColor='gray' placeholder={label} secureTextEntry={password} keyboardType={kbType} maxLength={maxLength}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 55,
        width: '100%',
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
        borderRadius: 10
    },
    textInput: {
        marginHorizontal: 20,
        width: '100%',
        fontSize: 17,
        flex: 1,
        color: COLORS.PRIMARY
    }
})

export default Input;