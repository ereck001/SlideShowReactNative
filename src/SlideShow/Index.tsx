import { Dimensions, FlatList, Pressable, View } from "react-native";
import styles from "./styles";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type DataType = {
  id: string;
  img: string;
};

const DATA: DataType[] = [
  {
    id: String(Math.floor(Math.random() * 1000)),
    img: require("../assets/images/image1.jpg"),
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    img: require("../assets/images/image2.jpg"),
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    img: require("../assets/images/image3.jpg"),
  },
  {
    id: String(Math.floor(Math.random() * 1000)),
    img: require("../assets/images/image4.jpg"),
  },
];
export default (): JSX.Element => {
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = windowWidth * 0.92;
  const cardMargin = 8;
  const snapToOffsets = [0];
  const flatList = useRef<FlatList>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);  
  const [currentIndex, setCurrentIndex] = useState<number>(0); 
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const LIST_LENGTH = DATA.length;
  const INTERVAL = 3500

  DATA.map((_, index) => {
    snapToOffsets.push(
      (index + 1) * windowWidth - cardMargin * (2 * index) - cardMargin * 2
    );
  });

  useEffect( ()=>{
    if(currentIndex == LIST_LENGTH){
      setCurrentIndex(0)
    }    
    initRoll(currentIndex)  
  },[currentIndex])

  async function initRoll(i:number):Promise<void>{
    if(i < LIST_LENGTH){
      await  handleRoll(i)      
    }    
  }
  
  async function handleRoll(i:number):Promise<void>{ 
    const myPromise = new Promise(() => {
      setTimeout(() => {
        // console.log(i);        
        handleDotClick(i)   
        setCurrentIndex(i + 1)             
      }, INTERVAL);      
    });

    await myPromise
  }

  function handleDotClick(i: number): void {
    setCurrentImage(i);
    flatList.current?.scrollToOffset({ offset: snapToOffsets[i] });
  }

  function renderDot(dot: DataType, index: number): JSX.Element {
    const dotWidth = useSharedValue<number>(12);
    useEffect(() => {
      if (currentImage == index) {
        dotWidth.value = withTiming(24, { duration: 500 });
      } else {
        if (dotWidth.value != 12)
          dotWidth.value = withTiming(12, { duration: 500 });
      }
    }, [currentImage]);
    return (
      <AnimatedPressable
        //onPress={() => handleDotClick(index)}
        key={dot.id}
        style={[styles.dot, { width: dotWidth }]}
      />
    );
  }

  return (
    <>
      <View style={[styles.container, { height: windowWidth }]}>
        <FlatList
          ref={flatList}
          scrollEnabled={false}
          snapToOffsets={snapToOffsets}
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
          horizontal
          scrollEventThrottle={16}
          decelerationRate="normal"
          data={DATA}
          keyExtractor={(item: DataType) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.item,
                {
                  height: cardWidth,
                  width: cardWidth,
                  marginHorizontal: cardMargin,
                },
              ]}
            >
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                source={item.img}
                placeholder="image"
                contentFit="cover"
              />
            </View>
          )}
        />
        <View style={[styles.dots, { width: DATA.length * 15 + 20 }]}>
          {DATA.map(renderDot)}
        </View>
      </View>
    </>
  );
};
