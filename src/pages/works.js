import { WorksComponent } from "../components/components"; 
import axios from "axios"; 
import { useEffect, useState } from "react";
 
export default function Works() { 
  const [imageList, setImageList] = useState([]) 
  // Return the list of all the works created 
  // sostituisci localhost con il tuo indirizzo del server o host 
  useEffect(() => { 
    axios.get('http://localhost:8000/works') 
      .then((res) => { 
        console.log(res) 
        setImageList(res.data) 
      }).catch((err) => { 
        console.log(err) 
      }); 
  }, []) 

  return ( 
    <main className="pl-0.5 pt-14"> 
      <div className='container mx-auto'> 
        <WorksComponent works={imageList} title="WORKS"></WorksComponent> 
      </div> 
    </main> 
  ); 
}