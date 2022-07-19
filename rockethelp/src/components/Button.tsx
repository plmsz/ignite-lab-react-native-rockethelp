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
