import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '@/components/ui/CustomHeader';
import {Colors} from '@/utils/Constants';
import Sidebar from './Sidebar';
import {
  getAllCategories,
  getProductsByCategoryId,
} from '@/service/productService';
import ProductList from './ProductList';

const ProductCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const data = await getAllCategories();
        const responseData = data?.categories;
        console.log('RESPONSE DATA IS : ', responseData);
        setCategories(responseData);
        if (responseData && responseData.length > 0) {
          setSelectedCategory(responseData[0]);
        }
        setCategoriesLoading(false);
      } catch (error) {
        console.log('Error occurred while fetching Categories data : ', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async (categoryId: string) => {
      try {
        setProductsLoading(true);
        const data = await getProductsByCategoryId(categoryId);
        console.log('DATA FETCHED FROM getProductsByCategoryId : ', data);
        setProducts(data);
      } catch (error) {
        console.log('Error occurred while fetching product by category Id...');
      } finally {
        setProductsLoading(false);
      }
    };

    if (selectedCategory?._id) {
      fetchProducts(selectedCategory?._id);
    }
  }, [selectedCategory]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size={'small'} color={Colors.border} />
        ) : (
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category: any) => setSelectedCategory(category)}
          />
        )}

        {productsLoading ? (
          <ActivityIndicator
            size={'large'}
            color={Colors.border}
            style={styles.center}
          />
        ) : (
          <ProductList data={products || []} />
        )}
      </View>
    </View>
  );
};

export default ProductCategories;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#fff'},
  subContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
