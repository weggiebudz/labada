import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View, Platform, TouchableOpacity } from 'react-native';
import { COLORS, SAFEAREAVIEW } from '../../themes/Colors';
import CalendarPicker from 'react-native-calendar-picker';
import ImageButton from '../../components/ImageButton';
import FullButton from '../../components/FullButton';
import {FloatingAction} from 'react-native-floating-action';
import { StackActions } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ROUTES } from '../../../Network';
import * as SQLite from 'expo-sqlite';

function ScheduleOrder({navigation}) {
    const db = SQLite.openDatabase('labada_db');
    const [userInfo, setUserInfo] = useState();
    const [time, setDate] = useState(formatAMPM(new Date()));
    const [date, setPickDate] = useState();
    const [services, setServices] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM credentials`,
            [],
            (err, result) => {
                const userContext = result.rows._array[0];
                setUserInfo(userContext);
            },
            error => {
                alert(error.message);
            });
        });
        getServices();
    }, []);

    const getServices = async () => {
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
            setServices(json.map((item, index) => {
                return{
                    id: item.serviceid,
                    imagePath: require('../../assets/regular.png'),
                    label: item.servicename,
                    rate: item.serviceid !== 3 ? `???${item.rate} per 8kg` : `???${item.rate} per Set`
                }
            }));
        } catch(error) {
            console.log(error);
        }
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setDate(formatAMPM(date));
        hideDatePicker();
      };

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const onDateChange = (item) => {
        setPickDate(new Date(item).getFullYear() + "-" + (new Date(item).getMonth() + 1) + "-" +  new Date(item).getDate());
    }

    const actions = [
        {
          text: "Save",
          icon: require('../../assets/save.png'),
          name: "bt_Save",
          position: 1,
          color: COLORS.PRIMARY,
          textStyle: {
            fontWeight: 'bold',
            color: COLORS.PRIMARY
          }
        },
    ]

    const onOpen = async (name) => {
        if(name=='bt_Save'){
            if(date != null && time != null){
                try{
                    const response = await fetch(ROUTES.URL + '/booking', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Customer_ID: userInfo.clientid,
                            Pickup_Date: date,
                            Time: time,
                            Deliver_Date: null,
                            Amount: 0,
                            Weight: 0,
                            Status: 1
                        })
                    });
                    const json = await response.json();
                    console.log(json);
                } catch(error) {
                    console.log(error);
                } finally {
                    navigation.dispatch(
                        StackActions.popToTop()
                    );
                }
            } else {
                alert("Please select date.");
            }
        }
    }

    return (
        <View style={{height: '100%'}}>
            <SafeAreaView style={{alignItems: 'center', margin: 10}}>
                <CalendarPicker nextTitleStyle={{fontWeight: 'bold', color: COLORS.PRIMARY}} 
                previousTitleStyle={{fontWeight: 'bold', color: COLORS.PRIMARY}} 
                selectedDayColor={COLORS.PRIMARY} 
                selectedDayTextColor={COLORS.SECONDARY} 
                //selectedStartDate ={new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + 1)}
                minDate={new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())} 
                onDateChange={onDateChange}/>
                <View style={{margin: 15, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.time}>Pick Up Time : </Text>
                    <TouchableOpacity onPress={showDatePicker} style={[styles.time, { padding: 7, borderRadius: 7, borderWidth: 1}]}>
                        <Text style={styles.time}>{time}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isDarkModeEnabled={true}
                        isVisible={isDatePickerVisible}
                        mode="time"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <Text style={[styles.time, {fontWeight: 'bold'}]}>Full-Service Rate</Text>
                <FlatList style={styles.flatList} numColumns={3} data={services} renderItem={({item}) => 
                    <ImageButton label={item.label} imagePath={item.imagePath} rate={item.rate}/>
                }/>
            </SafeAreaView>
            <FloatingAction color={COLORS.PRIMARY} actions={actions} onPressItem={onOpen}/>
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        height: 250,
    },
    time: {
        fontSize: 20,
    }
})

export default ScheduleOrder;