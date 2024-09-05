export const LabelComponent = ({label,amount,color,percentage}) => {
    return (
        <div className='p-4 flex justify-between '>

            <div className='flex items-center'>
                <div style={{backgroundColor:color}} className='mr-4 w-2 rounded-lg h-4 bg-${color}'></div>
                <div className="font-bold text-purple-200">{label}</div>
            </div>

            <div className='flex items-center font-bold text-purple-200'>
                {percentage}%
            </div>

        </div>
    )
}
