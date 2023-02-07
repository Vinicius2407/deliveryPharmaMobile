import { useCallback } from "react";
import { View } from 'react-native';
import { FlatList, FlatListProps } from "react-native";
import { Highlight } from "../../globals/styles.global";

interface ListProps extends FlatListProps<any> {
  data: any;
  emptyListMessage?: string;
}

interface EmptyListProps {
  message?: string;
}

const EmptyList = ({ message }: EmptyListProps) => { // --code
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Highlight>
        {!!message ? message : 'Nenhum resultado encontrado'}
      </Highlight>
    </View>
  )
}

export function List({ data, emptyListMessage, ...props }: ListProps) {
  // const keyExtractor = useCallback((item: { id: any }) => String(item.id), []);
  return (
    <FlatList
      {...props}
      data={data}
      keyExtractor={data.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyList message={emptyListMessage} />} // --code
    />
  );
}
