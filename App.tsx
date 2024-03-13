import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

import { Routes } from './src/routes/index';

export default function App() {

  return (
    <View style={styles.container}>

      <Routes />
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});