// App.tsx
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

export default function App() {

  // =========================
  // STATE VARIABLES
  // =========================

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');

  const [menuItems, setMenuItems] = useState<any[]>([]);

  // =========================
  // ADD MENU ITEM
  // =========================

  const addMenuItem = () => {

    if (
      dishName === '' ||
      description === '' ||
      price === '' ||
      course === ''
    ) {
      Alert.alert('Error', 'Please complete all fields');
      return;
    }

    const newItem = {
      name: dishName,
      description: description,
      price: price,
      course: course,
    };

    setMenuItems([...menuItems, newItem]);

    // CLEAR INPUTS

    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('');

    Alert.alert('Success', 'Menu item added');
  };

  // =========================
  // DELETE MENU ITEM
  // =========================

  const deleteItem = (indexToDelete: number) => {

    const updatedItems = menuItems.filter(
      (_, index) => index !== indexToDelete
    );

    setMenuItems(updatedItems);
  };

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = menuItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  // =========================
  // UI
  // =========================

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView>

        {/* TITLE */}

        <Text style={styles.title}>
          Chef Christoffel App
        </Text>

        {/* DISH NAME */}

        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          value={dishName}
          onChangeText={setDishName}
        />

        {/* DESCRIPTION */}

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        {/* PRICE */}

        <Text style={styles.label}>
          Price
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={(text) => {

            // ALLOW ONLY NUMBERS

            const numericText = text.replace(/[^0-9]/g, '');

            setPrice(numericText);
          }}
        />

        {/* COURSE */}

       <Text style={styles.label}>
  Select Course
</Text>

<View style={styles.pickerContainer}>

  <Picker
    selectedValue={course}
    onValueChange={(itemValue) => setCourse(itemValue)}
  >
    <Picker.Item
      label="Choose a course..."
      value=""
    />

    <Picker.Item
      label="Starter"
      value="Starter"
    />

    <Picker.Item
      label="Main"
      value="Main"
    />

    <Picker.Item
      label="Dessert"
      value="Dessert"
    />

  </Picker>

</View>
        {/* ADD BUTTON */}

        <TouchableOpacity
          style={styles.addButton}
          onPress={addMenuItem}
        >
          <Text style={styles.addButtonText}>
            Add Menu Item
          </Text>
        </TouchableOpacity>

        {/* TOTAL ITEMS */}

        <Text style={styles.totalText}>
          Total Menu Items: {menuItems.length}
        </Text>

        {/* TOTAL PRICE */}

        <Text style={styles.totalText}>
          Total Price: R{totalPrice}
        </Text>

        {/* MENU HEADING */}

        <Text style={styles.menuHeading}>
          Menu List
        </Text>

        {/* EMPTY MESSAGE */}

        {
          menuItems.length === 0 && (
            <Text style={styles.emptyText}>
              No menu items added yet.
            </Text>
          )
        }

        {/* MENU ITEMS */}

        {
          menuItems.map((item, index) => (

            <View key={index} style={styles.menuCard}>

              <Text style={styles.menuTitle}>
                {item.name}
              </Text>

              <Text style={styles.menuText}>
                {item.description}
              </Text>

              <Text style={styles.menuText}>
                Course: {item.course}
              </Text>

              <Text style={styles.menuText}>
                Price: R{item.price}
              </Text>

              {/* DELETE BUTTON */}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(index)}
              >
                <Text style={styles.deleteText}>
                  Delete
                </Text>
              </TouchableOpacity>

            </View>

          ))
        }

      </ScrollView>

    </SafeAreaView>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({

  pickerContainer: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#d1d1d1',
  borderRadius: 14,
  marginBottom: 20,
},
container: {
  flex: 1,
  backgroundColor: '#FAFAFA',
  padding: 20,
},

  title: {
  fontSize: 34,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 30,
  color: '#2E7D32',
},

  label: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    color: '#222',
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
  },

  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 25,
  },

  courseButton: {
    backgroundColor: '#8a8a8a',
    width: '31%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  selectedButton: {
    backgroundColor: '#2e7d32',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addButton: {
  backgroundColor: '#2E7D32',
  padding: 18,
  borderRadius: 14,
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 25,
},

  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },

  menuHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    color: '#000',
  },

  emptyText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },

  menuCard: {
  backgroundColor: '#ffffff',
  padding: 20,
  borderRadius: 16,
  marginBottom: 18,
  borderLeftWidth: 6,
  borderLeftColor: '#2E7D32',
},

  menuTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  menuText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },

  deleteButton: {
  backgroundColor: '#C62828',
  marginTop: 15,
  padding: 12,
  borderRadius: 10,
  alignItems: 'center',
},

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});