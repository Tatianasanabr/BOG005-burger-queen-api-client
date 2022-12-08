import React from "react";

const ProductTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
    {props.products.length > 0 ? (
        props.products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
            <button className="button muted-button">Add</button>
              <button className="button muted-button">Edit</button>
              <button className="button muted-button">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No hay productos</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default ProductTable




// // Componentes para los productos
// const ProductTable = (product) => {
//     return (
//         <article className="productsContainer">
//             {/* <img className="imageProduct" srcSet={product.image} alt={product.name} /> */}
//             <div className="infoProduct">
//                 <p>{product.id}</p>
//                 <p>{product.name}</p>
//                 <p>{product.price}</p>
//                 <img srcSet={product.image} alt={product.name}></img>
//                 <p>{product.type}</p>
//             </div>
//         </article>
//     )
// }

// export { products }







/* import { useCart } from "react-use-cart";

const Menu = (props) => {
  const { addItem } = useCart();
  //Visualizamos los productos: name, price & Image
  return (
    <div className="product"
    onClick={() => addItem(props.item)}>

      <img src={props.image} alt={props.name} className="imgProductos" />
      <div className="product-name-price">
        <p>{props.name}</p>
        <p className="product-price">${props.price}</p>
      </div>
    </div>
  );
};

export default Menu; */