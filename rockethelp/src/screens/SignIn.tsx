import {
  Heading,
  VStack,
  Icon,
  useTheme,
  Text,
  Divider,
  HStack,
} from 'native-base';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Logo from '../assets/logo_primary.svg';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

export function SignIn() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe email e senha');
    }
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido.');
        }
        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou senha inválido.');
        }
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'E-mail ou senha inválido.');
        }
        return Alert.alert('Entrar', 'Não foi possível acessar.');
      });
  }

  function handleSignUp() {
    navigation.navigate('signup');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
        <Logo />
        <Heading color='gray.100' font-size='xl' mt={20} mb={6}>
          Acesse sua conta
        </Heading>
        <Input
          keyboardType='email-address'
          placeholder='Email'
          mb={4}
          InputLeftElement={
            <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setEmail}
        />
        <Input
          mb={8}
          placeholder='Senha'
          secureTextEntry
          InputLeftElement={
            <Icon as={<Key color={colors.gray[300]} />} ml={4} />
          }
          onChangeText={setPassword}
        />
        <Button
          title='Entrar'
          w='full'
          onPress={handleSignIn}
          isLoading={isLoading}
          bg='blue.700'
        />
        <HStack mt={4} alignItems='center' justifyContent='center' width='40%'>
          <Divider bg='primary.700' />
          <Text color='gray.300' mx={2}>
            OU
          </Text>
          <Divider bg='primary.700' />
        </HStack>
        <Button
          title='Crie sua conta'
          w='full'
          bg='transparent'
          onPress={handleSignUp}
          _pressed={{ bg: 'transparent' }}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}
