import wave from "../../../assets/wave.png";
import profile from "../../../assets/Target.png";

function ProfilePage() {
  return (
    <div className="w-full">
      {/* name, kapan join, picture, bg pic */}
      <div className="w-full mb-6">
        {/* <div className="background rounded-lg overflow-hidden">
                    <img className="rotate-180" src={wave} alt="" />
                </div> */}
        <div className="flex items-center gap-4">
          <div className="profile rounded-xl overflow-hidden w-24 h-24 bg-blue-700">
            <img src={profile} alt="" />
          </div>
          <div className="description flex flex-col">
            <h3>Imam Zain</h3>
            <p>Join Okt 2025</p>
          </div>
        </div>
      </div>

      <hr className="mb-6 border border-gray-200" />

      {/* statistik ringkas */}
      <div className="w-full mb-6">
        <h2 className="text-md font-bold mb-2">Statistics</h2>
        <div className="w-full grid grid-cols-2 items-center gap-4 mb-6">
          <div className="statistic-item flex items-center gap-4 px-4 py-4 rounded-xl overflow-hidden border border-gray-200">
            <div className="icon w-12 h-12 rounded-xl overflow-hidden bg-blue-700">
              {/* <img src={wave} alt="" /> */}
            </div>
            <div className="description">
              <h3>10</h3>
              <p>Strike</p>
            </div>
          </div>
          <div className="statistic-item flex items-center gap-4 px-4 py-4 rounded-xl overflow-hidden border border-gray-200">
            <div className="icon w-12 h-12 rounded-xl overflow-hidden bg-blue-700">
              {/* <img src={wave} alt="" /> */}
            </div>
            <div className="description">
              <h3>1</h3>
              <p>Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* achievement */}
      <div className="w-full mb-6">
        <h2 className="text-md font-bold mb-2">Achievement</h2>
        <div className="w-full gap-4">
          <div className="statistic-item flex items-center gap-4 px-4 py-4 rounded-xl overflow-hidden border border-gray-200 mb-2">
            <div className="icon w-12 h-12 rounded-xl overflow-hidden bg-blue-700">
              {/* <img src={wave} alt="" /> */}
            </div>
            <div className="description">
              <h3>10</h3>
              <p>Strike</p>
            </div>
          </div>
          <div className="statistic-item flex items-center gap-4 px-4 py-4 rounded-xl overflow-hidden border border-gray-200 mb-2">
            <div className="icon w-12 h-12 rounded-xl overflow-hidden bg-blue-700">
              {/* <img src={wave} alt="" /> */}
            </div>
            <div className="description">
              <h3>1</h3>
              <p>Level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
