export const Heading = ({ name, subhead })=>{
    return <>
         <div >
                <div className="text-3xl font-bold mb-2 text-blue-300">{name} </div>
                <div className="mb-5">{subhead}</div>
        </div>
    </>
}