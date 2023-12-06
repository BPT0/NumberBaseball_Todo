import React, { useEffect, useState } from 'react';
import { View, Text, Modal,
     StyleSheet,TouchableOpacity,
     BackHandler,
} from 'react-native';



const CategoryModal = ({ isVisible, onClose, title, color, category }) => {
    useEffect(() => {
        const backAction = () => {
          console.log('Back button pressed, isVisible:', isVisible);
          if (isVisible) {
            onClose();
            return true;
          }
          return false;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    }, [isVisible, onClose]);
    
    
    
    
    return (
      <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <View style={[styles.modalContent, { backgroundColor: color }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.taskCount}>{category.tasks?.length} task(s)</Text>
            {category?.tasks?.map((task, index) => (
              <Text key={index} style={styles.taskText}>
                {task.text}
              </Text>
            ))}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{color: 'white'}}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    
    );
  };
  


  const styles = StyleSheet.create({
    modalView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    modalContent: {
      marginTop: '7%',
      backgroundColor: '#61DEA4', 
      borderRadius: 20, 
      padding: 20, 
      alignItems: 'center', 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalHeader: {
      width: '100%', 
      alignItems: 'center',
      marginBottom: 10,
    },
    modalTitle: {
      color: 'white',
      fontSize: 24, 
      fontWeight: 'bold', 
    },
    taskCount: {
      color: 'white', 
      fontSize: 16, 
    },
    closeButton: {
      position: 'absolute', 
      top: 10, 
      right: 10, 
    },
  });

  

export default CategoryModal;
