import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import ScalePress from '../ui/ScalePress';
import {navigate} from '@/utils/NavigationUtils';
import CustomText from '../ui/CustomText';

const CategoryContainer: FC<{data: any}> = ({data}) => {
  const renderItems = (items: any[]) => {
    return (
      <>
        {items?.map((item, index) => (
          <ScalePress
            key={index}
            style={styles.item}
            onPress={() => navigate('ProductCategories')}>
            <View style={styles.imageContainer}>
              <Image source={item?.image} style={styles.image} />
            </View>
            <CustomText style={styles.text} variant="h8">
              {item?.name}
            </CustomText>
          </ScalePress>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {marginVertical: 15},
  text: {textAlign: 'center'},
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  imageContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#E5F3F3',
    marginBottom: 8,
  },
  item: {width: '22%', justifyContent: 'center', alignItems: 'center'},
  image: {width: '100%', height: '100%', resizeMode: 'contain'},
});
