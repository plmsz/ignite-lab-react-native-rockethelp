expo init nodoprojeto
seleciona bare flow
muda o app para tsx
cria um arquivo tsconfig.json

Click Start.
Right-click Computer, and then select Properties.
Click Advanced system settings.
On the Advanced tab, click Environment Variables.
Under System Variables, double-click Path.
Add to the Path variable the location of the /bin folder in your installation of the JDK. For example:
ANDROID_HOME="/home/<user_name>/Android/Sdk" <Path to android SDK>
"/home/<user_name>/Android/Sdk"

Add to the Path variable the locations of the /emulators, /tools, and /platform-tools folders in your installation of the Android SDK. For example:
C:\Android\android-sdk\platform-tools

Click OK until you have closed all dialog boxes. Do not click Cancel.
Restart your computer.

---

# NativeBase - import React from "react";

import { NativeBaseProvider, Box } from "native-base";

export default function App() {
return (
<NativeBaseProvider>
<Box>Hello world</Box>
</NativeBaseProvider>
);
}
yarn add native-base
expo install react-native-svg
expo install react-native-safe-area-context

```tsx
import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

import { THEME } from '../styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
}
```

# Fontes e loading

expo install expo-font @expo-google-fonts/roboto

```tsx
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider, StatusBar, View } from 'native-base';
import { THEME } from './src/styles/theme';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
```

yarn add --dev react-native-svg-transformer

```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
~~~
yarn add phosphor-react-native

--
# Input, componetização, useTheme
~~~tsx
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <SignIn />
    </NativeBaseProvider>
  );
}
~~~
~~~tsx
import { Heading, VStack, Icon, useTheme } from 'native-base';
import { Input } from '../components/input';
import { Envelope, Key } from 'phosphor-react-native';

export function SignIn() {
  const { colors } = useTheme();
  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
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
    </VStack>
  );
}
~~~
```

# união de tipos

```tsx
import { Heading, Button as ButtonNativeBase, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string;
};
export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg='green.700'
      h={14}
      fontSize='sm'
      rounded='sm'
      _pressed={{ bg: 'green.5000' }}
      {...rest}
    >
      <Heading fontSize='sm' color='white'>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
```

# Bordas arrendodadas de um flex-component

```tsx
<HStack
  bg='gray.600'
  mb={4}
  alignItems='center'
  justifyContent='space-between'
  rounded='sm'
  overflow='hidden'/> /* clipa o box, ficando com bordas arrendodadas  */
  <Box h='full' w={2} bg={statusColor} />
  <VStack flex={1} my={5} ml={5}>
  <Text color='white' fontSize='md' maxH={8}>
  Patrimônio {data.patrimony}
  </Text>
</VStack>
```

# FlatList (map em lista) - lista vazia, barra de rolagem, tornar area tocável

```tsx
export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const statusColor =
    data.status === 'open' ? colors.secondary[700] : colors.green[300];
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '1212185',
      patrimony: '2228832',
      when: '13/07/2022 às 10:00',
      status: 'closed',
    },
    {
      id: '121214',
      patrimony: '222432',
      when: '18/07/2022 às 10:00',
      status: 'open',
    },
  ]);
  // const [orders, setOrders] = useState<OrderProps[]>([]);  //lista vazia
  return (
    <Pressable {...rest}>
      <HStack>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Order data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                Você ainda não possui {'\n'}solicitações{' '}
                {statusSelected === 'open' ? 'em andamento.' : 'finalizadas.'}
              </Text>
            </Center>
          )}
        />
      </HStack>
    </Pressable>
  );
}
```

# Navegação

yarn add @react-navigation/native
expo install react-native-screens
yarn add @react-navigation/native-stack

## Declarando os paths em @types/navigation.d.ts

```ts
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      new: undefined;
      details: { orderId: string };
    }
  }
}
```