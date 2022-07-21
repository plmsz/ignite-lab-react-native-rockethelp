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

## Rotas

```tsx
import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
    >
      <Screen name='home' component={Home} />
      <Screen name='new' component={Register} />
      <Screen name='details' component={Details} />
    </Navigator>
  );
}
```

```tsx
# Rotas no app
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {


  return (
    <>
      {fontsLoaded ? <Routes /> : <Loading />}
    </>
  );
}
```

# Navegando para uma página e voltando

```tsx
export function Home() {
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open'
  );
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('new');
  }
  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '010',
      patrimony: '0101',
      when: '13/07/2022 às 10:00',
      status: 'closed',
    },
    {
      id: '100',
      patrimony: '1100',
      when: '18/07/2022 às 10:00',
      status: 'open',
    },
  ]);
  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <VStack flex={1} px={6}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
        />
        <Button title='Nova solicitação' onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
```

# Firbase

## Configurações sdk e jdk

- Firebase ainda não funciona com expo go
  https://react-native.rocketseat.dev/android/windows

npm install --save @react-native-firebase/app
npm install @react-native-firebase/app

Registra o app no firebase e baixa o arquivo de configuração
app.json

{
"expo": {
"plugins": ["@react-native-firebase/app"],
"android": {
"package": "com.rockethelp",
"googleServicesFile": "./google-services.json"
},
"ios": {
"package": "com.rockethelp",
"googleServicesFile": "./GoogleServiceFile-Info.plist"
}
}
}

## expo prebuild

npm install @react-native-firebase/app

# If you're developing your app using iOS, run this command

cd ios/ && pod install

npm install @react-native-firebase/auth

# If you're developing your app using iOS, run this command

cd ios/ && pod install

expo run:android

# Install the firestore module

npm i @react-native-firebase/firestore

# If you're developing your app using iOS, run this command

cd ios/ && pod install

# Componetização

```tsx
<VStack flex={1} bg='gray.700'>
      <Box px={6} bg='gray.600'>
        <Header title='Solicitação' />
      </Box>
      <HStack bg='gray.500' justifyContent='center' p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize='sm'
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform='uppercase'
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title='equipamento'
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title='descrição do problema'
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title='solução'
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && (
            <Input
              placeholder='Descrição da solução'
              onChangeText={setSolution}
              textAlignVertical='top'
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === 'open' && (
        <Button title='Encerrar solicitação' m={5} onPress={handleOrderClose} />
      )}
    </VStack>
            
```
~~~jsx
ype Props = {
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};
//icone é componente, tem que ser letra maiuscula
export function CardDetail({
  title,
  description,
  footer = null,
  icon: Icon,
  children,
}: Props) {
  const { colors } = useTheme();

  return (
    <VStack bg='gray.500' p={5} mt={5} rounded='sm'>
      <HStack alignItems={'center'} mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color='gray.300' fontSize='sm' textTransform='uppercase'>
          {title}
        </Text>
      </HStack>
      {!!description && (
        <Text color='gray.100' fontSize='md'>
          {description}
        </Text>
      )}
      {children}
      {!!footer && (
        <Box borderTopWidth={1} borderTopColor='gray.400' mt={3}>
          <Text color='gray.100' fontSize='sm'>
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}

~~~