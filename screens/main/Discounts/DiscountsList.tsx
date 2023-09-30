import React, {useEffect, useState} from 'react';
import {List, ListItem} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';
import {getAllDiscountsByIdUser} from '../../../database/UsuarisDescomptes/UsuarisDescomptes';
import {FIREBASE_AUTH} from '../../../config/Firebase';
import {getIdByEmail} from '../../../database/Usuaris/Usuaris';

export const DiscountsList = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const email = FIREBASE_AUTH.currentUser?.email;
        if (email) {
          const id = await getIdByEmail(email);
          const discounts = await getAllDiscountsByIdUser(id);

          if (discounts) {
            const dataArray = Object.values(discounts);

            setData(dataArray);
          } else {
            // Handle the case where no discounts were found
          }
        }
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    }

    fetchDiscounts();
  }, []);

  const renderItemAccessory = (): React.ReactElement => (
    <View
      style={{
        height: 40,
        marginTop: 10,
        width: 60,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10, // Adjust the value to control the roundness
      }}>
      <Text style={{fontSize: 16, color: 'white'}}>??%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <List
        data={data}
        renderItem={({item}) => (
          <ListItem
            title={item}
            description="Descompte descripció"
            accessoryRight={renderItemAccessory}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
