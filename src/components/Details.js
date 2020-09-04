import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value =>{
                    const {id, title, img, price, company, info, inCart} = value.detailProduct;
                    return(
                        <div className="container py-5">
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* end title */}
                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize" style={{background: "transparent"}}>
                                    <img src={img} className="img-fluid" alt="product" style={{width: "90%", height: "90%"}} />
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model : {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                     made by : <span>{company}</span></h4>
                                     <h4 className="text-blue">
                                         <strong>
                                             price : <span>SEK </span>
                                             {price}
                                         </strong>
                                     </h4>
                                     <p className="text-capitalize mt-3 mb-0 font-weight-bold">
                                        some info about product :
                                     </p>
                                     <p className="text-muted lead">{info}</p>
                                     {/* buttons */}
                                     <div>
                                        <Link to="/">
                                            <ButtonContainer>back to product</ButtonContainer>
                                        </Link>
                                        <ButtonContainer 
                                            cart
                                            disabled={inCart ? true : false}
                                            onClick={() => {value.addToCart(id); 
                                                            value.openModal(id);}}
                                        >
                                            {inCart ? "in cart" : "add to cart"}
                                        </ButtonContainer>
                                     </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </ProductConsumer>
        )
    }
}