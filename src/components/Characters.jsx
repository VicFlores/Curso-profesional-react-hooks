import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import useCharacters from '../hooks/useCharacters'
import Search from './Search';
import './styles/characters.css';

const initialState = {
	favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/'

const favoriteReducer = ( state, action )  => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload]
			}
	
		default:
			return state;
	}
}

const Characters = () => {

	const [charactersFav, dispatch] = useReducer(favoriteReducer, initialState)
	const [search, setSearch] = useState('')
	const searchInput = useRef(null)

	const characters = useCharacters(API)

	const handleClick = fav => {
		dispatch({type: 'ADD_TO_FAVORITE', payload: fav})
	}

/* 	const handleSearch = () => {
		setSearch(searchInput.current.value)
	} */

	const handleSearch = useCallback(() => {
		setSearch(searchInput.current.value)
	}, [])

/* 	const filteredUsers = characters.filter((user) => {
		return user.name.toLowerCase().includes(search.toLowerCase())
	}) */

	const filteredUsers = useMemo(() => 
		characters.filter((user) => {
			return user.name.toLowerCase().includes(search.toLowerCase())
		}),
		[characters, search]
	)

	return (
		<div className='Characters'>

			{ charactersFav.favorites.map(fav => {
				return(
					<div className='Favorites' key={ fav.id }>
						<div className='Favorites__item'>
							<img src={ fav.image } alt=""/>
							<p>Name: { fav.name }</p>
							<p>Gender: { fav.gender }</p>
							<p>Origin: { fav.origin.name }</p>
						</div>
					</div>
				)
			})}

			<Search search={ search } searchInput={ searchInput } handleSearch={ handleSearch } />

			{ filteredUsers.map(res => {
				return (
					<div className='Characters__item' key={ res.id }>

						<h2>{ res.name }</h2>

						<img src={ res.image } alt=""/>

						<p>Origin: { res.origin.name }</p>
						<p>Gender: { res.gender } </p>
						<p>Specie: { res.species } </p>

						<button type='button' onClick={ () => handleClick(res) }>
							Agregar a favoritos
						</button>

					</div>
				)
			})}

		</div>
	)
}

export default Characters
