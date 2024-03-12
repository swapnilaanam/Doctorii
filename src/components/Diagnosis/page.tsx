import Link from "next/link";

type DiagnosisType = {
    _id: string,
    diagnosisName: string,
    diagnosedArea: string,
    diagnosisDetails: string,
    price: number
};

const Diagnosis = ({diagnosis}: {diagnosis: DiagnosisType}) => {
    return (
        <div
            key={diagnosis._id}
            className="bg-gray-100 block rounded-xl border border-gray-100 p-8 shadow-sm hover:border-sky-500 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring text-center"
        >
            <h2 className="mt-2 font-semibold text-xl text-green-600">{diagnosis?.diagnosisName}</h2>
            <p className="hidden sm:mt-1 sm:block sm:text-lg sm:text-black">
                {diagnosis?.diagnosedArea}
            </p>
            <div className="mt-4 flex justify-between items-center gap-2">
                <Link
                    className="inline-block rounded bg-yellow-400 px-6 py-2 text-sm font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                    href={`/diagnosis/details/${diagnosis._id}`}
                >
                    Details
                </Link>
                <Link
                    className="inline-block rounded bg-sky-600 px-8 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                    href={`/diagnosis/bookticket/${diagnosis._id}`}
                >
                    Book Ticket
                </Link>
            </div>
        </div>
    )
}

export default Diagnosis;