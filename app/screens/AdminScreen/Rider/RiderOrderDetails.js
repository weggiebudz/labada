import { StackActions } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl, Modal, Pressable, TextInput } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { ROUTES } from '../../../../Network';
import Button from '../../../components/Button';
import ItemCard from '../../../components/ItemCard';
import { COLORS } from '../../../themes/Colors';
import * as SQLite from 'expo-sqlite';
import Checkbox from 'expo-checkbox';

function RiderOrderDetails({route, navigation}) {
    const item = route.params.data.order;
    const itemService = route.params.data.service;
    const [itemList, setItemList] = useState([]);
    const [withQRCode, setWithQRCode] = useState('');
    const [weight, setWeight] = useState('');
    const [amount, setAmount] = useState('');
    const [codeAmount, setCodeAmount] = useState(0);
    const db = SQLite.openDatabase('labada_db');
    const [user, setUser] = useState('');

    const [itemCode, setItemCode] = useState([
        {
            id: 1,
            desc: 'L-001',
            isChecked: false
        },
        {
            id: 2,
            desc: 'L-002',
            isChecked: false
        },        
        {
            id: 3,
            desc: 'L-003',
            isChecked: false
        },
        {
            id: 4,
            desc: 'L-004',
            isChecked: false
        },
        {
            id: 5,
            desc: 'L-005',
            isChecked: false
        },
        {
            id: 6,
            desc: 'L-006',
            isChecked: false
        },
        {
            id: 7,
            desc: 'L-007',
            isChecked: false
        },
        {
            id: 8,
            desc: 'L-008',
            isChecked: false
        },
        {
            id: 9,
            desc: 'L-009',
            isChecked: false
        },
        {
            id: 10,
            desc: 'L-010',
            isChecked: false
        },
    ]);

    const getItems = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getItems', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const json = await response.json();
            setItemList(json);
        } catch(error) {
            console.log(error);
        }
    }

    const userContx = () => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM user`,
            null,
            (err, result) => {
                const userContext = result.rows._array[0];
                setUser(userContext);
            },
            error => {
                alert(error.message);
            }
            );
        });
    }

    const orderUpdateSave = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/updateOrder', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderitems : itemList,
                    order: item,
                    weight: weight,
                    amount: amount,
                    withqr: withQRCode,
                    serviceid: itemService.serviceid.toString(),
                    riderid: user.userid,
                    itemCode: itemCode
                })
            });
            const json = await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userContx();
        getItems();
    },[]);

    useEffect(() => {
        setWithQRCode(itemCode.filter(a => a.isChecked).length.toString());
        setCodeAmount((itemCode.filter(a => a.isChecked).length * 5));
    }, [itemCode]);

    const actions = [
        {
          text: "Save",
          icon: require('../../../assets/save.png'),
          name: "bt_Save",
          position: 1,
          color: COLORS.PRIMARY,
          textStyle: {
            fontWeight: 'bold',
            color: COLORS.PRIMARY
          }
        },
    ]

    const onOpen = (name) => {
        if(name=='bt_Save'){
            orderUpdateSave();
            navigation.dispatch(
                StackActions.popToTop()
            );
        }
    }

    let statusIndex = require('../../../assets/pickup.png');

    switch(item.Status){
        case 1:
            statusIndex = require('../../../assets/pickup.png');
            break;
        case 2:
            statusIndex = require('../../../assets/regular.png');
            break;
        case 3:
            statusIndex = require('../../../assets/delivery.png');
            break;
        default:
            statusIndex = require('../../../assets/complete.png');
            break;
    }

    const onChangeWeight = (wgt) => {
        let total = 0;
        if(itemService.serviceid == 3){
            total = (itemService.rate / 1) * wgt;
        } else {
            total = (itemService.rate / 8) * wgt;
        }

        setWeight(wgt);
        setAmount(total);
    }

    return (
        <SafeAreaView>
            <View style={{height: '100%', padding: 20}}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailHeader}>{'Order #' + item.Order_ID}</Text>
                    <Text style={styles.detailHeader}>{item.fullname}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <Image style={styles.statusIcon} source={statusIndex}/>
                        <Text style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 17}}>{item.address}</Text>
                    </View>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17, margin: 5}}>{item.mobilephone}</Text>
                    <FlatList style={{width: '100%', padding: 5}} data={itemList} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.listItems}>{item.itemdesc}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => {
                                    setItemList(itemList.map((items) => item.itemid === items.itemid ? {...items, qty: items.qty - (item.qty > 0 ? 1:0)} : items))
                                }}>
                                    <View style={styles.incrementDecrementButton}>
                                        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>-</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{width: 25, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{item.qty}</Text>
                                <TouchableOpacity onPress={() => {
                                    setItemList(itemList.map((items) => item.itemid === items.itemid ? {...items, qty: items.qty + (item.qty < 99 ? 1:0)} : items))
                                }}>
                                    <View style={styles.incrementDecrementButton}>
                                        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }/>
                    <View>
                        <FlatList style={{width: '100%', padding: 5}} data={itemCode} numColumns={4} renderItem={({item}) => 
                            <View>
                                <TouchableOpacity style={{flexDirection: 'row', padding: 5}} onPress={ async () => {
                                    setItemCode(itemCode.map((items) => item.id === items.id ? {...items, isChecked: !item.isChecked} : items))
                                }}>
                                    <Checkbox value={item.isChecked}/>
                                    <Text style={{paddingLeft: 5}}>{item.desc}</Text>
                                </TouchableOpacity>

                            </View>
                        }/>
                    </View>
                    <View style={styles.inputbox}>
                        <TextInput style={{fontWeight: 'bold', fontSize: 20}} onChangeText={newValue => setWithQRCode(newValue)} defaultValue={withQRCode} placeholder='With QR Code' keyboardType='decimal-pad' editable={false}/>
                    </View>
                    <View style={styles.inputbox}>
                        <TextInput style={{fontWeight: 'bold', fontSize: 20}} onChangeText={newValue => onChangeWeight(newValue)} defaultValue={weight} placeholder='Weight' keyboardType='decimal-pad'/>
                    </View>
                    <View style={styles.inputbox}>
                        <TextInput style={{fontWeight: 'bold', fontSize: 20}} placeholder='Amount' defaultValue={amount.toLocaleString(undefined, {maximumFractionDigits:2})} keyboardType='decimal-pad' editable={false}/>
                    </View>
                </View>
                <FloatingAction color={COLORS.PRIMARY} actions={actions} onPressItem={onOpen}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#D5DBDB',
        borderRadius: 10,
        height: '100%',
        padding: 10
    },
    detailHeader: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    statusIcon: {
        height: 22,
        width: 22,
        marginHorizontal: 5
    },
    listItems: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1
    },
    incrementDecrementButton: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.PRIMARY,
        margin: 5,
        borderRadius: 8,
        justifyContent: 'center'
    },
    inputbox: {
        padding: 10, 
        borderWidth: 1, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        margin: 5}
})

export default RiderOrderDetails;