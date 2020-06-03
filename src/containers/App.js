import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'

import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import CardList from '../components/CardList'
import ErrorBoundary from '../components/ErrorBoundary'

import './App.css'

function App() {
  const [state, setState] = useState({
    robots: [],
    searchField: '',
  })
  const { robots, searchField } = state
  const filteredRobots =
    robots.filter((robot) =>
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    ) || []
  const handleSearchFieldDebounce = debounce(handleSearchField, 250)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => {
        setState((state) => ({
          ...state,
          robots: users,
        }))
      })
  }, [])

  return (
    <div className='tc'>
      <ErrorBoundary>
        <h1 className='f2'>RoboFriend</h1>
        <SearchBox onSearchChange={onSearchChange} />
        <Scroll>
          {robots.length ? (
            <CardList robots={filteredRobots} />
          ) : (
            <h4>loading...</h4>
          )}
        </Scroll>
      </ErrorBoundary>
    </div>
  )

  function onSearchChange(e) {
    const searchFieldValue = e.target.value
    handleSearchFieldDebounce(searchFieldValue)
  }

  function handleSearchField(searchFieldValue) {
    setState((state) => ({
      ...state,
      searchField: searchFieldValue,
    }))
  }
}

export default App
