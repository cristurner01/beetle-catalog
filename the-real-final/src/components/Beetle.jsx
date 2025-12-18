import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faMagicWandSparkles, faWarning } from '@fortawesome/free-solid-svg-icons';
import './Beetle.css'


function Beetle(props) {
  const [editMode, setEditMode] = useState(false);
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [habitat, setHabitat] = useState('');
  const [yearCaught, setYearCaught] = useState('');

  useEffect(() => {
    setCommonName(props.beetle.commonName);
    setScientificName(props.beetle.scientificName);
    setHabitat(Array.isArray(props.beetle.habitat) ? props.beetle.habitat.join(', ') : props.beetle.habitat);
    setYearCaught(props.beetle.yearCaught);
  }, [props.beetle]);

  const saveBeetle = () => {
    setEditMode(false);
    const updatedBeetle = {commonName:commonName, scientificName:scientificName, habitat:habitat.split(',').map(hab => hab.trim()).filter(Boolean), yearCaught:parseInt(yearCaught), id:props.beetle.id, image:props.beetle.image};
    props.updateBeetle(updatedBeetle);
  }

  return (
    <div className='card-border'>
      <div className='the-card'>
        <div className='cardImage'>
          <img src={props.beetle.image} alt='missing image'/>
        </div>
        {!editMode &&
        <ul className='list-group'>
          <li className='list-group-item text-center cName'>{props.beetle.commonName}</li>
          <li className='list-group-item text-center sName'>{props.beetle.scientificName}</li>
          <li className='list-group-item text-center habitat'>Habitat:<br></br>{Array.isArray(props.beetle.habitat) ? props.beetle.habitat.join(", ") : props.beetle.habitat}</li>
          <li className='list-group-item text-center yCaught'>Year Caught: {props.beetle.yearCaught}</li>
          <div className='the-btns'>
            <button type='button' className='btn btn-sm btn-danger btn1' onClick={() => props.removeBeetle(props.beetle)}>Delete &nbsp;<FontAwesomeIcon icon= {faWarning}></FontAwesomeIcon></button>
            <button type='button' className='btn btn-sm btn-warning btn2' onClick={() => setEditMode(true)}>Edit &nbsp;<FontAwesomeIcon icon={faMagicWandSparkles}></FontAwesomeIcon></button>
          </div>
        </ul>}
        {editMode && <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={commonName} onChange={(e) => setCommonName(e.currentTarget.value)} /></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={scientificName} onChange={(e) => setScientificName(e.currentTarget.value)} /></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={habitat} onChange={(e) => setHabitat(e.currentTarget.value)} /></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={yearCaught} onChange={(e) => setYearCaught(parseInt(e.currentTarget.value))} /></li>
          <li className='list-group-item text-center'><button type='button' className='btn btn-secondary' onClick={saveBeetle}>Save<FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon></button></li>
          </ul>}
      </div>
    </div>
  )
}

export default Beetle
