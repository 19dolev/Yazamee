import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  I18nManager
} from "react-native";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
import React from "react";
import { LinearGradient } from "expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import styles from "./style";
import Carousel, { Pagination } from "react-native-snap-carousel";

const slides = [
  {
    key: "answer",
    title: "תשובה מותאמת אישית",
    text:
      "לאחר סיום שבעת השאלות, תוכל לדעת אחת ולתמיד- האם להיות יזם זה בשבילך?",
    icon: "comment-o",
    colors: ["#BA68C8", "#9C27B0"]
  },
  {
    key: "slide",
    title: "ממשק אינטואיטיבי",
    text:
      "החלק על הסליידר כדי לבחור עד כמה אתה מסכים עם המשפט שמוצג על המסך. עזוב את הסליידר - ותעבור מיד לשאלה הבאה",
    icon: "hand-pointer-o",
    colors: ["#26c6da", "#0097a7"]
  },

  {
    key: "easy",
    title: "פשוט וקל",
    text: "גלה האם אתה מתאים להיות יזם - בשבע שאלות פשוטות",
    icon: "hourglass-start",
    colors: ["#29b6f6", "#1e88e5"]
  },
];

class IntroScreen extends React.Component {
  get pagination() {
    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={this.state.activeIndex}
        containerStyle={{ backgroundColor: "transparent" }}
        style={{ backgroundColor: "transparent" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(255, 255, 255, 0.92)"
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: slides.length - 1
    };
  }

  _renderItem({ item, index }) {
    return (
      <LinearGradient
        style={styles.container}
        colors={[item.colors[0], item.colors[1]]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.iconContainer}>
            <FontAwesome name={item.icon} color="#fff" size={150} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </LinearGradient>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            this._carousel && slides[this._carousel.currentIndex].colors[0]
        }}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={slides}
          renderItem={this._renderItem}
          sliderWidth={wp("100%")}
          itemWidth={wp("100%")}
          scrollEnabled={false}
          onSnapToItem={slideIndex =>
            this.setState({ activeIndex: slideIndex })
          }
          layout="stack"
          firstItem={slides.length - 1}
        />
        {this.pagination}
        <View style={styles.nextSkipContainer}>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.sideButton}
            onPress={() => {
              if (this.state.activeIndex < slides.length - 1) {
                //last slide
                this.props.onSkipOrFinish();

            }}}
          >
            <Text style={styles.skipText}>
              {this.state.activeIndex > 0 ? "דלג" : ""}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.sideButton}
            onPress={() => {
              if (this.state.activeIndex == 0) {
                //last slide
                this.props.onSkipOrFinish();
              } else {
                this._carousel.snapToPrev();
              }
            }}
          >
            <Text style={styles.nextText}>
              {this.state.activeIndex == 0 ? "סיים" : "הבא"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default IntroScreen;
