import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FC, ReactNode} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '@/utils/Constants';

interface InputProps {
  left: ReactNode;
  onClear?: () => void;
  right?: boolean;
}

const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
  left,
  onClear,
  right,
  ...props
}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor={'#ccc'}
      />
      <View style={styles.icon}>
        {props?.value?.length != 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons
              name="close-circle-sharp"
              size={RFValue(16)}
              color="#ccc"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
  inputContainer: {
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBlock: 15,
    height: '100%',
    bottom: -1,
    color: Colors.text,
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    width: '100%',
    marginLeft: 10,
  },
});
