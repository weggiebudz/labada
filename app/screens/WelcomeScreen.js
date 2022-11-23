import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS, SAFEAREAVIEW } from '../themes/Colors';
import { StackActions } from '@react-navigation/native';

function WelcomeScreen({ navigation }) {
    const onNewAccount = () => {
        navigation.navigate('NewAccount');
    }

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    const onLogin = () => {
        navigation.dispatch(
            StackActions.replace('DashboardStack')
        );
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../assets/labadalogin.jpg')}/>
                </View>
                <Input label='Phone number'/>
                <Input label='Password' password={true}/>
                <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={onForgotPassword}>
                        <Text style={styles.touchableText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <Button label='Login →' onPress={onLogin}/>
                <View style={styles.signupContainer}>
                    <Text style={{fontSize: 15, marginTop: 2}}>Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={onNewAccount}>
                        <Text style={styles.touchableText}> Sign up now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <TouchableOpacity onPress={onNewAccount}>
                        <Text style={styles.touchableText}>Login as Admin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    imageTitle: {
        width: 250,
        height: 130
    },
    pageContainer: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: COLORS.SECONDARY,
        height: '100%'
    },
    imageContainer: {
        padding: 40,
        alignItems: 'center',
    },
    touchableText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.PRIMARY
    },
    forgotContainer: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end'
    },
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    }
})

export default WelcomeScreen;