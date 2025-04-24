import {Text, View} from 'react-native';
import {Heading} from './components/ui/heading';

const App = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>App</Text>
      <Heading>I am a Heading</Heading>
    </View>
  );
};

export default App;
