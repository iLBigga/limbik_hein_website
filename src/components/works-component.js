import WorkComponent from './work-component';
import moment from 'moment';
import { useState } from 'react';

export default function WorksComponent(props) {
  const [selectedWork, setSelectedWork] = useState(null);
  return (
    <section className="pt-10">
      <div className="App-home-section container mx-auto">
        <div className="flex justify-center md:grid grid-cols-3 gap-5 md:grid-cols-12">
          <div className="col-span-1 md:col-span-2"></div>
          <div className="col-span-1 md:col-span-6">
            <h1 className="text-xl pb-5">{props.title}</h1>
          </div>
        </div>
        <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {props.works.map((workList, index) => (
            <div key={index}>
              <div onClick={() => setSelectedWork(workList)} className="cursor-pointer">
              <WorkComponent 
                imageSrc={workList.image} 
                title={workList.title} 
                date={moment(workList.date * 1000).format('L')} 
                description={workList.description}
              />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedWork && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedWork(null)}>
          <div className="bg-white p-4 max-w-3xl w-full relative">
            <button onClick={() => setSelectedWork(null)} className="absolute top-2 right-2 text-black text-xl">&times;</button>
            <img src={selectedWork.image} alt={selectedWork.title} className="w-full h-auto mb-4" />
            <h2 className="text-xl font-semibold">{selectedWork.title}</h2>
            <p className="text-sm">{moment(selectedWork.date * 1000).format('L')}</p>
            <p className="mt-2">{selectedWork.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
