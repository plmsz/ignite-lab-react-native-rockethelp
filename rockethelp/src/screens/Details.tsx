import { useRoute } from '@react-navigation/native';
import { VStack, Text } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

type RouteParams = {
  orderId: string;
};

export function Details() {
  const route = useRoute();

  const { orderId } = route.params as RouteParams;
  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Solicitação' />
      <Text color='white'>{orderId}</Text>
      <Button title='Finalizar' mt={5} />
    </VStack>
  );
}
