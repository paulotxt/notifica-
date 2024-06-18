import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationService from './src/NotificationService';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        NotificationService.configure(onNotification);
        scheduleNotifications();
    }, []);

    const onNotification = (notification) => {
        navigation.navigate('NotificationScreen');
    };

    const scheduleNotifications = () => {
        const messages = [
            'Mensagem de cupom disponível',
            'Mensagem bem-humorada sobre a próxima refeição',
            'Mensagem de ofertas'
        ];
        
        messages.forEach((message, index) => {
            NotificationService.scheduleNotification('Notificação', message, new Date(Date.now() + (index + 1) * 300000));
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Testar notificação" onPress={() => NotificationService.sendNotification('Teste', 'Esta é uma notificação de teste')} />
        </View>
    );
};

const NotificationScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Tela destino da notificação</Text>
    </View>
);

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
