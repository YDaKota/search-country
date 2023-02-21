import { Section, Container, CountryInfo, Loader } from 'components';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const goBackLink = location?.state?.from ?? '/';

  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetchCountry(id)
      .then(setCountry)
      .catch(error => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Section>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div
              style={{
                marginBottom: '60px',
                color: '#f2f2f2',
                letterSpacing: '0.06em',
                textDecoration: 'underline',

                borderColor: 'gray',
              }}
            >
              <Link to={goBackLink}>Back to Countries</Link>
            </div>
            <CountryInfo
              flag={country.flag}
              capital={country.capital}
              country={country.countryName}
              id={country.id}
              languages={country.languages}
              population={country.population}
            />
          </>
        )}
      </Container>
    </Section>
  );
};
