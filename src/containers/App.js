import React, { useEffect } from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'

import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import CardList from '../components/CardList'
import ErrorBoundary from '../components/ErrorBoundary'

import { setSearchField, requestRobots } from '../actions'

import './App.css'

function App({
  searchField,
  handleSearchField,
  robots,
  isPending,
  error,
  onRequestRobots,
}) {
  const filteredRobots =
    robots.filter((robot) =>
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    ) || []
  const handleSearchFieldDebounce = debounce(handleSearchField, 250)

  useEffect(() => {
    onRequestRobots()
  }, [onRequestRobots])

  return (
    <div className='tc'>
      <ErrorBoundary>
        <h1 className='f2'>RoboFriend</h1>
        <SearchBox onSearchChange={onSearchChange} />
        <Scroll>
          {isPending ? (
            <h4>loading...</h4>
          ) : (
            <CardList robots={filteredRobots} />
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
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchField: (searchFieldValue) =>
      dispatch(setSearchField(searchFieldValue)),
    onRequestRobots: () => dispatch(requestRobots()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
