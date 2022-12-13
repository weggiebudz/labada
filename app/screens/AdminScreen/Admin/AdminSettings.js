import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function AdminSettings({navigation}) {
    
    const onReportsScreen = () => {
        navigation.navigate('AdminReports');
    }

    const onOrderHistory = () => {
        navigation.navigate('AdminOrderHistory');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <View style={styles.button}>
                    <Image style={styles.image} source={require('../../../assets/man.png')}/>
                    <Text style={styles.text}>Users</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.button}>
                    <Image style={styles.image} source={require('../../../assets/item.png')}/>
                    <Text style={styles.text}>Items</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onReportsScreen}>
                <View style={styles.button}>
                    <Image style={styles.image} source={require('../../../assets/report.png')}/>
                    <Text style={styles.text}>Reports</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOrderHistory}>
                <View style={styles.button}>
                    <Image style={styles.image} source={require('../../../assets/history.png')}/>
                    <Text style={styles.text}>Order History</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    button: {
        borderWidth: 1,
        height: 80,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        margin: 10
    },
    image: {
        height: 50,
        width: 50
    },
    text: {
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22
    }
})

export default AdminSettings;