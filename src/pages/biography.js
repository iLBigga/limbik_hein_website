import axios from "axios";

import { WorksComponent } from '../components/components'
import { BioSectionComponent } from '../components/components'

import { imageList } from '../work-list'

export default function Biography() {

  // Return the list of the last 4 works created
  // sostituisci localhost con il tuo indirizzo del server o host
  axios.get('localhost:8080/api/works/4')
  .then((res)=> {
    console.log(res)
  }).catch((err)=> {
    console.log(err)
  });

  return (
    <main className='container mx-auto'>
      <BioSectionComponent
        title="BIOGRAPHY"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur"
      /> 
      <WorksComponent title="LATEST WORKS" works={imageList}></WorksComponent>
    </main>
  );
}
