import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { ROUTES } from '../../../../Network';
import { COLORS } from '../../../themes/Colors';

function AdminSevices({navigation}) {
    const [refresh, setRefresh] = useState(false);
    const [services, setServices] = useState([]);
    
    useFocusEffect(

    React.useCallback(() => {
        onGetServices();
      }, [])
    );

    const onGetServices = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getServices', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const json = await response.json();
            setServices(json);
        } catch(error) {
            console.log(error);
        }
    }

    const actions = [
        {
          text: "Add",
          icon: require('../../../assets/save.png'),
          name: "bt_Add",
          position: 1,
          color: COLORS.PRIMARY,
          textStyle: {
            fontWeight: 'bold',
            color: COLORS.PRIMARY
          }
        },
    ]

    const onOpen = async (name) => {
        if(name=='bt_Add'){
            navigation.navigate('AdminAddService');
        }
    }

    const editService = async (item) => {
        navigation.navigate('AdminEditService',{item});
    }

    return (
        <SafeAreaView style={{padding: 20,flex: 1}}>
            <View style={{flexDirection: 'row', padding: 10, backgroundColor: COLORS.PRIMARY, margin: 5, borderRadius: 5}}>
                <Text style={[styles.label, {flex: 0, width: 40, color: 'white'}]}>ID</Text>
                <Text style={[styles.label, {flex: 0, width: 110, color: 'white'}]}>Description</Text>
                <Text style={[styles.label, {textAlign: 'right', color: 'white'}]}>Rate</Text>
                <Text style={[styles.label, {textAlign: 'right', color: 'white'}]}>Action</Text>
            </View>
            <FlatList style={{width: '100%', flex: 1}} data={services} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => {}}/>} renderItem={({item}) => 
                <View>
                    <View style={{flexDirection: 'row', borderWidth: 1, borderRadius: 5, margin: 5, padding: 10}}>
                        <Text style={[styles.label, {width: 40, flex: 0}]}>{item.serviceid}</Text>
                        <Text style={[styles.label, {flex: 0, width: 110}]}>{item.servicename}</Text>
                        <Text style={[styles.label, {textAlign: 'right'}]}>{item.rate}</Text>    
                        <View style={{flex: 1}}>
                            <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => { editService(item) }}>
                                <View style={{backgroundColor: COLORS.PRIMARY, padding: 10, borderRadius: 5, width: 60, alignSelf: 'flex-end'}}>
                                    <Text style={[styles.label, {color: COLORS.SECONDARY}]}>Edit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>    
            }/>
            <FloatingAction color={COLORS.PRIMARY} actions={actions} onPressItem={onOpen}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label : {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
        textTransform: 'uppercase',
        textAlign: 'left',
        alignSelf: 'center'
    }
})

export default AdminSevices;