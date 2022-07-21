import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
    >
      <Screen name='signin' component={SignIn} />
      <Screen name='signup' component={SignUp} />
    </Navigator>
  );
}
