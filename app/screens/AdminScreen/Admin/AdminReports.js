import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'expo-chart-kit';
import { Dimensions } from 'react-native'
import { ROUTES } from '../../../../Network';
import { PieChart } from 'react-native-svg-charts'
import { Circle, Line, G} from 'react-native-svg'
import { PieChartData } from 'react-native-svg-charts'
import OrderDetailsCard from '../../../components/OrderDetailsCard';
import { COLORS } from '../../../themes/Colors';

function AdminReports(props) {
    const [itemLabel, setItemLabel] = useState([]);
    const [itemValue, setItemValue] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const [sales, setSales] = useState([]);
    const [total, setTotal] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
 
    useEffect(() => {
        onLoadScreen();
        onGetSales();
    },[]);

    const onGetSales = async () => {
        try{
            const response = await fetch(ROUTES.URL + '/getSales', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
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

    return (
        <SafeAreaView>
            <Text style={styles.header}>Order Items</Text>
            <View style={styles.chart}>
                <PieChart style={{ height: 150, width: 150}} 
                data={pieChartDataRounded} 
                innerRadius={35}
                outerRadius={70}
                labelRadius={120}
                sort={(a, b) => b.key - a.key}
                >
                </PieChart>
                <View style={{ flexDirection: 'row', flex: 1, padding: 10}}>
                    <FlatList style={{width: '100%', padding: 10}} data={orderItem} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}}/>} renderItem={({item}) => 
                        <View style={{flexDirection: 'row', alignItems: 'center', margin: 2, flex: 1}}>
                            <View style={{width: 20, height: 20, backgroundColor: item.Color, marginRight: 10, borderRadius: 5}}/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.label, {flex: 1}]}>{item.Description}</Text>
                                <Text style={[styles.label, {flex: 1, textAlign: 'center'}]}>{item.Qty}</Text>
                            </View>
                        </View>                      
                    }/>
                </View>
            </View>
            <Text style={styles.header}>Sales</Text>
            <View style={styles.chart}>
                <PieChart style={{ height: 150, width: 150}} 
                data={pieChartSales} 
                innerRadius={35}
                outerRadius={70}
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
            <View style={{alignItems: 'center', margin: 30}}>
                <TouchableOpacity>
                    <View style={{backgroundColor: COLORS.PRIMARY, width: '50%', padding: 12, borderRadius: 15, alignSelf: 'center'}}>
                        <Text style={{color: COLORS.SECONDARY, fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Print Report Summary</Text>
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
    }
})

export default AdminReports;