export const InputCard = ({label,placeholder,onChange,name="text"}) => {
    return <div >
        <div className="flex flex-row font-bold mb-2 text-lg">{label}</div>

        <div className="mb-4 flex flex-row ml-1" >
        <input type={name} placeholder={placeholder} 
        className="border-2 rounded-md w-[300px] h-[40px] p-2" onChange={onChange}></input>
        </div>

    </div>
}