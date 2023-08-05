import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./css/Home.css";
import axios from 'axios';
import firebase from "firebase/compat/app";

export default function Single({setCount}) {
  const db = firebase.firestore().collection('data');
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false); //
  const [image, setImage] = useState(null); //
  const [data, setData] = useState({});
  const [dts, setDts] = useState([]);
  const [diseases, setDiseases] = useState([]);
//   useEffect(()=> {
//     async function getData (){
//         await db.where('patient_id', '!=', null).get().then(async(query)=> {
//             console.log(query.docs.length);
//         })
//     }
//     getData();
//   }, [])
  const selectType = async(e)=> {
    setType(e.target.value);
    const ml = e.target.value;
    let dicts = []
    if (parseInt(ml) === 2){
        await db.where('patient_id', '!=', null).get().then(async(query)=> {
            console.log(query.docs.length);
            const list = query.docs;
            let arr = [];
            for(let i=0; i<list.length; i++) {
                if(!dicts.includes(list[i].data().patient_id)) {
                    dicts.push(list[i].data().patient_id);
                }
                arr.push(list[i].data().filename)
            }
            setDts(arr);
        })
    } else {
        await db.where('public', '==', 5).get().then(async (query) => {
            console.log(query.docs.length);
            const list = query.docs;
            let arr = [];
            for(let i=0; i<list.length; i++) {
                if(!dicts.includes(list[i].data().patient_id)) {
                    dicts.push(list[i].data().patient_id);
                }
                arr.push(list[i].data().filename)
            }
            arr.sort(function(a, b) {
              var c = a.replace('.png', '');
              var d = b.replace('.png', '');
              return parseInt(c)-parseInt(d);
            })
            setDts(arr);
        })
    }
    console.log(dicts);
  }
  const submit = async () => {
    setLoading(true);
    let data = null;
    await db.where('filename', '==', filename).where('filename', '!=', null).get().then(async (query)=> {
        // let data = query.docs;
        data = query.docs[0].data();
    })
    console.log('firebase', data);
    setData(data.data);
    setFile(data.filename);
    setImage(data.url)
    let disease = data.disease || data.data.disease;
    console.log(disease, 'disease');
    let arr = [];
    for(const dis in disease) {
        let temp = {
            disease_name: dis,
            score: disease[dis]
        }
        arr.push(temp);
    }
    setDiseases(arr);
    setResult(true);
    setLoading(false);
    
  };
  const [zoomed, setZoomed] = useState(false);
  return (
    <div className="body1">
      <Navbar setCount={setCount}/>
      {result ? (
        <div class="d-flex align-items-center justify-content-center m-4 flex-row">
          <div class="col-6 d-flex flex-column align-items-center justify-content-center">
            <h5 class="text-light">Uploaded Image  </h5>
            <p>Filename : {file} </p>
            <img
              src={image}
              className={`bg-light p-1 mt-5 ${zoomed ? 'zoom-in':'zoom-out'}`}
              class="bg-light p-1 mt-5"
              height="400"
              onClick={()=> setZoomed(!zoomed)}
              width="575"
              alt="image"
            />
          </div>
          <div class="col-6 d-flex flex-column align-items-center justify-content-center">
            <h1 class="p-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', fontSize: '70px', borderRadius: '15px', color: 'white'}}>Result</h1>
            {parseInt(model) === 1 && <div class="model1">
              <h4 class="text-light">Diabetic Retinopathy Severity Analysis</h4>
              <p class="m-0 fw-bold fs-4">
                DR Grade : { data.category_class } ({ data.category_score })
              </p>
              <div class="d-flex flex-row">
                <p class="m-0 marker">0</p>
                <p class="m-0 marker">1</p>
                <p class="m-0 marker">2</p>
                <p class="m-0 marker">3</p>
                <p class="m-0 marker">4</p>
                <p class="m-0">5</p>
              </div>
              <div class="progress1">
                <div class="bar7" style={{width: `${750-150*parseFloat(data.category_score)}px`}}></div>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <p class="m-2 fs-3">0 : None</p>
                <p class="m-2 fs-3">1 : Mild</p>
                <p class="m-2 fs-3">2 : Moderate</p>
                <p class="m-2 fs-3">3 : Severe</p>
                <p class="m-2 fs-3">4 : Proliferative</p>
              </div>
              <div>
                <div onClick={()=> setResult(false)} class="m-4">
                  <button type="submit" class="btn btn-primary">
                    Upload Again
                  </button>
                </div>
                </div>
                </div>
                }
                {parseInt(model) === 2 && <div class="model2">
                  <h4 class="text-light">Retinal Disease Classification</h4>
                  {diseases.length === 0 ? 
                  <h6 class="text-light">✅ No disease found</h6>:
                  <table class="table table-striped m-3">
                    <tr>
                      <th class="fs-4">Disease name</th>
                      <th class="fs-4">Disease Probability</th>
                    </tr>
                    {diseases.map((i, index) =>(
                    <tr key={index}>
                      <td class="fs-5">{i.disease_name}</td>
                      <td class="fs-5">{i.score}</td>
                    </tr>
                    ))}
                  </table>}
                  <div onClick={()=> setResult(false)} class="m-4">
                  <button type="submit" class="btn btn-primary">
                    Upload Again
                  </button>
                </div>
                </div>}
              </div>
            </div>
      ) : (
        <div class="d-flex flex-row">
        {loading ? 
        <div className="d-flex justify-content-center align-items-center w-100" style={{height: '80vh'}}>
        <div class="spinner-border text-light" role="status" style={{height: '10rem', width: '10rem'}}>
        <span class="visually-hidden">Loading...</span>
      </div>
      </div>
      :<>
          <div class="col-8 p-2 align-content-center align-items-center justify-content-center m-auto mt-5">
            <div class="d-flex align-items-center justify-content-center flex-column">
              <h1>IMACAM-AI</h1>
              <h1 class="text-primary">Retinal Image Analysis</h1>
              <p class="fs-5">
                Your onestop solution for analyzing retinal images
              </p>
            </div>
          </div>
          <div class="col-4 p-2 align-items-center justify-content-center m-auto mt-5">
            <div
              class="container d-flex flex-column align-items-center justify-content-center mt-5"
            >
              <div class="mb-0 m-0">
                <label
                  for="formFile"
                  class="form-label drop-container"
                  id="dropcontainer"
                > 
                  <select
                    class="form-select"
                    value={type}
                    onChange={(e) => selectType(e)}
                    aria-label="Default select example"
                    name="model"
                    required
                  >
                    <option value={""}>Select Your preferred data</option>
                    <option value={1}>
                      Public Data
                    </option>
                    <option value={2}>Patient Data</option>
                  </select>

                  <select
                    class="form-select"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    aria-label="Default select example"
                    name="model"
                    required
                  >
                    <option value={""}>Select a file</option>
                    {dts.map((i, index)=> (
                        <option value={i} key={index}>{i}</option>
                    ))}
                  </select>
                  <select
                    class="form-select"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    aria-label="Default select example"
                    name="model"
                    required
                  >
                    <option value={""}>Select Your model</option>
                    <option value={1}>
                      Diabetic Retinopathy Severity Analysis
                    </option>
                    <option value={2}>Retinal Disease Classification</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                disabled={filename === "" || model === "" || type === ""}
                onClick={submit}
                class="btn btn-primary"
              >
                Analyze Now!
              </button>
            </div>
          </div></>}
        </div>
      )}
    </div>
  );
}
