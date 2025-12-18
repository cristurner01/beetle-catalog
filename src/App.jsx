import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {nanoid} from 'nanoid'
import AddBeetle from './components/AddBeetle';
import Beetle from './components/Beetle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash'
import './App.css'

function App() {
  const [allBeetles, setAllBeetles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keyWords, setKeyWords] = useState('');
  const [yearCaught, setYearCaught] = useState('');
  const [habitat, setHabitat] = useState('');
  const [selectedBeetleId, setSelectedBeetleId] = useState(null);
  const [showAddBeetle, setShowAddBeetle] = useState(false);

  useEffect(() => {
    if(localStorage) {
      const beetlesLocalStorage = JSON.parse(localStorage.getItem('beetles'));

      if(beetlesLocalStorage){
        saveBeetles(beetlesLocalStorage);
      } else {
        saveBeetles(beetles);
      }
    }
  }, []);

  const addBeetle = (newBeetle) => {
    const updatedBeetles = [...allBeetles, newBeetle];
    saveBeetles(updatedBeetles);
    setShowAddBeetle(false);
  }

  const saveBeetles = (beetles) => {
    setAllBeetles(beetles);
    setSearchResults(beetles);
    if(localStorage){
      localStorage.setItem('beetles', JSON.stringify(beetles));
      console.log("saved to local storage");
    }
  }

  const removeBeetle = (beetleToDelete) => {
    const updatedBeetleArray = allBeetles.filter(beetle => beetle.id !== beetleToDelete.id);
    saveBeetles(updatedBeetleArray);
  }

  const updateBeetle = (updatedBeetle) => {
    const updatedBeetleArray = allBeetles.map(beetle => beetle.id === updatedBeetle.id ? {...beetle, ...updatedBeetle,} : beetle);
    saveBeetles(updatedBeetleArray)
  }

  const selectedBeetle = allBeetles.find(
    beetle => beetle.id === selectedBeetleId
  )

  const searchBeetles = () => {
    let keyWordsArray = [];

    if(keyWords){
      keyWordsArray = keyWords.toLowerCase().split(' ');
    }

    if(yearCaught){
      keyWordsArray.push(yearCaught.toString());
    }

    if(habitat){
      keyWordsArray.push(habitat.toLowerCase());
    }

    if(keyWordsArray.length > 0){
      const searchResults = allBeetles.filter(beetle => {
        for(const word of keyWordsArray){
          if(beetle.commonName?.toLowerCase().includes(word) ||
          beetle.scientificName?.toLowerCase().includes(word) ||
          (Array.isArray(beetle.habitat) && beetle.habitat.some(hab => hab.toLowerCase().includes(word))) ||
          beetle.yearCaught === parseInt(word)) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allBeetles);
    }
  }


  const beetles = [{
    id: nanoid(),
    commonName: "Black Snail Beetle",
    scientificName: "Phosphuga Atrata",
    habitat: ["grassland", "heathland", "moorland", "woodland"],
    yearCaught: 2007, 
    image: "images/blackSnailBeetle.jpg"
  }, {
    id: nanoid(),
    commonName: "Soldier Beetle",
    scientificName: "Cantharis Rustica",
    habitat: ["grassland"],
    yearCaught: 2010, 
    image: "images/soldierBeetle.jpg"
  }, {
    id: nanoid(),
    commonName: "Whirligig Beetle",
    scientificName: "Gyrinus Substriatus",
    habitat: ["freshwater", "coastal", "wetlands"],
    yearCaught: 2009, 
    image: "images/whirligigBeetle.jpg"
  }, {
    id: nanoid(),
    commonName: "Harlequin Ladybird",
    scientificName: "Harmonia Axyridis",
    habitat: ["grassland", "freshwater", "farmland", "wetlands", "woodland", "towns and gardens"],
    yearCaught: 2014, 
    image: "images/harlequinLadybird.jpg"
  }, {
    id: nanoid(),
    commonName: "Minotaur Beetle",
    scientificName: "Typhaeus Typhoeus",
    habitat: ["grassland", "heathland", "moorland", "farmland", "coastal"],
    yearCaught: 2007,
    image: "images/minotaurBeetle.jpg"
  }, {
    id: nanoid(),
    commonName: "King Diving Beetle",
    scientificName: "Dytiscus Dimidiatus",
    habitat: ["Lowland fen"],
    yearCaught: 2004,
    image: "images/DivingBeetle.jpg"
  }, {
    id: nanoid(),
    commonName: "14-Spot Ladybird",
    scientificName: "Propylea quattuordecimpunctata",
    habitat: ["grassland", "farmland", "woodland", "towns and gardens"],
    yearCaught: 2013,
    image: "images/14SpotLady.jpg"
  }
  ]
//hi
  return (
    <div className='bigFatBox'>
      <h1>Beetle Catching Catalog</h1>
      <div className='beetle-journal'>
         
        <div className='left-page'>
          <div className='row my-4' id='searchBeetles'>
            <h3>Search:</h3>
            <div className='searchInput'>
              <input type='text' className='form-control search-label' placeholder='Enter a name' onChange={(e) => setKeyWords(e.currentTarget.value)} value={keyWords}></input>
            </div>
            <div className='searchInput'>
              <select value={yearCaught} onChange={(e) => setYearCaught(e.currentTarget.value)} className='form-select search-label'>
                <option value=''>Select Year</option>
                {_(allBeetles).map(beetle => beetle.yearCaught).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
              </select>
            </div>
            <div className='searchInput'>
              <select className='form-select search-label' value={habitat} onChange={(e) => setHabitat(e.currentTarget.value)}>
                <option value=''>Select Habitat</option>
                {_(allBeetles).flatMap(beetle => beetle.habitat).sort().uniq().map(hab => (<option key={hab} value={hab}>{hab}</option>)).value()}
              </select>
            </div>
            <div className='col-md-4 button'>
              <button type='button' className='btn btn-sm' onClick={searchBeetles}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
          </div>

          <div className='row' id='allBeetles'>
            <h3>Beetles Owned</h3>
            {searchResults && searchResults.map((beetle) =>
            (
              <div className='the-beetles' tabIndex="0" key={beetle.id} onClick={() => setSelectedBeetleId(beetle.id)}>
                <span id='theName'>{beetle.commonName}</span>
                <span id='theYear'>({beetle.yearCaught})</span>
              </div>
            ))}
            <div>
              <button className='btn btn-sm btn-success entry-btn' onClick={() => setShowAddBeetle(true)}>New Entry</button>
            </div>
            {showAddBeetle && <AddBeetle addBeetle={addBeetle}/>}
          </div >
        </div>

        <div className='right-page'>
          <div className="row my-4" id='selectedBeetle'>
            <h3>Selected Beetle</h3>
            {selectedBeetle ? (
              <Beetle beetle={selectedBeetle} removeBeetle={removeBeetle} updateBeetle={updateBeetle}/>
            ) : (<p>Select a beetle to view full details</p>)}
          </div>
        </div>
        
        
      </div>  
    </div>
  )
}

export default App
