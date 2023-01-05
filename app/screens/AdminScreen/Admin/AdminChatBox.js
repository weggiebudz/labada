import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../Network';
import io from 'socket.io-client';

function AdminChatBox({navigation}) {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        onGetChats();

        const socket = io(ROUTES.URL.replace('/api',''));

        socket.on('chatMessage', msg => {
            onGetChats();
        });

        return () => {
            socket.disconnect();
        }
    },[]);

    useFocusEffect(() => { onGetChats();

    });

    const onGetChats = async () => {
        const response = await fetch(ROUTES.URL + '/getAdminChats', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receiver: 'admin'
            })
        });
        const json = await response.json();
        setChatList(json);
    }

    const onPressChatDetails = async (chat) => {
        const response = await fetch(ROUTES.URL + '/clearUnread', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: chat.sender
            })
        });
        const json = await response.json();

        navigation.navigate('AdminChatDetails',{chat});
    }

    return (
        <SafeAreaView>
            <FlatList style={{width: '100%', padding: 12}} data={chatList} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {  }}/>} renderItem={({item}) => 
                <TouchableOpacity onPress={() => { onPressChatDetails(item) }} style={{backgroundColor: 'lightgray', borderRadius: 12, padding: 12, flexDirection: 'row', marginBottom: 12}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', flex: 1}}>{item.fullname}</Text>
                    {
                        item.chatcount > 0 ?
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: 'red', padding: 5, borderRadius: 20}}>{item.chatcount}</Text>
                        //null
                        :null
                    }
                </TouchableOpacity>
            }/>
        </SafeAreaView>
    );
}

export default AdminChatBox;