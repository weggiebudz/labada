import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Keyboard } from 'react-native';
import { COLORS } from '../../themes/Colors';
import Input from '../../components/Input';
import Button from '../../components/Button';

function Verification({ navigation }) {
    const onVerify = () => {
        navigation.navigate('ChangePassword');
    }

    const onTextChange = (item) => {
        if(item.length===6) Keyboard.dismiss();
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.SECONDARY}}>
            <View style={styles.pageContainer}>
                <Image style={styles.image}
                        source={require('../../assets/verification.png')}/>
                <Text style={styles.header}>Verification</Text>
                <Text style={styles.description}>Enter the verification code we just sent you on your email address.</Text>
                <Input label='••••••' password={true} kbType='numeric' maxLength={6} onTextChange={onTextChange}/>
                <View style={styles.nextBtnContainer}>
                    <Button label='Verify Code →' onPress={onVerify}/>
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

export default Verification;