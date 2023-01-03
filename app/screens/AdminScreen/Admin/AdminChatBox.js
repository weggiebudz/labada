import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../Network';

function AdminChatBox({navigation}) {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        onGetChats();
    },[]);

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

    const onPressChatDetails = (chat) => {
        navigation.navigate('AdminChatDetails',{chat});
    }

    return (
        <SafeAreaView>
            <FlatList style={{width: '100%', padding: 12}} data={chatList} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {  }}/>} renderItem={({item}) => 
                <TouchableOpacity onPress={() => { onPressChatDetails(item) }} style={{backgroundColor: 'lightgray', borderRadius: 12, padding: 12, flexDirection: 'row', marginBottom: 12}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', flex: 1}}>{item.fullname}</Text>
                    {
                        item.chatcount > 0 ?
                        // <Text style={{fontSize: 25, fontWeight: 'bold', color: 'red'}}>{item.chatcount}</Text>
                        null
                        :null
                    }
                </TouchableOpacity>
            }/>
        </SafeAreaView>
    );
}

export default AdminChatBox;