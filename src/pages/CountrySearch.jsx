import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const region = searchParams.get('region');

    if (!region) return;
    setIsLoading(true);
    fetchByRegion(region)
      .then(data => setCountries(data))
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  const handleSubmit = region => {
    setSearchParams({ region });
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
