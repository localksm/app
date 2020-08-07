import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { QUERIES } from '../apollo';
import { setSessionId } from '../utils/hooks';
import { GenericGQLLoading, GenericGQLError, Card } from '.';

const CardProposal = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    setSessionId(setId);
  }, []);

  const { loading, error, data } = useQuery(QUERIES.QUERY_PROPOSALS, {
    variables: { userId: id },
    pollInterval: 6000,
  });
  

  return loading ? (
    <GenericGQLLoading styles={styles} />
  ) : error ? (
    <GenericGQLError styles={styles} error={error} />
  ) : (
    <>
      <FlatList
        data={data.proposals}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={styles.listFooterComponent}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <Card item={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterComponent: {
    height: 30,
  },
  contentContainer: {
    paddingBottom: 300,
  },
});

export default CardProposal;
