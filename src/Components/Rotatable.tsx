import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  PanResponder,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';

type RotatablePieProps = {
  initialAngle: number; // degrees
  size: number; // width/height
  children: React.ReactNode; // your Pie chart
  onAngleChange?: (angle: number) => void;
};

// ----------------------------------------
// Ultra-smooth animation helper
// Throttles to ~60 FPS AND applies low-pass filtering
// ----------------------------------------
function createSmoothUpdater(
  animatedValue: Animated.Value,
  smoothing = 0.15,
  fps = 60,
) {
  const frameDelay = 1000 / fps;
  let lastTime = 0;
  let filtered = 0; // low-pass output
  let timeout: any = null;

  return (target: number) => {
    const now = Date.now();
    const diff = now - lastTime;

    const update = () => {
      // low-pass filter (natural smoothing)
      filtered = filtered * (1 - smoothing) + target * smoothing;
      animatedValue.setValue(filtered);
    };

    if (diff >= frameDelay) {
      lastTime = now;
      update();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastTime = Date.now();
        update();
      }, frameDelay - diff);
    }
  };
}

export function RotatablePie({
  initialAngle,
  size,
  children,
  onAngleChange,
}: RotatablePieProps) {
  const angle = useRef(new Animated.Value(initialAngle)).current;

  const [center, setCenter] = useState({x: size / 2, y: size / 2});

  const gestureStartAngle = useRef(0);
  const startAngle = useRef(initialAngle);

  // Create smooth updater ONCE
  const smoothSetAngle = useRef(createSmoothUpdater(angle, 0.15, 60)).current;

  useEffect(() => {
    angle.setValue(initialAngle);
    startAngle.current = initialAngle;
  }, [initialAngle, angle]);

  useEffect(() => {
    const id = angle.addListener(({value}) => onAngleChange?.(value));
    return () => angle.removeListener(id);
  }, [angle, onAngleChange]);

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setCenter({x: width / 2, y: height / 2});
  };

  const getTouchAngleDeg = (x: number, y: number) => {
    const dx = x - center.x;
    const dy = y - center.y;
    const rad = Math.atan2(dy, dx);
    return (rad * 180) / Math.PI;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: evt => {
        const {locationX, locationY} = evt.nativeEvent;
        gestureStartAngle.current = getTouchAngleDeg(locationX, locationY);

        angle.stopAnimation(current => {
          startAngle.current = current;
        });
      },

      onPanResponderMove: evt => {
        const {locationX, locationY} = evt.nativeEvent;

        const currentAngle = getTouchAngleDeg(locationX, locationY);
        let delta = currentAngle - gestureStartAngle.current;

        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const next = startAngle.current + delta;

        // 🔥 SUPER SMOOTH UPDATE
        smoothSetAngle(next);
      },
    }),
  ).current;

  const rotateInterpolation = angle.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, {width: size, height: size}]}
      {...panResponder.panHandlers}>
      <Animated.View
        style={{
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{rotate: rotateInterpolation}],
        }}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
