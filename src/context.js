import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state={
        products:[],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }

    componentDidMount(){
        this.setProduct();
    }

    setProduct = () => {
        let tempProduct = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProduct = [...tempProduct, singleItem];
        });
        this.setState(()=>{
            return {products: tempProduct};
        })
    }

    getItem = id => {
        const product = this.state.products.find(product => product.id === id);
        return product;
    }

    handleDetail = id=> {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product};
        })
    }

    addToCart = (id)=> {
        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {products: tempProduct,
            cart: [...this.state.cart, product]};
        }, () => {this.addTotals()})
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalOpen: true,
            modalProduct: product};
        });
    }

    closeModal = () => {
        this.setState(() => {
            return {modalOpen: false};
        });
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];

         const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.price*product.count;

         
        this.setState(() => {
            return{
                cart: [...tempCart]
            }
        }, () => this.addTotals())
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];

         const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count = product.count - 1;

        if(product.count === 0){
            this.removeItem(id);
        }else{
            product.total = product.price*product.count;
            this.setState(() => {
                return{
                    cart: [...tempCart]
                }
            }, () => this.addTotals())
        }
        
    }

    removeItem  = (id) => {
        let tempProduct = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProduct.indexOf(this.getItem(id));
        let removeProduct = tempProduct[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;
         
        this.setState(() => {
            return{
                products: tempProduct,
                cart: tempCart
            }
        }, () => this.addTotals())
    }

    clearCart  = () => {
        this.setState(() => {
            return {cart: []};
        }, () => {
            this.setProduct();
            this.addTotals();
        });
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal*0.1;
        const tax = parseFloat(tempTax.toFixed(2)); //fixed tempTax to 2 decimal points
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{ 
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal, 
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                }}> 
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider, ProductConsumer};