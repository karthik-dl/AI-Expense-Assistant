function SummaryCard({
    title,
    value,
    color
}) {
    return (

        <div className="bg-white rounded-2xl shadow-sm p-6 border">

            <h4 className="text-slate-500 text-sm">

                {title}

            </h4>

            <h2
                className="text-3xl font-bold mt-2"
                style={{ color }}
            >

                {value}

            </h2>

        </div>

    );
}

export default SummaryCard;