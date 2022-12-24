import React,{useState,useEffect} from 'react'
import style from "./Home.module.css"
import axios from "axios"
import List from './List';

const Home = () => {

    function dragStart(e) {
        e.dataTransfer.setData("Text", e.target.id);
       
      }
      
      function allowDrop(e) {
        e.preventDefault();
      }
      
      function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("Text");
        console.log(data)
        e.target.appendChild(document.getElementById(data));
      
      }

      const [student, setStudent] = useState({
        stuname: "",
        email: ""
       });
       const [status, setStatus] = useState();
      
       function onTextFieldChange(e) {
        setStudent({
         ...student,
         [e.target.name]: e.target.value
        })
       }
      
       async function onFormSubmit(e) {
        e.preventDefault()
        try {
         await axios.post(`http://localhost:8080/students`, student)
         setStatus(true);
        } catch (error) {
         console.log("Something is Wrong");
        }
       }
       if (status) {
        return <Home />
       }
       
  return (
    <div>

<label>name</label>
    <input type="text"  autoComplete="stuname" name="stuname" id="stuname" label="Name" onChange={e => onTextFieldChange(e)} required/>
    <label>email</label>
    <input type="email" autoComplete="email" name="email"   id="email" label="Email Address" onChange={e => onTextFieldChange(e)} required/>
    <button type="submit" onClick={e => onFormSubmit(e)}>submit</button>
    <div style={{display:"flex"}}>
    <div>{<List/>}</div>
    </div>
        

{/* <div className={style.droptarget} onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)}>
  <p onDragStart={(e)=>dragStart(e)} draggable="true" id="dragtarget">Drag me1!</p>
  <p onDragStart={(e)=>dragStart(e)} draggable="true" id="dragtarget1">Drag me2!</p> 
  <p onDragStart={(e)=>dragStart(e)} draggable="true" id="dragtarget2">Drag me3!</p>  
</div> */}
<div className={style.droptarget} onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)}></div>
    </div>
  )
}

export default Home