import React from 'react'
import {Card, Tabs } from 'antd'
import {Link} from 'react-router-dom'
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import Default from'../../images/Default.jpg';
import ProductListItems from './ProductListItems';

import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const{TabPane} = Tabs;

const {Meta} = Card;
const SingleProduct = ({product}) => {
    const {title, images, description} = product;
    return(
        <>

            <div className="col-md-7">
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
                </Carousel> :
                    (<Card
                        cover={
                            <img
                                src={Default}
                                className="mb-3 card-image"
                            />

                        }
                    >

                    </Card>)
                }
                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us on xxx-xxx-xxxx to learn more about this product.
                    </TabPane>
                </Tabs>
            </div>




            <div className="clo-md-5">
                <h1 className="bg-info p-3">
                    {title}
                </h1>

                <Card
                    actions = {[
                        <>
                            <ShoppingCartOutlined className="text-success" /><br/>
                            Add to Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /><br/>
                            Add to Wishlist
                        </Link>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
