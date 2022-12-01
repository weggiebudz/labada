import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../themes/Colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { StackActions } from '@react-navigation/native';

function NewAccount2({route, navigation}) {
    let basicInfo = route.params.basicInfo;

    useEffect(() => {
        console.log(basicInfo);
    }, []);
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.SECONDARY}}>
            <View style={styles.pageContainer}>
                <Text style={styles.header}>Please create your password</Text>
                <Text style={styles.description}>Create your password for your security.</Text>
                <Input label='Password' password={true}/>
                <Input label='Re-enter Password' password={true}/>
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
        padding: 20,
        backgroundColor: COLORS.SECONDARY,
    },
    registerBtnContainer: {
        alignItems: 'center',
        marginTop: '30%',
        width: '100%',
        flex: 1
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

export default NewAccount2;