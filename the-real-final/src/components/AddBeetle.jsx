import React, {useState} from 'react'
import {nanoid} from 'nanoid'
import './AddBeetle.css'

function AddBeetle(props) {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [habitat, setHabitat] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [yearCaught, setYearCaught] = useState('');

  const doWork = () => {
    const newBeetle = {
      "id": nanoid(),
      "commonName":commonName,
      "scientificName":scientificName,
      "habitat":[habitat],
      "image":URL.createObjectURL(selectedFile),
      "yearCaught":parseInt(yearCaught)
    }
    props.addBeetle(newBeetle);
  }

  const imageUpdate = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <>
      <div id='addBeetle'>
        <h3>Add Beetle</h3>
        
        <div className='add-row1 row'>
          <div className='row-item'>
            <label htmlFor='txtCommonName' className='form-label add-labels'>Common Name: </label>
            <input type='text' id='txtCommonName' placeholder='Common Name' className='form-control add-inputs' onChange={(e) => setCommonName(e.currentTarget.value)} value={commonName}></input>
          </div>
          <div className='row-item'>
            <label htmlFor='txtScientificName' className='form-label add-labels'>Scientific Name: </label>
            <input type='text' id='txtScientificName' placeholder='Scientific Name' className='form-control add-inputs' onChange={(e) => setScientificName(e.currentTarget.value)} value={scientificName}></input>
          </div>
          <div className='row-item'>
            <label htmlFor='txtHabitat' className='form-label add-labels'>Habitat: </label>
            <input type='text' id='txtHabitat' placeholder='Habitat/s' className='form-control add-inputs' onChange={(e) => setHabitat(e.currentTarget.value)} value={habitat}></input>
          </div>
          <div className='row-item'>
            <label htmlFor='txtYearCaught' className='form-label add-labels'>Year Caught: </label>
            <input type='text' id='txtYearCaught' placeholder='Year Caught' className='form-control add-inputs' onChange={(e) => setYearCaught(e.currentTarget.value)} value={yearCaught}></input>
          </div>
        </div>

        <div className='add-row2 row'>
          <div className='col-md-6'>
            <label htmlFor='fileUpload' className='form-label add-labels'>Image: &nbsp;</label>
            <input type='file' id='fileUpload' name='file' onChange={imageUpdate}/>
          </div>
        </div>

        <div>
          <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Beetle</button>
        </div>
      </div>
    </>
  )
}

export default AddBeetle
