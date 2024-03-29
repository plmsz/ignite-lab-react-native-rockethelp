import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import { SignUp } from '../screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
    >
      <Screen name='home' component={Home} />
      <Screen name='new' component={Register} />
      <Screen name='details' component={Details} />
    </Navigator>
  );
}
