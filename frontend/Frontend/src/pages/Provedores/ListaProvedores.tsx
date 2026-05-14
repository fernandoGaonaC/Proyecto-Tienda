import type { Provedor } from "../../types/Provedor";
interface Props{
    provedores:Provedor[],
    onEliminar:(id:number)=> void,
    onEditar:(provedor:Provedor)=>void ,
    


}
function ListaProvedores({provedores,onEliminar,onEditar}:Props){
return (
<>
    <table className="table-clientes">
    <thead>
        <tr>
            <th>nit</th>
            <th>nombreProveedor</th>
            <th>direccionProveedor</th>
            <th>telefonoProveedor</th> 
            <th>ciudadProveedor</th>
            <th>fechaRegistro</th> 
            <th>Eliminar</th>
            <th>Editar</th>
        </tr>
    </thead>
    <tbody>
        {provedores.map((p)=>(
            <tr key={p.nitProveedor}>
                <td>{p.nitProveedor}</td>
                <td>{p.nombreProveedor}</td>
                <td>{p.direccionProveedor}</td>
                <td>{p.telefonoProveedor}</td> 
                <td>{p.ciudadProveedor}</td>
                <td>{p.fechaRegistro}</td> 
                <td><button
                className="btn-eliminar"
                onClick={()=>{onEliminar(p.nitProveedor)}}>Eliminar</button></td>
                <td><button
                className="btn-editar"
                onClick={()=>{onEditar(p)}}>Editar</button></td>   
            </tr>
        )
    )}
    </tbody>
</table>
</>
)
}
export default ListaProvedores;