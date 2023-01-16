import WorkComponent from './work-component';
import moment from 'moment';

export default function WorksComponent(props) {
  
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div className="flex justify-center md:grid grid-cols-3 gap-5 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-1 md:col-span-6">
            <h1 className="text-xl pb-5">{props.title}</h1>
          </div>
        </div>
        <div className="flex px-2 md:grid grid-cols-3 md:gap-5 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-2 md:col-span-6">
            {props.works.map((workList, index) => (
              <WorkComponent 
                key={index}
                imageSrc={workList.image} 
                title={workList.title} 
                date={moment(workList.date*1000).format('L')} 
                description={workList.description}>
              </WorkComponent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
