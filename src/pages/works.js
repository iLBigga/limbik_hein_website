import { WorksComponent } from "../components/components";
import { imageList } from "../work-list";

export default function Works() {
    return (
      <main className="pl-0.5 pt-14">
        <div className='container mx-auto'>
          <WorksComponent works={imageList} title="WORKS"></WorksComponent>
        </div>
      </main>
    );
  }
  