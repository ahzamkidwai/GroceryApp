import {FC, ReactNode} from 'react';
import {Animated, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface ScalePressProps {
  onPress?: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

const ScalePress: FC<ScalePressProps> = ({onPress, children, style}) => {
  const scaleValue = new Animated.Value(1);

  const pressIn = () => {
    Animated.spring(scaleValue, {toValue: 0.92, useNativeDriver: true}).start();
  };

  const pressOut = () => {
    Animated.spring(scaleValue, {toValue: 1, useNativeDriver: true}).start();
  };

  return (
    <TouchableOpacity
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
      activeOpacity={1}
      style={{...style}}>
      <Animated.View
        style={[{transform: [{scale: scaleValue}], width: '100%'}]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;

const styles = StyleSheet.create({});
