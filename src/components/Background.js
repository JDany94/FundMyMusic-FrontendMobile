import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
    {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  }
})
