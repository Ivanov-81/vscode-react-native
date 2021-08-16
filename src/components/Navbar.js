import React from 'react';
import { THEME } from '../theme';
import { View, StyleSheet, Platform } from 'react-native';
import { AppTextBold } from './ui/AppTextBold';

export const Navbar = ({ title }) => {
    return (
      <View style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid
        })
      }}>
        <AppTextBold style={styles.text}>{title}</AppTextBold>
      </View>
    );
}

const styles = StyleSheet.create({
  navbar: {
    height: 85,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#FFF',
    fontSize: 22,
  },
});