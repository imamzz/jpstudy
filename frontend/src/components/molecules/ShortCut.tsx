import Badge, { type BadgeSize, type BadgeVariant } from "../atoms/Badge";
import ArrowRight from "@/assets/icon/arrow-right.png";

interface ShortCutProps {
    variant: BadgeVariant;
    size: BadgeSize;
    title: string;
    description: string;
}

const ShortCut: React.FC<ShortCutProps> = ({ variant, size, title, description }) => {
    return (
        <div className="w-full max-w-6xl gap-2 border border-gray-200 rounded-xl px-4 py-2 flex items-center bg-white">
            <Badge variant={variant} size={size}>{title}</Badge>
            <div className="flex items-start flex-col w-full h-full justify-between">
                <p className="text-sm font-semibold text-gray-600">Learning</p>
                <div className="flex items-center justify-between w-full ">
                    <p className="text-center text-md">{description}</p>
                    <div className="flex w-6 h-6 items-center justify-center"><img src={ArrowRight} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default ShortCut 