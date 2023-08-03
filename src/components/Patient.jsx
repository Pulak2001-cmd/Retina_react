import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './css/Home.css';

export default function Patient() {
  const [data, setData] = useState({});
  const [ids, setIds] = useState([]);
  const [currId, setCurrId] = useState('');
  const [model, setModel] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(()=> {
    async function getData(){
        const response = await fetch('../../data.json');
        const data = await response.json();
        setData(data);
        setIds(Object.keys(data));
    }
    getData();
  }, [])
  const submit = ()=> {

  }
  const selectModel = (e)=> {
    const ml = e.target.value;
    setModel(e.target.value);
    if(ml === 2 && currId !== ''){
        let patient_data = data.currId
        let imgs = [];
        for(let i=0;i<patient_data.length;i++){
            let temp = {};
            // temp[patient_data[i].url] = patient_data[i]
        }
    }
  }
  return (
    <div className="body1">
        <Navbar />
        <div class="d-flex flex-row">
        <div class="col-8 p-2 align-content-center align-items-center justify-content-center m-auto mt-5">
            <div class="d-flex align-items-center justify-content-center flex-column">
                <h1>IMACAM-AI</h1>
                <h1 class="text-primary">Retinal Image Analysis</h1>
                <p class="fs-5">Your onestop solution for analyzing retinal images</p>
            </div>
        </div>
        <div class="col-4 p-2 align-items-center justify-content-center m-auto mt-5">
            <form enctype="multipart/form-data" class="container d-flex flex-column align-items-center justify-content-center mt-5">  
                <div class="mb-0 m-0">
                    <label for="formFile" class="form-label drop-container" id="dropcontainer">
                        <select class="form-select" value={currId} onChange={(e)=> setCurrId(e.target.value)} aria-label="Default select example" id='formFile' required>
                            <option value={''}>Select Patient Id</option>
                            {ids.map((i, index) =>(
                                <option key={index} value={i}>{i}</option>
                            ))}
                        </select>
                        <select class="form-select" value={model} onChange={(e) => selectModel(e)} aria-label="Default select example" required>
                            <option value={0}>Select Your model</option>
                            <option value={1}>Diabetic Retinopathy Severity Analysis</option>
                            <option value={2}>Retinal Disease Classification</option>
                        </select>
                    </label>
                </div> 
                <input type = "submit" onClick={submit} value="Analyze Now!" class="btn btn-primary" />  
            </form> 
        </div>
    </div>
    </div>
  )
}
