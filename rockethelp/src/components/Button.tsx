import { Heading, Button as ButtonNativeBase, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string;
};
export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      h={14}
      rounded='sm'
      _pressed={{ bg: 'blue.500' }}
      {...rest}
    >
      <Heading fontSize='md' color='white'>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
