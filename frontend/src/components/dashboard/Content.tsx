import {StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import {adData} from '@/utils/dummyData';
import AdCarousal from './AdCarousal';

const Content: FC = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
});
