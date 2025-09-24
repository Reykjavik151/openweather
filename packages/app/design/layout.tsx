import { styled } from 'nativewind';
import { View } from 'react-native';

import { SafeAreaView } from '#provider/safeArea/safeAreaView';

export const Row = styled(View, 'flex-row');

export const Container = styled(SafeAreaView, 'bg-root h-screen flex-1 items-center px-4');
