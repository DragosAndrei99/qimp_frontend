function DetectionResults({ detectionResults, title }) {
    return (
        <div className="flex flex-col items-center justify-between gap-4 text-white text-md my-4 1380px:flex-col">
        <label className="text-sm font-bold text-white mb-2 p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A] relative top-2">{title}</label>
        <div className="flex flex-col items-center justify-between gap-4 text-white text-md my-4 1380px:flex-row">
        {(() => {
            const groupedDetections = detectionResults.reduce((acc, detection) => {
                if (!acc[detection.name]) {
                    acc[detection.name] = {
                        count: 0,
                        totalConfidence: 0
                    };
                }
                acc[detection.name].count++;
                acc[detection.name].totalConfidence += detection.confidence;
                return acc;
            }, {});

            return Object.entries(groupedDetections)
                .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
                .map(([name, data]) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                        <div className="flex items-center">
                            <p className="italic font-bold">{name}:</p>
                        </div>
                        <div className="flex items-center">
                            <p className="border-white border-2 px-2 py-1 rounded-md font-semibold">
                                {data.count} ({((data.totalConfidence / data.count) * 100).toFixed(1)}% avg)
                            </p>
                        </div>
                    </div>
                ));
        })()}
        </div>
    </div>
    )
}

export default DetectionResults;