import React from "react";
import { getProducts, orderPetition } from "../petitions/userPetition";
import ProductsTable from "../components/ProductsTable";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./styles/Waiters.css";
import ButtonInclusive from "../components/Button";
import  ProductsOrder from "../components/ProductsOrder";
import FormInput from "../components/FormInput";


export function Waiters () {

  const navigate = useNavigate()

  const [productsOptions, setProductsOptions] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [nameClient, setNameClient] = useState("");

  useEffect(() => {
    const getProductsOptions = async () => {
      const result = await getProducts();
      setProductsOptions(result);
    };
    getProductsOptions(); 
  }, [orderList]);

  const selectOption = (e) => {
    const resultFilter = productsOptions.filter((product) => {
      if (e.target.value === product.type) {
        return true;
      }
      return false;
    });
    setProductsList(resultFilter);
  };

  //Función para adicionar productos a la orden del cliente
  const addProductOrder = (props) => {
    let productInOrder = orderList.map((product) => product.product.id).includes(props.id)
    if(productInOrder){
      Swal.fire({
        icon: "error",
        title: "Imposible",
        text: "Este producto ya fue agregado a la orden!"
      })
    } else {
      setOrderList([...orderList, { qty: 1, product: props}])
    }
  }

  const totalPrice = orderList.map((product) => product.product.price * product.qty).reduce((sum, val) => sum + val, 0)
  const handleChange = (e) => {
    setNameClient(e.target.value)
  }

  const sendOrderPetition = async (e) => {
    e.preventDefault()
    try {
      const res = orderPetition(orderList, nameClient)
      if(res === 201) {
        navigate("/orderState")
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Imposible",
        text: "No es posible crear la orden!"
      })
    }
  }

  return (
    <div>
      <section className="options-container">
        <Header />
        <section className="optionsListContainer">
          <select className="optionMenu" onChange={selectOption}>
            <option value="Seleccione Desayuno/Almuerzo y Cena">
              Seleccione una opción
            </option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo Y Cena</option>
          </select>
          {productsList.map((product, id) => {
            return (
              <div key={id} className="listProductsOrder">
                <ProductsTable
                product={product}
                dataEntry={new Date()}
                clickAdd={() => addProductOrder(product)}
                ></ProductsTable>
              </div>
            );
          })
          }
        </section>
        <form typeof="submit" className="formOrder" onSubmit={sendOrderPetition}>
          <p className="pOrderSummary">Tomando pedidos</p>
          <FormInput
            className="inputNameClient"
            value={nameClient}
            requires
            placeholder="Nombre cliente"
            onChange={handleChange}>
          </FormInput>
          <section className="containerLabels">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cant</p>
            <p>Eliminar</p>
          </section>
          <div className="containerProductsAdmin">
            {orderList.map((product, id) => (
              <div key={id}>
                <ProductsOrder
                productSelect={product}
                orderList={orderList}
                setOrderList={setOrderList}
                />
              </div>
            ))}
          </div>
          <div className="totalPrice">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
          <section className="sectionBtn">
            <ButtonInclusive text="Enviar" className="btnSend"></ButtonInclusive>
            <ButtonInclusive text="Cancelar" className="btnCancel"></ButtonInclusive>
          </section>

        </form>
      </section>
    </div>
  );
}

export default Waiters;