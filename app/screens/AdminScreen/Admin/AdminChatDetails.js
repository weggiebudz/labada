import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../Network';
import io from 'socket.io-client';
import { COLORS } from '../../../themes/Colors';

function AdminChatDetails({route, navigation}) {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        onGetChats(route.params.chat);
        navigation.setOptions({title: route.params.chat.fullname})

        const socket = io(ROUTES.URL.replace('/api',''));

        socket.on('chatMessage', msg => {
            onGetChats(route.params.chat);
        });

        return () => {
            socket.disconnect();
        }
    },[]);

    const onGetChats = async (chat) => {
        const response = await fetch(ROUTES.URL + '/getAdminChatsDetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receiver: 'admin',
                sender: chat.sender
            })
        });
        const json = await response.json();
        setChatMessages(json);
    }

    const onSubmitMessage = async () => {
        const response = await fetch(ROUTES.URL + '/sentMessage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receiver: route.params.chat.sender,
                sender: 'admin',
                message: message,
                fullname: 'Admin'
            })
        });
        const json = await response.json();

        const socket = io(ROUTES.URL.replace('/api',''));

        socket.emit('chatMessage', message);

        setMessage('');
    }

    return (
        <SafeAreaView>
             <View style={{height: '100%'}}>
                <FlatList style={{width: '100%', padding: 20}} data={chatMessages} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {  }}/>} renderItem={({item}) => 
                    <View>
                        {
                            item.chatReceiver === 'admin' ? 
                            <Text style={{backgroundColor: 'lightgray', alignSelf: 'flex-start', padding: 10, margin: 5, borderRadius: 10}}>{item.chatMessage}</Text> :
                            <Text style={{backgroundColor: 'lightblue', alignSelf: 'flex-end', padding: 10, margin: 5, borderRadius: 10}}>{item.chatMessage}</Text>
                        }
                    </View>
                }
                inverted={true}
                ListFooterComponent={<View style={{height: 20}}/>}/>
                <View style={{flexDirection: 'row', height: 100, backgroundColor: 'lightgray'}}>
                    <View style={{backgroundColor:'white', flex: 3, borderWidth: 1, borderRadius: 14, marginVertical: 14, marginLeft: 14, marginRight: 7, padding: 7}}>
                        <TextInput style={{height: '100%'}} value={message} multiline={true} onChangeText={ newValue => setMessage(newValue) } placeholder='Type message'/>
                    </View>
                    <TouchableOpacity onPress={onSubmitMessage} style={{backgroundColor: COLORS.PRIMARY, flex: 1, marginVertical: 14, marginRight: 14, marginLeft: 7, borderRadius: 14}}>
                        <Text style={{alignSelf: 'center', height: '100%', textAlignVertical: 'center', color: COLORS.SECONDARY, fontWeight: 'bold', fontSize: 17}}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
})

export default AdminChatDetails;