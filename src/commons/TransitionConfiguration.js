import { Animated, Easing } from 'react-native';
import {
  CollapseExpand, SlideFromRight, FadeTransition, Fliper, SlideFromBottom, SlideFromLeft
} from './animations';


const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const height = layout.initHeight;
      const { index, route } = scene;
      const params = route.params || {};
      let transition = params.transition || 'default';
      transition = transition.toString().toUpperCase()
      return {
        COLLAPSEXPAND: CollapseExpand(index, position),
        FADETRANSITION: FadeTransition(index, position),
        FLIPTRANSITION: Fliper(index, position),
        SLIDEFROMBOTTOM: SlideFromBottom(index, position, height),
        SLIDEFROMLEFT: SlideFromLeft(index, position, width),
        DEFAULT: SlideFromRight(index, position, width),
      }[transition];
    },
  };
};


export default TransitionConfiguration;