import { StackActions } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl, Modal, Pressable, TextInput } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { ROUTES } from '../../../../Network';
import Button from '../../../components/Button';
import ItemCard from '../../../components/ItemCard';
import { COLORS } from '../../../themes/Colors';

function RiderOrderDetails({route, navigation}) {
    const item = route.params.item;
    const [itemList, setItemList] = useState([]);

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

    useEffect(() => {
        getItems();
    },[]);

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
 
        } else if (name=='bt_Add'){
            setModalVisible(true);
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
                    <View style={styles.inputbox}>
                        <TextInput style={{fontWeight: 'bold', fontSize: 20}} placeholder='Weight' keyboardType='numeric'/>
                    </View>
                    <View style={styles.inputbox}>
                        <TextInput style={{fontWeight: 'bold', fontSize: 20}} placeholder='Amount' keyboardType='numeric'/>
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
        margin: 10}
})

export default RiderOrderDetails;