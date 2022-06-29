import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { InputGroup, FormControl } from 'react-bootstrap';
import Api from "../Api";

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        Api.get("assets/products.json")
            .then((response) => {
                if (response.status === 200) {
                    setProductsData(response.data);
                    setFilteredData(response.data);
                    var setObj = new Set();
                    var result = response.data.reduce((acc, item) => {
                        if (!setObj.has(item.type)) {
                            setObj.add(item.type, item)
                            acc.push({
                                value: item.type,
                                label: item.type
                            })
                        }
                        return acc;
                    }, []);
                    setProductTypes([{ value: "All", label: "All Products" }, ...result])
                    setTimeout(() => {
                        document.body.classList.add("loaded");
                    }, 2000);
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    function SelectType(e, fieldType) {
        if (fieldType === 'byInput') {
            const test = productsData.filter(team => {
                return team.productName.toLowerCase().includes(e.toLowerCase());
            });
            setFilteredData(test);
        }
        else {
            if (e.value === 'All') {
                setFilteredData(productsData);
            } else {
                const itemList = productsData.filter(item => {
                    return item.type === e.value;
                });
                setFilteredData(itemList);
            }
        }

    };

    return (
        <div className="container-fluid tm-container-content tm-mt-60">
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-5 blocks">
                    <h2 className="tm-text-primary">Products</h2>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-5 blocks">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                        <FormControl
                            placeholder="Product Name"
                            aria-label="name"
                            aria-describedby="basic-addon1"
                            onChange={(e) => SelectType(e.target.value, 'byInput')}
                        />
                    </InputGroup>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-5 blocks">

                    <Select options={productTypes}
                        onChange={(e) => SelectType(e, 'byDropdown')} placeholder='Filter By type' />

                </div>
            </div>
            <div className="row tm-mb-90 tm-gallery main-block">
                {
                    filteredData.map((item, i) => {
                        return (
                            <div
                                className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-5 blocks"
                                key={i}
                            >
                                <div className="inner-block">
                                    <div className="d-flex justify-content-between">
                                        <img src={item.productImage} alt={`${item.productName}'s picture`} className="product-image" />
                                    </div>
                                    <div className="d-flex justify-content-between product-desc">
                                        <span className="tm-text-black">
                                            Product Name: <span className="tm-text-gray">{item.productName}</span>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="tm-text-black">
                                            Price: <span className="tm-text-gray"> {item.price} </span>
                                            {item.isSale ? <span className="sale">On sale</span> : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default Products;
