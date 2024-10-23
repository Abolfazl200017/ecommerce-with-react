import Skeleton from "react-loading-skeleton";

function CardSkeleton() {

    return <div className="w-100 rounded border p-2 bg-white">
        <div className="ratio ratio-1x1">
            <Skeleton className="w-100 h-100" />
        </div>
        <div className="mt-3">
            <Skeleton count={3} />

        </div>
    </div>
}

export default CardSkeleton;