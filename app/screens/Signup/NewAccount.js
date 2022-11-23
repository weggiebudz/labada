import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../themes/Colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { StackActions } from '@react-navigation/native';

function NewAccount({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.SECONDARY}}>
            <View style={styles.pageContainer}>
                <Text style={styles.header}>Create New Account</Text>
                <Text style={styles.description}>Create an account so you can manage your personal finances.</Text>
                <Input label='Enter phone number'/>
                <Input label='Password' password={true}/>
                <Input label='Confirm Password' password={true}/>
                <View style={styles.registerBtnContainer}>
                    <Button label='Register' onPress={() => {
                        navigation.dispatch(
                            StackActions.popToTop()
                        );
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: COLORS.SECONDARY,
    },
    registerBtnContainer: {
        alignItems: 'center',
        marginTop: '30%',
        width: '100%'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%'
    },
    description: {
        fontSize: 15,
        marginVertical: 15,
        width: '100%'
    }
})

export default NewAccount;