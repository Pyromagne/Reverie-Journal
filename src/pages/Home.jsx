import '../index.css';
import EllipseButton from '../components/EllipseButton';
import { LuPlus } from "react-icons/lu";


function Home() {
  return (
    <div className='flex justify-center flex-row'>
      <p className='text-slate-300 font-semibold text-4xl padding p-8'>Reverie Journal</p>

      <span className='absolute z-10 bottom-10 right-10'>
        <EllipseButton name='Add' bgColor={'bg-slate-300'} isIcon={true} icon={<LuPlus size={24} />} />
      </span>
    </div>
  );
}

export default Home;
