import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import SearchInput from '../common/SearchInput';
import BusinessList from '../common/BusinessList';

import {AUTO_CAPITALIZE} from '../../constants/input';
import {Props} from './ConnectedSearchScreen';
import {filterBusinessesByPriceType} from '../../utils/filterBusinessesByPriceType';
import {Business} from '../../store/businesses/types';

function SearchScreen(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [lowCostBusinesses, setLowCostBusinesses] = useState([] as Business[]);
  const [averageCostBusinesses, setAverageCostBusinesses] = useState([] as Business[]);
  const [highCostBusinesses, setHighCostBusinesses] = useState([] as Business[]);
  const [error, setError] = useState('');
  const businessesError = props.businesses?.error;
  const businessesCollection = props.businesses.data;

  const onTermSubmit = () => {
    props.thunkGetBusinessesData(searchTerm);
  }

  useEffect(() => {
    props.thunkGetBusinessesData('pasta');
  }, [])

  useEffect(() => {
    setLowCostBusinesses(filterBusinessesByPriceType(businessesCollection, '$'));
    setAverageCostBusinesses(filterBusinessesByPriceType(businessesCollection, '$$'));
    setHighCostBusinesses(filterBusinessesByPriceType(businessesCollection, '$$$'));
  }, [businessesCollection])

  useEffect(() => {
      setError(businessesError?.message ? businessesError.message : '');
  }, [businessesError])

  return (
    <View style={styles.searchContainer}>
      <SearchInput
        autoCapitalize={AUTO_CAPITALIZE.none}
        placeholder="Search"
        autoCorrect={false}
        searchTermValue={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearchTermSubmit={onTermSubmit}
      />
      {error ? <Text>{error}</Text> : null}
      <BusinessList
        title="Cost Effective"
        businesses={lowCostBusinesses}
      />
      <BusinessList
        title="Bit Pricier"
        businesses={averageCostBusinesses}
      />
      <BusinessList
        title="Big Spender"
        businesses={highCostBusinesses}
      />
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    flex: 1
  }
});