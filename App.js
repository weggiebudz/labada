import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import NewAccount from './app/screens/Signup/NewAccount';
import NewAccount2 from './app/screens/Signup/NewAccount2';
import ForgotPassword from './app/screens/ForgotPassword/ForgotPassword';
import Verification from './app/screens/ForgotPassword/Verification';
import ChangePassword from './app/screens/ForgotPassword/ChangePassword';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './app/screens/Dashboard';
import ScheduleOrder from './app/screens/ScheduleOrder/ScheduleOrder';
import OrderDetails from './app/screens/OrderDetails/OrderDetails';

import AdminLogin from './app/screens/AdminLogin';
import RiderDashboard from './app/screens/AdminScreen/Rider/RiderDashboard';
import AdminDashboard from './app/screens/AdminScreen/Admin/AdminDashboard';
import RiderOrderDetails from './app/screens/AdminScreen/Rider/RiderOrderDetails';
import SelectService from './app/screens/AdminScreen/Rider/SelectService';

const MainStack = createNativeStackNavigator();
const DashStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const CreateDashStack = () => {
  return (
    <DashStack.Navigator initialRouteName='Dashboard' screenOptions={{headerShown: false}}>
      <DashStack.Screen name="Dashboard" component={Dashboard}/>
      <DashStack.Screen name="ScheduleOrder" component={ScheduleOrder} options={{headerShown: true, title: 'Book Pick Up'}}/>
      <DashStack.Screen name="OrderDetails" component={OrderDetails} options={{headerShown: true, title: 'Order Details'}}/>
    </DashStack.Navigator>
  );
}

const CreateAdminStack = () => {
  return(
    <AdminStack.Navigator initialRouteName='AdminLogin' screenOptions={{headerShown: false}}>
      <AdminStack.Screen name='AdminLogin' component={AdminLogin} />
      <AdminStack.Screen name='RiderDashboard' component={RiderDashboard}/>
      <AdminStack.Screen name='AdminDashboard' component={AdminDashboard}/>
      <AdminStack.Screen name='RiderOrderDetails' component={RiderOrderDetails} options={{headerShown: true, title: 'Order Details'}}/>
      <AdminStack.Screen name='Services' component={SelectService} options={{headerShown: true, title: 'Select Services'}} />
    </AdminStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar/>
      <MainStack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
        <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <MainStack.Screen name="NewAccount" component={NewAccount} options={{headerShown: true, title: 'Register'}} />
        <MainStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: true, title: ''}} />
        <MainStack.Screen name="Verification" component={Verification} options={{headerShown: true, title: ''}} />
        <MainStack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: true, title: ''}} />
        <MainStack.Screen name="DashboardStack" component={CreateDashStack} />
        <MainStack.Screen name="NewAccount2" component={NewAccount2} options={{headerShown: true, title: 'Password'}} />
        <MainStack.Screen name="AdminStack" component={CreateAdminStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}


