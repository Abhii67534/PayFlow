export const Button = ({label,onClick}) => {
    return <>
        <button className=" btn btn-success" onClick={onClick}>{label}</button>


    </>
}