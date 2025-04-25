import {SafeAreaView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {FC, ReactNode} from 'react';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {children}
    </View>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
});
