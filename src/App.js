import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalStorage } from './utils/input';


function App (props) {
  const [breed, setBreed] = useLocalStorage('breed', 'husky')
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages([])
    fetchDogImages()
  }, [breed])

  // extract this function from lifecycle event since it's used multiple times
  const fetchDogImages = () => {
    axios.get(`https://dog.ceo/api/breed/${breed}/images`)
      .then(result => {
        setImages(result.data.message)
      })
      .catch(error => {
        console.log('error:', error)
      })
  }

  // make our select field controlled by react state
  const handleChange = (event) => {
    setBreed(event.target.value)
  }

  return (
    <>
      <h1>The Dog Website</h1>

      <select value={breed} onChange={handleChange}>
        <option value="husky">Husky</option>
        <option value="beagle">Beagle</option>
        <option value="corgi">Corgi</option>
        <option value="boxer">Boxer</option>
      </select>

      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Dog" />
        ))}
      </div>
    </>
  )
}

export default App;