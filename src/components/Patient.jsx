import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './css/Home.css';
import firebase from 'firebase/compat/app';

export default function Patient() {
  const db = firebase.firestore().collection('data');
  const [ids, setIds] = useState([]);
  const [currId, setCurrId] = useState('');
  const [model, setModel] = useState(0);
  useEffect(()=> {
    // async function getData(){
    //     const response = await fetch('../../data.json');
    //     const data = await response.json();
    //     setData(data);
    //     setIds(Object.keys(data));
    // }
    // getData();
    setIds([109, 321, 1501, 2687, 7024, 10728, 11282, 14641, 15485, 17991])
  }, [])
  const submit = ()=> {
    setBody(false);
    setResult2(true);
  }
  const selectModel = async(e)=> {
    const ml = e.target.value;
    setModel(e.target.value);
    console.log(ml)
    let arr = []
    let dicts = {};
    if(parseInt(ml) === 2 && currId !== ''){
        await db.where('patient_id', '==', currId.toString()).get().then(async(query)=>  {
            console.log(query.docs.length, 'length');
            const list = query.docs;
            for (let i=0; i<list.length; i++) {
                let d = list[i].data();
                if(!arr.includes(d.date)){
                    arr.push(d.date);
                }
            }
        })
        console.log(dicts)
        setDates(arr);
    }
  }
  const setChange = async (e) => {
    const ml = e.target.value;
    setSelectDate(e.target.value);
    let dt = [];
    await db.where('patient_id', '==', currId.toString()).where('date', '==', ml).get().then(async(query)=>  {
        console.log(query.docs.length);
        const list = query.docs;
        for(let i=0; i<list.length; i++){
            dt.push(list[i].data());
        }
    })
    console.log(dt);
    setDateData(dt);
  }
  const [dates, setDates] = useState([]);
  const [body, setBody] = useState(true);
  const [selectDate, setSelectDate] = useState('');
  const [result2, setResult2] = useState(false);
  const [dateData, setDateData] = useState([]);
  return (
    <div className="body1">
        <Navbar />
        {result2 &&
            <div className="p-3 d-flex flex-column align-items-center justify-conter-center">
                <h1 class="p-4 mt-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', fontSize: '70px', borderRadius: '15px', color: 'white'}}>Result</h1>
            <div className="p-2 m-2 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor: 'rgb(0,0,0,0.8)', borderRadius: 10}}>
                <p className='text-light fw-bold'>Patient Id : {currId}</p>
                <p className='text-light fw-bold'>Date : {selectDate}</p>
            </div>
            <div className="contain">
                {dateData.map((i, index)=> (
                    <div key={index} className="item">
                        <img src={i.url} style={{height: 200, width: 200}} />
                        <h3>Retinal Disease Classification</h3>
                        {/* {i.data.diseases} */}
                        {i.data.disease.length === 0 ? 
                        <h6 class="text-light">✅ No disease found</h6>:
                        <table class="table table-striped m-3">
                            <tr>
                            <th class="fs-4">Disease name</th>
                            <th class="fs-4">Disease Probability</th>
                            </tr>
                            {/* {i.data.disease.map((i, index) =>(
                            <tr key={index}>
                            <td class="fs-5">{i.disease_name}</td>
                            <td class="fs-5">{i.score}</td>
                            </tr>
                            ))} */}
                            {Object.keys(i.data.disease).map((j, index1)=> (
                                <tr key={index1}>
                                    <td className="fs-5">{j}</td>
                                    <td className="fs-5">{i.data.disease[j]}</td>
                                </tr>
                            ))}
                        </table>}
                    </div>
                ))}
            </div>
                <button className="btn btn-primary" onClick={()=> {
                        setBody(true);
                        setResult2(false);
                        setCurrId('');
                        setModel(0);
                        setSelectDate('');
                }}>Upload Again</button>
            </div>
        }
        {body && <div class="d-flex flex-row">
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
                        <select class="form-select" value={currId} onChange={(e)=> {
                            setCurrId(e.target.value);
                            setModel(0);
                        }} aria-label="Default select example" id='formFile' required>
                            <option value={''}>Select Patient Id</option>
                            {ids.map((i, index) =>(
                                <option key={index} value={i}>{i}</option>
                            ))}
                        </select>
                        <select class="form-select" value={model} onChange={(e) =>selectModel(e)} aria-label="Default select example" required>
                            <option value={0}>Select Your model</option>
                            <option value={1}>Diabetic Retinopathy Severity Analysis</option>
                            <option value={2}>Retinal Disease Classification</option>
                        </select>
                    {parseInt(model) === 2 && <select class="form-select" value={selectDate} onChange={(e)=> setChange(e)} aria-label="Default select example" id='formFile' required>
                            <option value={''}>Select Date</option>
                            {dates.map((i, index) =>(
                                <option key={index} value={i}>{i}</option>
                            ))}
                        </select>}
                    </label>
                </div> 
                <input type = "submit" onClick={submit} value="Analyze Now!" class="btn btn-primary" />  
            </form> 
        </div>
    </div>}
    </div>
  )
}
