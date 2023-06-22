// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_FAV = "session/ADD_FAV"
const DELETE_FAV = "session/DELETE_FAV"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const addFav = (newUser) => ({
	type: ADD_FAV,
	newUser
})
const deleteFav = (newUser) => ({
	type: DELETE_FAV,
	newUser
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (first_name, last_name, email, password) => async (dispatch) => {

	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name,
			last_name,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const thunkAddFav = (plant_id) => async (dispatch) => {

	const res = await fetch(`/api/users/favorites/${plant_id}`, {
		method: 'PUT',
		headers: { "Content-Type": 'application/json' }
	})
	const data = await res.json();
	if (res.ok) {
		dispatch(addFav(data))
		return data;
	} else {
		return
	}
}

export const thunkDeleteFav = (plant_id) => async (dispatch) => {

	const res = await fetch(`/api/users/favorites/${plant_id}`, {
		method: 'DELETE',
	})
	const data = await res.json();
	if (res.ok) {
		dispatch(deleteFav(data))
		return data;
	} else {
		return data
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_FAV:
			return { ...action.newUser }
		case DELETE_FAV:
			return { ...action.newUser }
		default:
			return state;
	}
}
