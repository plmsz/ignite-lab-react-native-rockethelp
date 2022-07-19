import { Heading, VStack, Icon, useTheme } from 'native-base';
import { useState } from 'react';
import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { Envelope, Key } from 'phosphor-react-native';

export function SignIn() {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    console.log(name, password);
  }
  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <Heading color='gray.100' font-size='xl' mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder='Email'
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setName}
      />
      <Input
        mb={8}
        placeholder='Senha'
        secureTextEntry
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        onChangeText={setPassword}
      />
      <Button title='Entrar' w='full' onPress={handleSignIn} />
    </VStack>
  );
}
