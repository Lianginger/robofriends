import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'

import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import CardList from '../components/CardList'
import ErrorBoundary from '../components/ErrorBoundary'

import { setSearchField } from '../actions'

import './App.css'

function App({ searchField, handleSearchField }) {
  const [state, setState] = useState({
    robots: [],
  })
  const { robots } = state
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
}

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchField: (searchFieldValue) => dispatch(setSearchField(searchFieldValue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
