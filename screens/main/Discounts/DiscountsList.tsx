import React, {useEffect, useState} from 'react';
import {List, ListItem} from '@ui-kitten/components';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getAllDiscounts} from '../../../database/UsuarisDescomptes/UsuarisDescomptes';
import {FIREBASE_AUTH} from '../../../config/Firebase';
import {NavigationProp} from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export const DiscountsList = ({navigation}: RouterProps) => {
    const [data, setData] = useState<string[]>([]);

    useEffect(() => {
        async function fetchDiscounts() {
            try {
                const email = FIREBASE_AUTH.currentUser?.email;
                if (email) {
                    const discounts = await getAllDiscounts();
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
    const handlePress = (item: string) => {
        navigation.navigate('QrCode', {item});
    };
    const renderItemAccessory = (item: string): React.ReactElement => (
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
            <TouchableOpacity
                style={{width: '100%', height: '100%'}} // Add dimensions here
                onPress={() => handlePress(item)}
            >
                <Text style={{fontSize: 16, color: 'green'}}>??%</Text>
            </TouchableOpacity>
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
                        accessoryRight={renderItemAccessory(item)}
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
