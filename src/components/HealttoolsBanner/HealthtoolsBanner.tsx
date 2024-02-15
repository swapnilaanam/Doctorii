const HealthtoolsBanner = ({ title }: { title: string }) => {
    return (
        <div className="w-full h-[300px] bg-sky-100 flex justify-center items-center">
            <div className="bg-yellow-400 text-3xl font-semibold px-7 py-3 rounded">{`Health Tools >> ${title}`}</div>
        </div>
    )
}

export default HealthtoolsBanner