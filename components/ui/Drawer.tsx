import React, { useEffect, useState } from 'react';
import { View, BackHandler, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Divider, Text, useTheme, Surface, TouchableRipple } from 'react-native-paper';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS,
  cancelAnimation 
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
  width?: number;
  style?: any;
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'left',
  width = 280,
  style,
}: DrawerProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const progress = useSharedValue(0);
  
  // Ensure side is properly handled
  const drawerSide = side === 'right' ? 'right' : 'left';
  
  // Control visibility
  useEffect(() => {
    if (open && !isVisible) {
      console.log(`[Drawer] Opening drawer on ${drawerSide} side`);
      setIsVisible(true);
    }
  }, [open, isVisible, drawerSide]);

  // Animation control
  useEffect(() => {
    if (!isVisible) return;
    
    try {
      // Cancel any ongoing animations
      cancelAnimation(progress);
      
      if (open) {
        // Open animation
        progress.value = withTiming(1, {
          duration: 250,
          easing: Easing.out(Easing.cubic),
        });
      } else {
        // Close animation with callback to hide drawer after animation completes
        progress.value = withTiming(0, {
          duration: 200,
          easing: Easing.in(Easing.cubic),
        }, (finished) => {
          if (finished) {
            runOnJS(setIsVisible)(false);
          }
        });
      }
    } catch (error) {
      console.error('[Drawer] Animation error:', error);
      // Fallback in case of animation errors
      if (!open) {
        setIsVisible(false);
      }
    }
    
    // Cleanup animations on unmount
    return () => {
      cancelAnimation(progress);
    };
  }, [open, progress, isVisible]);

  // Handle hardware back button (Android)
  useEffect(() => {
    const handleBackPress = () => {
      if (open) {
        console.log('[Drawer] Back button pressed, closing drawer');
        onClose();
        return true; // Prevent default behavior
      }
      return false;
    };
    
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => subscription.remove();
  }, [open, onClose]);

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.5,
  }));
  
  const drawerStyle = useAnimatedStyle(() => {
    const translateValue = (1 - progress.value) * (drawerSide === 'left' ? -width : width);
    return {
      transform: [{ translateX: translateValue }],
    };
  });
  
  // Don't render anything when drawer is not visible
  if (!isVisible) return null;
  
  return (
    <View style={styles.container}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View 
          style={[styles.backdrop, backdropStyle, { backgroundColor: theme.colors.backdrop }]} 
        />
      </TouchableWithoutFeedback>
      
      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width,
            [drawerSide]: 0,
            height: '100%',
          },
          drawerStyle,
        ]}
      >
        <Surface
          elevation={4}
          style={[
            {
              flex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.elevation.level1,
              borderColor: theme.colors.outline,
              borderRightWidth: drawerSide === 'left' ? StyleSheet.hairlineWidth : 0,
              borderLeftWidth: drawerSide === 'right' ? StyleSheet.hairlineWidth : 0,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: drawerSide === 'left' ? insets.left : 0,
              paddingRight: drawerSide === 'right' ? insets.right : 0,
            },
            style
          ]}
        >
          {children}
        </Surface>
      </Animated.View>
    </View>
  );
}

export function DrawerContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
}

export function DrawerHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View style={[styles.header, style]}>
      {children}
      <Divider />
    </View>
  );
}

export function DrawerFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View style={[styles.footer, style]}>
      <Divider />
      {children}
    </View>
  );
}

export function DrawerTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <Text variant="titleLarge" style={style}>{children}</Text>
  );
}

export function DrawerDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <Text variant="bodyMedium" style={style}>{children}</Text>
  );
}

export function DrawerItem({
  title,
  icon,
  onPress,
  active = false,
}: {
  title: string;
  icon: string;
  onPress?: () => void;
  active?: boolean;
}) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor={theme.colors.primaryContainer}
      style={[
        styles.drawerItem,
        active && {
          backgroundColor: colorScheme === 'dark' 
            ? theme.colors.primaryContainer 
            : theme.colors.secondaryContainer,
          borderRadius: 8
        }
      ]}
    >
      <View style={styles.drawerItemContent}>
        <Appbar.Action
          icon={icon}
          color={active ? theme.colors.primary : theme.colors.onSurface}
          size={24}
          style={{ margin: 0 }}
        />
        <Text
          variant="bodyLarge"
          style={[
            styles.drawerItemLabel,
            { color: active ? theme.colors.primary : theme.colors.onSurface }
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1001,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1002,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  drawerItem: {
    marginVertical: 4,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemLabel: {
    marginLeft: 16,
  }
});