import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


const List = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        async function getAllStudent() {
         try {
          const students = await axios.get("http://localhost:8080/students")
          // console.log(students.data);
          setStudents(students.data);
         } catch (error) {
          console.log("Something is Wrong");
         }
        }
        getAllStudent();
       }, [])
      
       const handleDelete = async id => {
        await axios.delete(`http://localhost:8080/students/${id}`);
        var newstudent = students.filter((item) => {
         // console.log(item);
         return item.id !== id;
        })
        setStudents(newstudent);
       }

       function dragStart(e) {
        e.dataTransfer.setData("Text",e.target.id);
       
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

  return (
    <div  onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)}>
      {
       students.map((student, i) => {
        return (
         <div onDragStart={(e)=>dragStart(e)} draggable="true"
         key={i} style={{display:"flex", gap:"20px",border:"1px solid red"}} id={student.email}>
            <div>{student.stuname}</div>
            <div>{student.email}</div>
            {/* <button> <Link to={`/view/${student.id}`}>view</Link> </button>
            <button> <Link to={`/edit/${student.id}`}>edit</Link></button> */}
            <button onClick={() => handleDelete(student.id)}>delete</button>
            <br />
            <br />
         </div> 
        )
       })
      }
    </div>
  )
}

export default List

//try to impliment removeChild, replaceChild