import { useAppSelector } from "@/app/hooks";
import Achievment from "@/features/home/components/Achievement";
import Target from "@/features/home/components/Target";


function Home() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">🏠 Home</h1>
      </div>

      {/* Sapaan User */}
      <div className="mb-6">
        <p className="text-md text-gray-700">
          Selamat datang kembali, <span className="font-semibold">{user?.username}!</span> 👋
        </p>
        <p className="text-sm text-gray-500">
          Pilih menu di bawah untuk mulai belajar.
        </p>
      </div>

      {/* lebar untuk target adalah 3/4 dan lebar untuk achievement adalah 1/4 */}
      <div className="mb-6 grid grid-cols-3 gap-8">
        <Target/>
        <Achievment />  
      </div>
      
    </div>
  );
}

export default Home;
