import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FloatImages } from '../images/images';

const FloatButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={FloatImages.baseball} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Android 그림자
    elevation: 5,
  },
  icon: {
    width: 35, 
    height: 35, 
    marginTop: 3,
    marginLeft: 3,
  },
});

export default FloatButton;
