import {
  Heading,
  VStack,
  Icon,
  useTheme,
  IconButton,
  HStack,
} from 'native-base';
import { useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from '../assets/logo_primary.svg';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Envelope, Key, CaretLeft } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

export function SignUp() {
  const navigation = useNavigation();

  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSignUp() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe email e senha');
    }
    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === 'auth/weak-password') {
          return Alert.alert(
            'Cadastrar',
            'Senha deve conter ter pelo menos 6 caracteres.'
          );
        }
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert(
            'Cadastrar',
            'O e-mail fornecido já está em uso por outro usuário.'
          );
        }
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Cadastrar', 'E-mail inválido.');
        }
        return Alert.alert('Cadastrar', 'Não foi possível cadastrar.');
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <HStack alignItems='center' mt={10} mb={6} marginLeft={-6}>
        <IconButton
          icon={<CaretLeft color={colors.gray[200]} size={24} />}
          onPress={handleGoBack}
          zIndex={1}
        />
        <Heading color='gray.100' font-size='xl'>
          Crie sua conta
        </Heading>
      </HStack>
      <Input
        placeholder='Email'
        keyboardType='email-address'
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
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        onChangeText={setPassword}
      />
      <Button
        title='Cadastrar'
        w='full'
        onPress={handleSignUp}
        isLoading={isLoading}
        bg='blue.700'
      />
    </VStack>
     </TouchableWithoutFeedback>
  );
}
