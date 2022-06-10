import React, {useState} from 'react';

import {
  Text,
  View,
  Pressable
} from 'react-native';

const App = () => {
  console.log('hola')
  const [hola, setHola] = useState(true);
  return (
    <View>
      <Pressable
        onPress={ () => {
          setHola(!hola)
        }}
      >
        <Text>Hola como estas</Text>
      </Pressable>
    </View>
  );
};

export default App;
