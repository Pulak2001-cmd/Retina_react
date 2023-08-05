import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './css/Home.css';
import firebase from 'firebase/compat/app';

export default function Patient({setCount}) {
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
    if(parseInt(model) === 1){
        
    }
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
    } else if(parseInt(ml) === 1) {
        console.log("hiiii")
        let arr = [];
        let dicts = {};
        let files = []
        await db.where('patient_id', '==', currId.toString()).get().then(async (query) => {
            const list = query.docs;
            for(let i = 0; i < list.length; i++) {
                let d = list[i].data();
                if(files.includes(d.filename)){
                    continue;
                }
                files.push(d.filename)
                let temp = {
                    date: d.date,
                    category: d.data.category_class,
                    category_score: d.data.category_score,
                    filename: d.filename,
                    url: d.url
                }
                if(dicts[d.date]){
                    if(!dicts[d.date].includes(temp)){
                        dicts[d.date].push(temp);
                    }
                } else {
                    dicts[d.date] = [temp];
                }
                arr.push(temp);
            }
            console.log('dicts:', dicts);
        })

        setModel1Data(dicts);
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
    let p = []
    for(let i=0;i<dt.length;i++){
        if(dt[i].data.disease){
            p.push(dt[i].data.disease);
        } else {
            p.push(dt[i].disease);
        }
    }
    setDis(p)
  }
  function sortData(a, b){
    var c = new Date(a);
    var d = new Date(b);
    return c-d;
  }
  const [dates, setDates] = useState([]);
  const [body, setBody] = useState(true);
  const [selectDate, setSelectDate] = useState('');
  const [result2, setResult2] = useState(false);
  const [dateData, setDateData] = useState([]);
  const [dis, setDis] = useState({});
  const [model1Data, setModel1Data] = useState({});
  return (
    <div className="body1">
        <Navbar setCount={setCount}/>
        {parseInt(model) === 1 && result2 && 
            <div className="p-3 d-flex flex-column align-items-center justify-conter-center">
                <button className="btn btn-primary" onClick={()=> {
                    setBody(true);
                    setResult2(false);
                    setCurrId('');
                    setModel(0);
                    setSelectDate('');
                }}>Select Another Patient</button>
                <h1 class="p-4 mt-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', fontSize: '70px', borderRadius: '15px', color: 'white'}}>Result</h1>
                <h3 class="p-2 mt-1" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', fontSize: '40px', borderRadius: '15px', color: 'white'}}>Patient ID : {currId}</h3>
                {Object.keys(model1Data).sort(sortData).map((item, index) =>(
                    <div key={index}>
                    <div class="dateBackground">
                    <h1 class="text-light">Date : {item} </h1>
                </div>
                <div class="imgBack">
                    
                    {model1Data[item].map((i, index)=> (
                        <div class='element' key={index}>
                            <p>Filename : {i.filename}</p>
                            <img src={i.url} class="bg-light p-1 m-2" height="270" width="395" alt="image" />
                            <h4 class="text-light">Retinal Image Analysis</h4>
                            <p> DR Grade: {i.category} ({i.category_score}) </p> 
                            <div class="d-flex flex-row">
                                <p class="m-0 marker1">0</p>
                                <p class="m-0 marker1">1</p>
                                <p class="m-0 marker1">2</p>
                                <p class="m-0 marker1">3</p>
                                <p class="m-0 marker1">4</p>
                                <p class="m-0">5</p>
                            </div>
                            <div class="progress2">
                                <div class="bar7" style={{width: `${200-40*i.category_score}px`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
                ))}
            </div>
        }
        { parseInt(model) === 2 && result2 &&
            <div className="p-3 d-flex flex-column align-items-center justify-conter-center">
                <h1 class="p-4 mt-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', fontSize: '70px', borderRadius: '15px', color: 'white'}}>Result</h1>
            <div className="p-2 m-2 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor: 'rgb(0,0,0,0.8)', borderRadius: 10}}>
                <p className='text-light fw-bold'>Patient Id : {currId}</p>
                <p className='text-light fw-bold'>Date : {selectDate}</p>
            </div>
            <div className="contain">
                {dateData.map((i, index)=> (
                    <div key={index} className="item">
                        <p>Filename : {i.filename}</p>
                        <img src={i.url} style={{height: 200, width: 300}} />
                        <h3>Retinal Disease Classification</h3>
                        {/* {i.data.diseases} */}
                        {i.data.disease !== undefined && i.data.disease.length === 0 ? 
                        <h6 class="text-light">✅ No disease found</h6>:
                        i.data.disease !== undefined && <table class="table table-striped m-3">
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
                        {i.disease && i.disease.length === 0 ? 
                        <h6 class="text-light">✅ No disease found</h6>:
                        i.disease !== undefined && <table class="table table-striped m-3">
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
                            {Object.keys(i.disease).map((j, index1)=> (
                                <tr key={index1}>
                                    <td className="fs-5">{j}</td>
                                    <td className="fs-5">{i.disease[j]}</td>
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
                }}>Select Another Patient</button>
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
                            <option value={0}>Select AI Model</option>
                            <option value={1}>Diabetic Retinopathy Severity Analysis</option>
                            <option value={2}>Retinal Disease Classification</option>
                        </select>
                    {parseInt(model) === 2 && <select class="form-select" value={selectDate} onChange={(e)=> setChange(e)} aria-label="Default select example" id='formFile' required>
                            <option value={''}>Select Visit Date</option>
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
