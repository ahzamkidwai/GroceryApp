import CustomText from '@/components/ui/CustomText';
import {Colors} from '@/utils/Constants';
import {FC, useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';

interface SidebarProps {
  selectedCategory: any;
  categories: any;
  onCategoryPress: (category: any) => void;
}

// const Sidebar: FC<SidebarProps> = ({
//   selectedCategory,
//   categories,
//   onCategoryPress,
// }) => {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const indicatorPosition = useSharedValue(0);
//   const animatedValues = categories?.map(() => useSharedValue(0));
//   const AnimatedImage = Animated.createAnimatedComponent(Image);

//   console.log('Inside Sidebar categories : ', categories);

//   useEffect(() => {
//     let targetIndex = -1;

//     categories?.forEach((category: any, index: number) => {
//       const isSelectedCategory = selectedCategory?._id === category?._id;
//       animatedValues[index].value = withTiming(isSelectedCategory ? 2 : -15, {
//         duration: 500,
//       });
//       if (isSelectedCategory) targetIndex = index;
//     });

//     if (targetIndex !== -1) {
//       indicatorPosition.value = withTiming(targetIndex * 100, {duration: 500});
//       runOnJS(() => {
//         scrollViewRef.current?.scrollTo({y: targetIndex * 100, animated: true});
//       });
//     }
//   }, [selectedCategory]);

//   const indicatorStyle = useAnimatedStyle(() => ({
//     transform: [{translateY: indicatorPosition.value}],
//   }));

//   return (
//     <View style={styles.sideBar}>
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={{
//           paddingBottom: 50,
//           // borderWidth: 1,
//           // height: '80%',
//         }}
//         showsVerticalScrollIndicator={true}>
//         <Animated.View style={[styles.indicator, indicatorStyle]}>
//           <View>
//             {categories?.map((category: any, index: number) => {
//               const animatedStyle = useAnimatedStyle(() => ({
//                 bottom: animatedValues[index].value,
//               }));

//               return (
//                 <TouchableOpacity
//                   key={index}
//                   activeOpacity={1}
//                   style={styles.categoryButton}
//                   onPress={() => onCategoryPress(category)}>
//                   {/* <Text style={{color: 'red'}}>{category?.name}</Text> */}
//                   <View
//                     style={[
//                       selectedCategory?._id === category?._id &&
//                         styles.selectedImageContainer,
//                     ]}>
//                     {/* <Animated.Image
//                       source={{uri: category?.image}}
//                       style={[styles.image, animatedStyle]}
//                     /> */}
//                     <AnimatedImage
//                       source={{uri: category?.image}}
//                       style={[styles.image, animatedStyle]}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </Animated.View>
//       </ScrollView>
//     </View>
//   );
// };

const Sidebar: FC<SidebarProps> = ({
  selectedCategory,
  categories,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories?.map(() => useSharedValue(0));
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const scrollToCategory = (y: number) => {
    scrollViewRef.current?.scrollTo({y, animated: true});
  };

  useEffect(() => {
    let targetIndex = -1;

    categories?.forEach((category: any, index: number) => {
      const isSelectedCategory = selectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelectedCategory ? 2 : -15, {
        duration: 500,
      });
      if (isSelectedCategory) targetIndex = index;
    });

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {duration: 500});
      runOnJS(scrollToCategory)(targetIndex * 100);
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateY: indicatorPosition.value}],
  }));

  return (
    <View style={styles.sideBar}>
      {/* Moving the Indicator outside of ScrollView */}
      <Animated.View style={[styles.indicator, indicatorStyle]} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}>
        {categories?.map((category: any, index: number) => {
          const animatedStyle = useAnimatedStyle(() => ({
            bottom: animatedValues[index].value,
          }));

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              style={styles.categoryButton}
              onPress={() => onCategoryPress(category)}>
              <View
                style={[
                  styles.imageContainer,
                  selectedCategory?._id === category?._id &&
                    styles.selectedImageContainer,
                ]}>
                <AnimatedImage
                  source={{uri: category?.image}}
                  style={[styles.image, animatedStyle]}
                />
              </View>
              <CustomText
                fontSize={RFValue(8)}
                style={{textAlign: 'center', fontWeight: '600'}}>
                {category?.name}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  categoryButton: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {width: '80%', height: '80%', resizeMode: 'contain'},
  imageContainer: {
    borderRadius: 100,
    height: '50%',
    marginBottom: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F7',
    overflow: 'hidden',
  },
  selectedImageContainer: {backgroundColor: '#CFFFDB'},
});
