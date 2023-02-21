import { Container, CountryList, Heading, Loader, Section } from 'components';
import { getCountries } from 'service/country-service';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCountries()
      .then(data => {
        setCountries(data);
      })
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
