import React, { useState } from 'react';
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

function ScheduleOrder({navigation}) {
    const [date, setDate] = useState(formatAMPM(new Date()));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
        console.log(item);
    }

    const services = [
        {
            id: 1,
            imagePath: require('../../assets/regular.png'),
            label: 'Regular',
            rate: '₱160 per 8Kg'
        },
        {
            id: 2,
            imagePath: require('../../assets/express.png'),
            label: 'Express',
            rate: '₱200 per 8Kg'
        },
        {
            id: 3,
            imagePath: require('../../assets/dry.png'),
            label: 'Dry Clean',
            rate: '₱220 per Set'
        },
        {
            id: 4,
            imagePath: require('../../assets/beddings.png'),
            label: 'Beddings',
            rate: '₱200 per 8Kg'
        },
        {
            id: 5,
            imagePath: require('../../assets/mixlaundry.png'),
            label: 'Mix Laundry',
            rate: '₱180 per 8Kg'
        },
    ]

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

    const onOpen = (name) => {
        if(name=='bt_Save'){
            console.log(date);
            navigation.dispatch(
                StackActions.popToTop()
            );
        }
    }

    return (
        <View style={{height: '100%'}}>
            <SafeAreaView style={{alignItems: 'center', margin: 10}}>
                <CalendarPicker nextTitleStyle={{fontWeight: 'bold', color: COLORS.PRIMARY}} previousTitleStyle={{fontWeight: 'bold', color: COLORS.PRIMARY}} todayBackgroundColor='#16A085' selectedDayColor={COLORS.PRIMARY} selectedDayTextColor={COLORS.SECONDARY} minDate={Date.now()} onDateChange={onDateChange}/>
                <View style={{margin: 15, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.time}>Pick Up Time : </Text>
                    <TouchableOpacity onPress={showDatePicker} style={[styles.time, { padding: 7, borderRadius: 7, borderWidth: 1}]}>
                        <Text style={styles.time}>{date}</Text>
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