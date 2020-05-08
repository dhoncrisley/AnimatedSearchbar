/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Animated, {
  Value,
  set,
  add,
  sub,
  Clock,
  Easing,
} from 'react-native-reanimated';
import {timing, interpolateColor} from 'react-native-redash';
import FAicon from 'react-native-vector-icons/FontAwesome';
const {useCode} = Animated;
const {width} = Dimensions.get('window');

const Touchablle = Animated.createAnimatedComponent(TouchableOpacity);
const Input = Animated.createAnimatedComponent(TextInput);
const Icon = Animated.createAnimatedComponent(FAicon);
const inputRange = [0, 1];
const App: () => React$Node = () => {
  const inputRef = useRef(null);
  const [clock] = useState(new Clock());

  const [showInput, setShowInput] = useState(false);
  const [showing, setShowing] = useState(false);
  const [animatedValue] = useState(new Value(0));
  const [headerContentHeight] = useState(new Value(0));
  const [hiddenContentHeight] = useState(new Value(1));

  useCode(() => {
    const TIME = 500;
    if (showing) {
      setShowInput(true);

      return set(
        animatedValue,
        timing({
          clock,
          duration: TIME,
          to: add(headerContentHeight, hiddenContentHeight),
          from: animatedValue,
          easing: Easing.bezier(0.5, 0, 0, 1),
        }),
      );
    } else {
      setTimeout(() => setShowInput(false), 50);
      return set(
        animatedValue,
        timing({
          clock,
          duration: TIME,
          to: headerContentHeight,
          from: animatedValue,
          easing: Easing.bezier(0.5, 0, 0, 1),
        }),
      );
    }
  }, [showing]);
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView>
        <Animated.View
          style={{
            marginBottom: animatedValue.interpolate({
              inputRange,
              outputRange: [0, 195],
            }),
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Animated.View
              style={{
                paddingHorizontal: animatedValue.interpolate({
                  inputRange,
                  outputRange: [10, 0],
                }),
                overflow: 'hidden',
                width: animatedValue.interpolate({
                  inputRange,
                  outputRange: [100, 0],
                }),
              }}>
              <Text
                style={{
                  color: '#fff',
                  width: 120,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Title
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                height: 45,
                alignItems: 'center',
                overflow: 'hidden',

                backgroundColor: interpolateColor(animatedValue, {
                  inputRange,
                  outputRange: ['#fff0', '#ffff'],
                }),
                borderRadius: animatedValue.interpolate({
                  inputRange,
                  outputRange: [0, 100],
                }),
                width: animatedValue.interpolate({
                  inputRange,
                  outputRange: [45, width - 20],
                }),
              }}>
              <Touchablle
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 45,
                  height: 45,
                }}
                onPress={() => setShowing(true)}>
                <Icon
                  size={24}
                  style={{
                    color: interpolateColor(animatedValue, {
                      inputRange,
                      outputRange: ['#ffff', '#000'],
                    }),
                  }}
                  name="search"
                />
              </Touchablle>
              {showInput && (
                <Input
                  autoFocus
                  // ref={inputRef}
                  style={{
                    height: 30,
                    borderRadius: 15,
                    paddingHorizontal: 15,
                    opacity: animatedValue,
                    backgroundColor: '#eee',
                    padding: 0,
                    width: animatedValue.interpolate({
                      inputRange,
                      outputRange: [0, width - 110],
                    }),
                  }}
                />
              )}
              <Touchablle
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',

                  width: 45,
                  height: 45,
                }}
                onPress={() => setShowing(false)}>
                <Icon
                  size={24}
                  style={{
                    opacity: animatedValue,
                    color: interpolateColor(animatedValue, {
                      inputRange,
                      outputRange: ['#ffff', '#000'],
                    }),
                  }}
                  name="close"
                />
              </Touchablle>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={{
              top: 55,
              borderRadius: 15,
              position: 'absolute',
              width: width - 20,
              height: 180,
              opacity: animatedValue,
              transform: [{scale: animatedValue}],
              backgroundColor: '#FFF',
            }}
          />
        </Animated.View>
        {images.map((uri, i) => (
          <ImageBackground
            key={i}
            style={{
              borderRadius: 15,
              overflow: 'hidden',
              marginHorizontal: 10,
              marginVertical: 5,
              height: 150,
              width: width - 20,
            }}
            source={{
              uri,
            }}
          />
        ))}
      </SafeAreaView>
    </View>
  );
};
const images = [
  'https://lh3.googleusercontent.com/proxy/-CkL4wH2kRlYF2P7NYE1MrXKS5JTDqM1td4BbIT1BFvM1kvBtDZHO0V1R61vxEuccrJ235YbisCmUewLy39ZWJ122YdBT-5kH_kuqr9znO9UthBqrHGTMzIdjQUaZUDTKcb0SnZh4f35KDokyLjKygF80vEnojCEaER8rPreNdvnn7-YBg',
  'https://png.pngtree.com/thumb_back/fw800/back_our/20190623/ourmid/pngtree-blue-geometric-business-minimalistic-business-card-background-image_237858.jpg',
];
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
