import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import SearchInput from '../components/SearchInput';
import ImageButton from '../components/ImageButton';
import { COLORS, SAFEAREAVIEW } from '../themes/Colors'
import OrderCard from '../components/OrderCard';
import FullButton from '../components/FullButton';
import { StackActions } from '@react-navigation/native';

function Dashboard({navigation}) {

    const orders = [
        {
            id: 1,
            amount: 0,
            pickup: '2022-11-15',
            deliver: '',
            kilo: 0,
            status: 1,
            statusDesc: 'For Pickup',
            items: [
                {
                    itemdesc: 'Jacket',
                    qty: 1
                },
                {
                    itemdesc: 'tshirt',
                    qty: 5
                },
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
                ,
                {
                    itemdesc: 'tshirt',
                    qty: 5
                },
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
            ]
        },
        {
            id: 2,
            amount: 200,
            pickup: '2022-11-13',
            deliver: '',
            kilo: 8,
            status: 2,
            statusDesc: 'In Progress...',
            items: [
                {
                    itemdesc: 'Jacket',
                    qty: 1
                },
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
            ]
        },
        {
            id: 3,
            amount: 198.50,
            pickup: '2022-11-13',
            deliver: '',
            kilo: 8,
            status: 3,
            statusDesc: 'For Delivery',
            items: [
                {
                    itemdesc: 'Jacket',
                    qty: 1
                },
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
            ]
        },{
            id: 4,
            amount: 1500.00,
            pickup: '2022-11-10',
            deliver: '2022-11-15',
            kilo: 10,
            status: 4,
            statusDesc: 'Delivered',
            items: [
                {
                    itemdesc: 'Jacket',
                    qty: 1
                },
                {
                    itemdesc: 'tshirt',
                    qty: 5
                }
            ]
        }
    ]

    const onScheduleOrder = async () => {
        navigation.navigate('ScheduleOrder');
    }

    const onLogout = () => {
        navigation.dispatch(
            StackActions.replace('WelcomeScreen')
        );
    }

    const onOrderDetails = (item) => {
        navigation.navigate('OrderDetails',{item});
    }

    return (
        <SafeAreaView style={SAFEAREAVIEW.droidsafearea}>
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}> 
                    <Image style={styles.imageTitle}
                    source={require('../assets/profile.png')}/>
                    <View>
                        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
                            <Text style={styles.nametag}>Hi, Johnny Knoxville</Text>
                            <Text style={styles.address}>Siaton, Negros Oriental</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1}}>
                        <TouchableOpacity onPress={onLogout}>
                            <View style={{alignItems: 'center', width: 55, height: 55, paddingTop: 5, borderRadius: 10,borderWidth: 1, alignSelf: 'flex-end'}}>
                                <Image style={{width: 25, height: 25}} source={require('../assets/logout.png')}/>
                                <Text>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.titleHeader}>Order History</Text>
                <FlatList style={{width: '100%'}} data={orders} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                    <OrderCard onPress={() => {onOrderDetails(item)}} label={'Order #' + item.id + ' (' + item.kilo + ' kilo/s)'} statusDesc={item.statusDesc} status={item.status} price={'₱' + item.amount.toLocaleString(undefined, {maximumFractionDigits:2})}/>
                }/>
                <View style={{width: '100%'}}>
                    <FullButton onPress={onScheduleOrder} label='book pick up' imagePath={require('../assets/appointment.png')}/>
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
        width: 50,
        height: 50,
    },
    pageContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.SECONDARY,
        height: '100%'
    },
    imageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    nametag: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    address: {
        marginTop: -2,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        marginTop: 20
    },
    flatList: {
        marginTop: 10,
        marginBottom: 20
    }
})

export default Dashboard;