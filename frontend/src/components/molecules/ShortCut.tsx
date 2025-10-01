import Badge from "../atoms/Badge";
import ArrowRight from "@/assets/icon/arrow-right.png";
const ShortCut = () => {
    return (
        <div className="w-full max-w-6xl gap-2 border border-gray-200 rounded-xl px-4 py-2 flex items-center bg-white">
            <Badge variant="N5" size="lg">N5</Badge>
            <div className="flex items-start flex-col w-full h-full justify-between">
                <p className="text-sm font-semibold text-gray-600">Learning</p>
                <div className="flex items-center justify-between w-full ">
                    <p className="text-center text-md">Grammar</p>
                    <div className="flex w-6 h-6 items-center justify-center"><img src={ArrowRight} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default ShortCut 