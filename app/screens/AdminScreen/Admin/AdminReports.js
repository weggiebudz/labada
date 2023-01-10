import React, { useEffect, useState } from 'react';
import { Button, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'expo-chart-kit';
import { Dimensions } from 'react-native'
import { ROUTES } from '../../../../Network';
import { PieChart } from 'react-native-svg-charts'
import { Circle, Line, G} from 'react-native-svg'
import { PieChartData } from 'react-native-svg-charts'
import OrderDetailsCard from '../../../components/OrderDetailsCard';
import { COLORS } from '../../../themes/Colors';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function AdminReports({navigation}) {
    const [itemLabel, setItemLabel] = useState([]);
    const [itemValue, setItemValue] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const [sales, setSales] = useState([]);
    const [total, setTotal] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    const [salesSummary, setSalesSummary] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString());
    const [dateValue, setDateValue] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

    const [isDatePickerVisibleTo, setDatePickerVisibilityTo] = useState(false);
    const [dateTo, setDateTo] = useState(new Date().toDateString());
    const [dateToValue, setDateToValue] = useState(new Date());

    useEffect(() => {
        onLoadScreen();
        onGetSales();
    },[]);

    const onGetSalesSummary = async () => {
        try {
            const response = await fetch(ROUTES.URL + '/getSalesSummary', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dateFrom: dateValue,
                    dateTo: dateToValue
                })
            });
            const json = await response.json();
            setSalesSummary(json);
        } catch(error) {
            console.log(error);
        }
    }

    const onGetSales = async () => {
        try{
            onGetSalesSummary();
            const response = await fetch(ROUTES.URL + '/getSales', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dateFrom: dateValue,
                    dateTo: dateToValue
                })
            });
            const json = await response.json();
            let value = [];
            for(var i = 0; i < json.length; i++){
                value.push(json[i].Total);
            }
            setTotal(value);
            setTotalSales(value.reduce((a, v) => a = a + v, 0));
            setSales(json.map((item, index) => {
                return{
                    Description: item.servicename,
                    Qty: item.Total,
                    Color: colors[index]
                }
            }));
        } catch(error) {
            console.log(error);
        }
    }

    const onLoadScreen = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getItemQuantity', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const json = await response.json();
            let labels = [];
            let value = [];
            for(var i = 0; i < json.length; i++){
                labels.push(json[i].Description);
                value.push(json[i].Qty);
            }
            setItemLabel(labels);
            setItemValue(value);
            setOrderItem(json.map((item, index) => {
                return{
                    Description: item.Description,
                    Qty: item.Qty,
                    Color: colors[index]
                }
            }));
        } catch(error) {
            console.log(error);
        }
    }

    const colors = ['#E74C3C', '#8E44AD', '#3498DB', '#16A085', '#2ECC71', '#F39C12', '#D35400', '#A93226', '#884EA0', '#2471A3', '#17A589', '#229954', '#F1C40F'];

    const getPieChartDataRounded = (data) => {
        return data.map((item, index) => {
            const randomColor = colors[index];
            return {
                key: index,
                value: item,
                svg: { fill: randomColor },
                arc: { cornerRadius: 5 },
            }
        })
    }

    const pieChartDataRounded = getPieChartDataRounded(itemValue);
    const pieChartSales = getPieChartDataRounded(total);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        setDate(date.toDateString());
        setDateValue(date);
        hideDatePicker();
      };

      const showDatePickerTo = () => {
        setDatePickerVisibilityTo(true);
      };
    
      const hideDatePickerTo = () => {
        setDatePickerVisibilityTo(false);
      };

      const handleConfirmTo = (dateTo) => {
        setDateTo(dateTo.toDateString());
        setDateToValue(dateTo);
        hideDatePickerTo();
      };

      const itemClick = (item) => {
        console.log(item);
        const params = {
            'item': item,
            'isOrderHistory': true
        }
        navigation.navigate('AdminOrderDetails',{params});
      }

    return (
        <SafeAreaView>
            <Text style={styles.header}>SALES</Text>
            <View style={{margin: 7, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                    <Text style={styles.time}>Date From : </Text>
                    <TouchableOpacity onPress={showDatePicker} style={[styles.time, { padding: 7, borderRadius: 7, borderWidth: 1, height: 30}]}>
                        <Text style={styles.time}>{date}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        modal
                        isDarkModeEnabled={true}
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        value={dateValue}
                    />
            </View>
            <View style={{margin: 7, flexDirection: 'row', alignItems: 'center' , marginHorizontal: 20}}>
                    <Text style={styles.time}>Date To : </Text>
                    <TouchableOpacity onPress={showDatePickerTo} style={[styles.time, { padding: 7, borderRadius: 7, borderWidth: 1, height: 30}]}>
                        <Text style={styles.time}>{dateTo}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        modal
                        isDarkModeEnabled={true}
                        isVisible={isDatePickerVisibleTo}
                        mode="date"
                        onConfirm={handleConfirmTo}
                        onCancel={hideDatePickerTo}
                        value={dateToValue}
                    />
            </View>
            <View style={styles.chart}>
                <PieChart style={{ height: 150,width: 150}} 
                data={pieChartSales} 
                innerRadius={'30%'}
                outerRadius={'68%'}
                labelRadius={120}
                sort={(a, b) => b.key - a.key}
                >
                </PieChart>
                    <View style={{ flex: 1, padding: 10, backgroundColor: '#D5DBDB', margin: 10, borderRadius: 10}}>
                        <FlatList style={{width: '100%'}} data={sales} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                            <View style={{flexDirection: 'row', alignItems: 'center', margin: 2, flex: 1}}>
                                <View style={{width: 20, height: 20, backgroundColor: item.Color, marginRight: 10, borderRadius: 5}}/>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.label, {flex: 1}]}>{item.Description}</Text>
                                    <Text style={[styles.label, {flex: 1, textAlign: 'right', paddingRight: 31, alignSelf: 'center'}]}>{item.Qty.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                </View>
                            </View>                      
                        }/>
                        <View style={{flexDirection: 'row', padding:5}}>
                            <Text style={[styles.total, {flex: 1}]}>Total</Text>
                            <Text style={styles.total}>{totalSales.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                        </View>
                    </View>
            </View>
            <View style={{padding: 10, height: 200}}>
                <View style={{flexDirection: 'row', padding: 7}}>
                    <Text style={[styles.label, {flex: 1}]}>Date</Text>
                    <Text style={[styles.label, {flex: 1, alignSelf: 'center'}]}>Service Name</Text>
                    <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>Weight</Text>
                    <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>Amount</Text>
                </View>
                <FlatList style={{width: '100%'}} data={salesSummary} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                    <TouchableOpacity onPress={() => itemClick(item)} style={{flexDirection: 'row', alignItems: 'center', margin: 2, flex: 1}}>
                        <View style={{flexDirection: 'row', backgroundColor: '#D6EAF8', padding: 5, borderRadius: 5}}>
                            <Text style={[styles.label, {flex: 1}]}>{item.DeliverDate}</Text>
                            <Text style={[styles.label, {flex: 1, alignSelf: 'center'}]}>{item.servicename}</Text>
                            <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>{item.Weight}</Text>
                            <Text style={[styles.label, {flex: 1, textAlign: 'right'}]}>{item.Amount}</Text>
                        </View>
                    </TouchableOpacity>                      
                }/>
            </View>
            <View style={{alignItems: 'center', margin: 10}}>
                <TouchableOpacity onPress={onGetSales}>
                    <View style={{backgroundColor: COLORS.PRIMARY, width: '50%', padding: 12, borderRadius: 15, alignSelf: 'center'}}>
                        <Text style={{color: COLORS.SECONDARY, fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Generate Report</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chart: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 5
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    total: {
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    time: {
        flex: 1
    }
})

export default AdminReports;