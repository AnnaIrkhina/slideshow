import React, { Fragment, useEffect, useState, useRef } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000)
  //const [id, setId] = useState(null)

  const prevSlide = () => {
    activeIndex > 0 ? setActiveIndex(activeIndex - 1) : setActiveIndex(catalogsList.length-1)
  }
  const nextSlide = () => {
    activeIndex < catalogsList.length-1 ? setActiveIndex(activeIndex + 1) : setActiveIndex(0)
  }
  const onClickItem = (index) => {
    setActiveIndex(index)
  }
  const showStartStop = () => {
    setSlideTimer(!slideTimer)

  }


  const  useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = null;
        const start = Date.now();
       
        function tick() {
            savedCallback.current();
            const date = start - Date.now();
            console.log(`${Math.floor(date / 1000)}`)
        }
        if (slideTimer) {
            id = setInterval(tick, delay);
            return () => clearInterval(id);
        } else {
          clearInterval(id)
        }
        return clearInterval(id)
    }, [slideTimer]);
  }

  useInterval(nextSlide, slideDuration)



  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={prevSlide}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex } 
                onClickItem={ onClickItem }
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={nextSlide}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={showStartStop}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

