import React, { useEffect, useState } from "react";

/* REACT-BOOTSTRAP */
import { Row, Col, Form, Button } from "react-bootstrap";

/* COMPONENTS */
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState ('')

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, loading, error } = productList;

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/?keyword=${keyword}`);
    } else {
      history.push("/");
    }
  };
  

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {/* {!keyword && <ProductCarousel />} */}

      <h1>Latest Products</h1>

      <Form  ><Row>
        <Col>
            <Form.Control style={{width:1100}}onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            /> 
            </Col> 
            <Col>
            <Button type="button" class="btn btn-dark">Search</Button></Col>
            </Row>
          </Form>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
         <Row>
    {products.filter((product)=>
        {
          return search.toLowerCase() === '' ? product : product.name.toLowerCase().includes(search);
        }).map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
    </Row>

          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}

    </div>
  );
}

export default HomeScreen;