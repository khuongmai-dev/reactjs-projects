import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import Image from "./Image"


const clientID = "?client_id=" + process.env.REACT_APP_ACCESS_KEY
const mainURL = "https://api.unsplash.com/photos/"
const searchURL = "https://api.unsplash.com/search/photos/"


const App = () => {

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")

  const fetchImages = async () => {
    setLoading(true)
    let url
    const URLPage = "&page=" + page
    const URLQuery = "&query=" + query
    if (query) {
      url = searchURL + clientID + URLPage + URLQuery
    }
    else {
      url = mainURL + clientID + URLPage
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      setImages((oldImages) => {
        if (query && page === 1) {
          return data.results
        } 
        else if (query) {
          return [...oldImages, ...data.results]
        } 
        else {
          return [...oldImages, ...data]
        }
      })
      setLoading(false)
    } 
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if ((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener("scroll", event)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchImages()
  }

  return (
    <main className="main-section">
      <section className="section search-section">
        <form className="search-form">
          <input 
            type="text" 
            className="search-input" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <button className="search-button" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="section images-section">
        {
          images.map((image, index) => <Image key={index} {...image} />)
        }
      </section>
      {loading && <h2 className="loading">Loading...</h2>}
    </main>
  )

}


export default App

