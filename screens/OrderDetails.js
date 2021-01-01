import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
const OrderDetails = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);

  const [restaurants, setRestaurants] = useState();
  const [orderItems, setOrderItems] = React.useState([]);

  useEffect(() => {
    let {item} = route.params;
    setRestaurants(item);
  }, []);

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId == menuId);

    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList);
    }
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter((a) => a.menuId == menuId);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);

    return itemCount;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  }

  const RenderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: 50,
            justifyContent: 'center',
            padding: 5,
          }}>
          <Image
            source={icons.back}
            style={{
              tintColor: COLORS.darkgray,

              height: 30,
              width: 30,
              resizeMode: 'contain',
            }}
          />
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
            source={icons.list}
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.darkgray,
              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal={true}
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}>
        {restaurants?.menu.map((item, index) => {
          return (
            <View key={`menu-${index}`} style={{alignItems: 'center'}}>
              <View style={{height: SIZES.height * 0.3}}>
                <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{height: '100%', width: SIZES.width}}
                />
                <View
                  style={{
                    bottom: -20,
                    position: 'absolute',
                    flexDirection: 'row',
                    width: SIZES.width,
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <TouchableOpacity
                    onPress={() => editOrder('-', item.menuId, item.price)}
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomLeftRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <Text styles={{...FONTS.body1}}>-</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>{getOrderQty(item.menuId)}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => editOrder('+', item.menuId, item.price)}
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopEndRadius: 30,
                      borderBottomEndRadius: 30,
                    }}>
                    <Text styles={{...FONTS.body1}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={{...FONTS.h2}}>{item.name}</Text>
                <Text style={{...FONTS.body3}}>{item.description}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={icons.fire} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.darkgray,
                      textAlign: 'center',
                    }}>
                    {item.calories}calories
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  };
  const RenderOrder = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopEndRadius: 30,
          borderTopLeftRadius: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}>
          <Text style={{...FONTS.h3}}>
            {getBasketItemCount()} items in Cart
          </Text>
          <Text style={{...FONTS.h3}}>{sumOrder()}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.location}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{...FONTS.h3}}>Location</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.master_card}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{...FONTS.h3}}>Location</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: SIZES.padding * 2,
            marginEnd: SIZES.padding * 2,
            backgroundColor: COLORS.primary,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Order</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const RenderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: SIZES.padding,
            justifyContent: 'center',
          }}>
          {restaurants?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader />
      <RenderFoodInfo />
      <View>
        <RenderDots />
      </View>
      <View>
        <RenderOrder />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
});
export default OrderDetails;
