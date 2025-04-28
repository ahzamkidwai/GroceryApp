import {Image, StyleSheet, View} from 'react-native';
import {FC} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {screenHeight, screenWidth} from '@/utils/Scaling';
import ScalePress from '../ui/ScalePress';

const AdCarousal: FC<{adData: any}> = ({adData}) => {
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenHeight * 0.5,
  };

  return (
    <View style={{left: -20, marginVertical: 20}}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        autoPlay
        autoPlayInterval={2500}
        mode="parallax"
        data={adData}
        modeConfig={{parallaxScrollingOffset: 0, parallaxScrollingScale: 0.94}}
        renderItem={({item}: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

export default AdCarousal;

const styles = StyleSheet.create({
  imageContainer: {width: '100%', height: '60%'},
  img: {width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20},
});
