export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const resultData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch palces.");
    }

    return resultData.places;
}

export async function updateUserPlaces(places) {
    const response =  await fetch("http://localhost:3000/user-places0", {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to update user data");
    }

    return responseData.message;
}