import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { COLORS } from '../../themes/Colors';
import Input from '../../components/Input';
import Button from '../../components/Button';

function ForgotPassword({navigation}) {
    const onNext = () => {
        navigation.navigate('Verification');
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.SECONDARY}}>
            <View style={styles.pageContainer}>
                <Image style={styles.image}
                        source={require('../../assets/forgot.png')}/>
                <Text style={styles.header}>Forgot Password?</Text>
                <Text style={styles.description}>Please enter your e-mail address to receive verification code.</Text>
                <Input label='example@email.com' kbType='email-address'/>
                <View style={styles.nextBtnContainer}>
                    <Button label='Next →' onPress={onNext}/>
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
    nextBtnContainer: {
        alignItems: 'center',
        marginTop: '20%',
        width: '100%'
    },
    image: {
        width: 150,
        height: 150,
        margin: 30
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

export default ForgotPassword;