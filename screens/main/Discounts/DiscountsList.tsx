import React from 'react';
import {Button, Icon, IconElement, List, ListItem} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: 'Descompte titol',
  description: 'Descompte descricpió',
});

export const DiscountsList = (): React.ReactElement => {
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
      <Text style={{fontSize: 16, color: 'white'}}>70%</Text>
    </View>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryRight={renderItemAccessory}
    />
  );

  return <List style={styles.container} data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
