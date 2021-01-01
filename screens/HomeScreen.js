import React, {useState} from 'react';

import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import category_data from './data_repo/category_data';
import restaurant_data from './data_repo/restaurant_data';

const HomeScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedRestaurant, setSelectedRetaurant] = useState([]);
  function getCategoryNameById(id) {
    let category = category_data.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return '';
  }

  const RenderHotels = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          padding: 20,
          flexDirection: 'column',
        }}>
        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
          <Image
            source={item.photo}
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: 200,
              marginEnd: 20,
              borderRadius: 20,
            }}
          />
          <View
            style={{
              position: 'absolute',
              borderTopRightRadius: 20,
              bottom: 0,
              width: SIZES.width * 0.3,
              height: 50,
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
              borderBottomLeftRadius: 20,
            }}>
            <Text style={{...FONTS.h4}}>{item.duration}</Text>
          </View>
        </View>
        <Text style={{...FONTS.body2, marginTop: 20}}>{item.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={icons.star}
            style={{height: 23, width: 23, tintColor: COLORS.primary}}
          />

          <Text style={{...FONTS.body3, marginStart: 10}}>{item.rating}</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 10,
            }}>
            {item.categories.map((categoryId) => {
              return <Text>{getCategoryNameById(categoryId)}, </Text>;
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: 'center',
            padding: 5,
          }}>
          <Image
            source={icons.nearby}
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            width: '70%',
            height: '100%',
            borderRadius: 30,
            backgroundColor: '#EFEFF1',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
            }}>
            {' '}
            Location
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: 'center',
            padding: 5,
          }}>
          <Image
            source={icons.basket}
            style={{height: 30, width: 30, resizeMode: 'contain'}}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  function onIdSelection(item) {
    setSelectedCategoryId(item.id);
    console.log('===', item.id);
    let selectedData = restaurant_data.filter((data) =>
      data.categories.includes(item.id),
    );
    setSelectedRetaurant(selectedData);
    console.log('===', selectedData);
  }

  const RenderMainCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onIdSelection(item);
        }}
        style={{
          height: 100,

          borderRadius: 30,
          margin: 10,
          padding: 5,
          flexDirection: 'column',
          backgroundColor:
            selectedCategoryId == item.id ? COLORS.primary : COLORS.white,
          ...styles.shadow,
        }}>
        <View
          style={{
            marginTop: 5,
            width: 50,
            borderRadius: 25,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor:
              selectedCategoryId == item.id ? COLORS.white : COLORS.lightGray3,
          }}>
          <Image style={{height: 25, width: 25}} source={item.icon} />
        </View>
        <Text
          style={{
            ...FONTS.body5,
            textAlign: 'center',
            color: selectedCategoryId == item.id ? COLORS.white : COLORS.black,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader />
      <Text style={{...FONTS.h1, padding: 10}}>{`Main \nCategories`}</Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={category_data}
          renderItem={RenderMainCategory}
        />
      </View>

      <FlatList data={selectedRestaurant} renderItem={RenderHotels} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
export default HomeScreen;
