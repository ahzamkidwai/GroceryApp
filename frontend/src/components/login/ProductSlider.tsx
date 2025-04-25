import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo, useMemo} from 'react';
import {imageData} from '@/utils/dummyData';
import {screenHeight, screenWidth} from '@/utils/Scaling';
import AutoScroll from '@homielab/react-native-auto-scroll';

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll duration={1000} endPaddingWidth={0} style={styles.autoScroll}>
        <View style={styles.gridContainer}>
          {rows?.map((row: any, rowIndex: number) => {
            return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{row: typeof imageData; rowIndex: number}> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row?.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imageIndex}
            style={[
              styles.itemContainer,
              {transform: [{translateX: horizontalShift}]},
            ]}>
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = memo(Row);

export default ProductSlider;

const styles = StyleSheet.create({
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.25,
    height: screenHeight * 0.15,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
