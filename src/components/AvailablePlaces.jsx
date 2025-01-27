import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resultData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch palces.");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resultData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
        
      } catch (error) {
        setError({ message: error.message || "Could not fetch places. Please try again later." });
        setIsFetching(false);
      }
      
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error has occurred." message={ error.message } />
  }

  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching places data..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
