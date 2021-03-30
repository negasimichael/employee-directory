import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Section from './Section'

const Container = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        getRandomUsers()
    }, [])

    const getRandomUsers = async () => {
        const result = await axios('https://randomuser.me/api/?results=50&nat=us')
        setUsers(result.data.results)
    }

    const getSearchResults = () => {
        console.log('Searching for:', search)
        const searchedUser = users.filter(user => search.indexOf(user.name.first) > -1 || search.indexOf(user.name.last) > -1)
        console.log(searchedUser)
        setUsers(searchedUser)
    }

    const clearSearch = () => {
        setSearch("")
        getRandomUsers()
    }

    const handleInputChange = evt => {
        setSearch(evt.target.value)
        console.log(evt.target.value)
    }

    const handleFormSubmit = evt => {
        evt.preventDefault()
        getSearchResults()
    }

    const sortEmail = () => {
        console.log('pending!')
        const response = users.sort((list1, list2) => {
            if (list1.email < list2.email) {
                return -1
            }
            if (list1.email > list2.email) {
                return 1
            }
            return 0
        })
        console.log('response List: ', response)
        setUsers([...response])
    }

    const sortNumber = () => {
        console.log('pending!')
        const response = users.sort((list1, list2) => {
            if (list1.phone < list2.phone) {
                return -1
            }
            if (list1.phone > list2.phone) {
                return 1
            }
            return 0
        })
        console.log('response List: ', response)
        setUsers([...response])
    }

    return (

        <div className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>

            <div
                className="input-group mb-3 float-center">
                <input
                    value={search} onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    placeholder="Name" aria-label="Recipient's username" aria-describedby="button-addon2"
                />

                <button
                    onClick={handleFormSubmit}
                    className="btn btn-outline-primary"
                    type="submit" id="button-addon2">
                    Search
                     </button>
                     
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "auto", color: "gray" }}>

            </div>
            <Section list={users} sortEmail={sortEmail} sortNumber={sortNumber} />
        </div>
    )
}

export default Container