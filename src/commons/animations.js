import React from 'react';
import { Animated } from 'react-native';


export const CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

export const Fliper = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });


  const spin = position.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg']
  });

  return {
    opacity,
    transform: [
      { rotateY: spin }
    ]
  };
};

export const SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};

export const SlideFromLeft = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-width, 0, 0]
  });
  const SlideFromLeft = { transform: [{ translateX }] };
  return SlideFromLeft;
};


export const SlideFromBottom = (index, position, height) => {
  const inputRange = [index - 1, index, index + 1];
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0]
  });
  const slideFromRight = { transform: [{ translateY }] };
  return slideFromRight;
};


export const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index];
  const outputOpacity = [0, 1];
  const Transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity,
  });

  return ({
    opacity: Transition
  });
};

export class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    const { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

