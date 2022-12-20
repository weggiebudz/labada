import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../Network';
import { COLORS } from '../../../themes/Colors';

function AdminSevices({navigation}) {
    const [refresh, setRefresh] = useState(false);
    const [services, setServices] = useState([]);
    
    useEffect(() => {
        onGetServices();
    },[]);

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
            console.log(json);
            console.log('igo na');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{padding: 20}}>
            <FlatList style={{width: '100%'}} data={services} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => {}}/>} renderItem={({item}) => 
                <View>
                    <View style={{flexDirection: 'row', borderWidth: 1, borderRadius: 5, margin: 5, padding: 10}}>
                        <Text style={[styles.label, {width: 40, flex: 0}]}>{item.serviceid}</Text>
                        <Text style={styles.label}>{item.servicename}</Text>
                        <Text style={[styles.label, {textAlign: 'center'}]}>{item.rate}</Text>
                        <TouchableOpacity>
                            <View style={{backgroundColor: COLORS.PRIMARY, padding: 10, borderRadius: 5}}>
                                <Text style={[styles.label, {color: COLORS.SECONDARY}]}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>    
            }/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label : {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        textTransform: 'uppercase',
        textAlign: 'left',
        alignSelf: 'center'
    }
})

export default AdminSevices;