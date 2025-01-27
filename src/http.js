export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const resultData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch palces.");
    }

    return resultData.places;
}