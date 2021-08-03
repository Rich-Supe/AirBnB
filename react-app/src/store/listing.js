const SET_LISTING = 'listings/SET_LISTING';
const SET_ALL_LISTINGS = 'listings/SET_ALL_LISTINGS';
// const SET_ALL_LISTINGS_USER = 'listings/SET_ALL_LISTINGS_USER';
const ADD_LISTING = 'listings/ADD_LISTING';
const UPDATE_LISTING = 'listings/UPDATE_LISTING';
const DELETE_LISTING = 'listings/DELETE_LISTING';
const UNLOAD_LISTING = 'listings/UNLOAD_LISTING';
const UNLOAD_LISTINGS = 'listings/UNLOAD_LISTINGS';

const setListing = (listing) => ({
    type: SET_LISTING,
    listing
});

const setAllListings = (listings) => ({
    type: SET_ALL_LISTINGS,
    listings
});

// const setAllListingsUser = (listings) => ({
//     type: SET_ALL_LISTINGS_USER,
//     listings
// });

const addListing = (listing) => ({
    type: ADD_LISTING,
    listing
});

const updateListing = (listing) => ({
    type: UPDATE_LISTING,
    listing
});

const removeListing = (listing) => ({
    type: DELETE_LISTING,
    listing
});

export const unloadListing = () => ({
    type: UNLOAD_LISTING,
});

export const unloadListings = () => ({
    type: UNLOAD_LISTINGS,
});



// all listings
export const getAllListings = () => async (dispatch) => {
    const response = await fetch(`/api/listings/`);
    const listings = await response.json();
    console.log(listings)
    dispatch(setAllListings(listings));
};

// single listing
export const getListing = (id) => async (dispatch) => {
    const response = await fetch(`/api/listings/${id}`);
    const listing = await response.json();
    console.log("listing in thunk:", listing)
    dispatch(setListing(listing));
}

// all listings for user
export const getAllListingsUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/listings/user/${userId}`);
    const listings = await response.json();
    dispatch(setAllListings(listings));
};

// add listing
export const createListing = (listing, images, userId) => async (dispatch) => {
    const listingResponse = await fetch(`/api/listings/create/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });
    
    if (listingResponse.ok) {
        const listing = await listingResponse.json();
        const listingId = listing.id;
        const imageResponse = await fetch(`/api/images/${listingId}`, {
            method: 'POST',
            body: images
        });
        
        if (imageResponse.ok) {
            const newImages = await imageResponse.json();
            const listingImg = { ...listing, newImages };
            dispatch(addListing(listingImg));
            return listingImg;
        }
    }
    else {
        return ['An error occurred. Please try again.']
    }
};

// edit a listing
export const editListing = (listing, images, listingId) => async (dispatch) => {
    const listingResponse = await fetch(`/api/listings/update/${listingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    });

    if (listingResponse.ok) {
        const listing = await listingResponse.json();
        const listingId = listing.id;
        const imageResponse = await fetch(`/api/images/${listingId}`, {
            method: 'POST',
            body: images
        });

        if (imageResponse.ok) {
            const newImages = await imageResponse.json();
            const listingImg = { ...listing, newImages };
            dispatch(updateListing(listingImg));
            return listingImg; 
        }
        else {
            return ['An error occurred. Please try again.']
        }
    }
}

// delete a listing
export const deleteListing = (listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/delete/${listingId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const listing = await response.json();
        dispatch(removeListing(listing));
        return listing;
    }
    else {
        return ['An error occurred. Please try again.']
    }
};

// export const unloadAListing = (listingId) => async (dispatch) => {
//     return "unloaded!"
// }

export default function Reducer(state = {}, action) {
    let newState
    switch (action.type) {
        case SET_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState;
            // return action.listing;
        case SET_ALL_LISTINGS:
            newState = { ...state };
            action.listings.listings.forEach((listing) => {
                newState[listing.id] = listing;
            }
            );
            return newState;
        case ADD_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState;
        case UPDATE_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState;
        case DELETE_LISTING: {}
            // newState = { ...state };
            // delete newState[action.listing.id];
            // return newState;
        case UNLOAD_LISTING:
            newState = { ...state };
            return newState;
        case UNLOAD_LISTINGS:
            newState = { ...state };
            return newState;
        default:
            return state;
    }
};
