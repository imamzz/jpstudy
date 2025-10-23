import { useAppSelector } from "@/app/hooks";
import Achievment from "@/features/home/components/Achievement";
import Activity from "@/features/home/components/Activity";
import Progress from "@/features/home/components/Progress";
import ProgressCircle from "@/features/home/components/ProgressCircle";
import Target from "@/features/home/components/Target";


function Home() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="mx-auto w-full">

      {/* Sapaan User */}
      <div className="mb-12">
        <p className="text-md text-gray-700">
          Selamat datang kembali, <span className="font-semibold">{user?.username}!</span> 👋
        </p>
      </div>

      {/* lebar untuk target adalah 3/4 dan lebar untuk achievement adalah 1/4 */}
      <div className="mb-6 grid grid-cols-3 gap-8">
        <Target/>
        <Achievment />  
      </div>
      
      <h2 className="col-span-3 text-2xl font-bold text-blue-700 mb-4">Progress</h2>

      {/* lebar untuk progress adalah 2/3 dan lebar untuk activity adalah 1/3 */}
      <div className="mb-6 grid grid-cols-3 gap-8">
        <div className="col-span-2">
            <ProgressCircle/>
        </div>
        <div className="col-span-1 gap-4 grid">
            <Progress/>
            <Activity />  
        </div>
      </div>
      
    </div>
  );
}

export default Home;
