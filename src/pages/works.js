import { WorksComponent } from "../components/components";
import { imageList } from "../work-list";
import axios from "axios";

export default function Works() {

  // Return the list of all the works created
  // sostituisci localhost con il tuo indirizzo del server o host
  axios.get('localhost:8080/api/works')
  .then((res)=> {
    console.log(res)
  }).catch((err)=> {
    console.log(err)
  });
  
  return (
    <main className="pl-0.5 pt-14">
      <div className='container mx-auto'>
        <WorksComponent works={imageList} title="WORKS"></WorksComponent>
      </div>
    </main>
  );
}
