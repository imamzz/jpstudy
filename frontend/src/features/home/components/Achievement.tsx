import img from "../../../assets/Trophy.png";

const  Achievement = () => {

  return (
    <div className="flex items-center flex-shrink-0 gap-4 bg-blue-50 rounded-xl p-4 col-span-1 h-[150px] shadow-sm">
      <img
        src={img}
        alt="Target"
        className="
            w-[168.023px]
            h-[168.023px]
            flex-shrink-0
            rotate-[-7.36deg]
            object-contain
            aspect-[168.02/168.02]
            -translate-y-3
        "
      />

      <div className="flex flex-col w-full h-[102px] flex-col justify-between items-start">
        <p className="text-xs font-semibold text-gray-500">Achievement</p>
        <h2 className="text-2xl font-semibold text-gray-700">Hafal 10 kata baru</h2>
      </div>
    </div>
  );
};

export default Achievement;
