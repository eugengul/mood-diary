import { SKELETON_ANIMATION_TIME } from "@/constants/constants";
import { PropsWithChildren } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface SkeletonAnimationProps extends PropsWithChildren {
  isLoading: boolean;
}

export default function SkeletonAnimation({
  isLoading,
  children,
}: SkeletonAnimationProps) {
  return isLoading ? (
    <Animated.View
      exiting={FadeOut.duration(SKELETON_ANIMATION_TIME)}
      style={{ flex: 1 }}
      key="skeleton"
    >
      {children}
    </Animated.View>
  ) : (
    <Animated.View
      entering={FadeIn.duration(SKELETON_ANIMATION_TIME)}
      style={{ flex: 1 }}
      key="loaded"
    >
      {children}
    </Animated.View>
  );
}
