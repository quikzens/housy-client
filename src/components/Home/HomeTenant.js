import React, { useEffect, useState } from 'react'
import { useGet } from '../../hooks/useGet'

import Header from '../Header/Header'
import FilterRoom from '../FilterRoom/FilterRoom'
import ListRoom from '../ListRoom/ListRoom'

import mySet from '../../library/mySet'
import './HomeTenant.css'

function HomeTenant() {
  const [filter, setFilter] = useState({
    rent: 'year',
    bedroom: 3,
    bathroom: 2,
    amenities: ['Furnished'],
    budget: 12000000,
  })
  const [houses, setHouses] = useState(null)
  const { data: dataHouses } = useGet('/houses')

  const updateFilter = (ruleType, ruleValue) => {
    switch (ruleType) {
      case 'rent':
        setFilter((filter) => {
          return {
            ...filter,
            rent: ruleValue,
          }
        })
        break

      case 'bedroom':
        setFilter((filter) => {
          return {
            ...filter,
            bedroom: ruleValue,
          }
        })
        break

      case 'bathroom':
        setFilter((filter) => {
          return {
            ...filter,
            bathroom: ruleValue,
          }
        })
        break

      case 'amenities':
        const amenities = filter.amenities

        if (amenities.indexOf(ruleValue) >= 0) {
          amenities.splice(amenities.indexOf(ruleValue), 1)
        } else {
          amenities.push(ruleValue)
        }

        setFilter((filter) => {
          return {
            ...filter,
            amenities: amenities,
          }
        })
        break

      case 'budget':
        setFilter((filter) => {
          return {
            ...filter,
            budget: ruleValue,
          }
        })
        break

      default:
        break
    }
  }

  const applyFilter = async () => {
    const unfilteredContent = dataHouses
    const filteredContent = []

    unfilteredContent.forEach((item) => {
      let isAmenityPassed = false
      const itemAmenities = new mySet(item.amenities)
      const ruleAmenities = new mySet(filter.amenities)
      isAmenityPassed = ruleAmenities.subset(itemAmenities)

      if (
        item.typeRent === filter.rent &&
        item.bedroom === filter.bedroom &&
        item.bathroom === filter.bathroom &&
        item.price <= filter.budget &&
        isAmenityPassed
      ) {
        filteredContent.push(item)
      }
    })

    setHouses(filteredContent)
  }

  const applySearch = async (searchValue) => {
    let houses = dataHouses
    houses = houses.filter((house) =>
      house.address.toLowerCase().includes(searchValue.toLowerCase())
    )
    setHouses(houses)
  }

  useEffect(() => {
    setHouses(dataHouses.reverse())
    return () => {
      setHouses(null)
    }
  }, [dataHouses])

  return (
    <>
      <Header applySearch={applySearch} isWithSearch={true} />
      <main className='main'>
        <FilterRoom
          updateFilter={updateFilter}
          applyFilter={applyFilter}
          filter={filter}
        />
        <ListRoom houses={houses} />
      </main>
    </>
  )
}

export default HomeTenant
