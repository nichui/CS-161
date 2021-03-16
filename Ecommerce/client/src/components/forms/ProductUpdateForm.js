import React from 'react'
import ProductCreate from "../../pages/admin/product/ProductCreate";
import {Select} from 'antd'
const {Option} = Select;


const ProductUpdateForm = ({
                               handleSubmit,
                               handleChange,
                               setValues,
                               values,
                               handleCategoryChange,
                               categories,
                               subOptions,
                               arrayOfSubs,
                               setArrayOfSubs,
                               selectedCategory,
                           }) => {
    // destructure
    const {
        title,
        description,
        address,
        city,
        states,
        state,
        zipcode,
        email,
        phone,
        price,
        start_date,
        end_date,
        category,
        subs,
        shipping,
        quantity,
        images,
        seasons,
        brands,
        season,
        brand,
    } = values;
    return (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
            <label>
                Destination Address
            </label>
            <input
                type="text"
                name="address"
                className="form-control"
                value={address}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
                <label>
                    City
                </label>
                <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={city}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    State
                </label>
                <select
                    name="state"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option> Please select </option>
                    {states.map(s =>
                        (<option key={s} value={s}>
                            {s}
                        </option>
                        ))}

                </select>
            </div>

            <div className="form-group">
                <label>
                    Zip Code
                </label>
                <input 
                    type="text"
                    name="zipcode"
                    className="form-control"
                    value={zipcode}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    Email
                </label>
                <input 
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    Phone Number
                </label>
                <p>xxx-xxx-xxxx </p>
                <input 
                    type="text"
                    name="phone"
                    className="form-control"
                    value={phone}
                    onChange={handleChange}
                />
            </div>
            
            <div className="form-group">
                <label>
                    Description
                </label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
            <label>
                Start Date
            </label>
            <input 
                type="date"
                name="start_date"
                className="form-control"
                value={start_date}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label>
                End Date
            </label>
            <input 
                type="date"
                name="end_date"
                className="form-control"
                value={end_date}
                onChange={handleChange}
            />
        </div>

            <div className="form-group">
                <label>
                    Price
                </label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    Shipping
                </label>
                <select
                    value={shipping === 'Yes' ? 'Yes' : 'No'}
                    name="shipping" className="form-control" onChange={handleChange}>
                    {/*<option value="No">Please select</option>*/}
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>

                </select>
            </div>

            <div className="form-group">
                <label>
                    Quantity
                </label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    Season
                </label>
                <select
                    value={season}
                    name="season"
                    className="form-control"
                    onChange={handleChange}
                >

                    {seasons.map((season) =>
                        (<option key={season} value={season}>
                                {season}
                            </option>
                        ))}

                </select>
            </div>

            <div className="form-group">
                <label>
                    Brand
                </label>
                <select value={brand} name="brand" className="form-control" onChange={handleChange}>

                    {brands.map(brand =>
                        <option key={brand} value={brand}>
                            { brand }
                        </option>)}

                </select>
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}
                >
                    {/*<option>{category ? category.name : 'Please select'}</option>*/}

                    {categories.length > 0 &&
                    categories.map((category) => (<option key={category._id} value={category._id}>
                        {category.name}
                    </option>))}
                </select>
            </div>

            <div>
                <label>Sub Categories</label>
                <Select
                    mode = "multiple"
                    style={{width: '100%'}}
                    placeholder= "Please Select"
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubs(value)}
                >
                    {subOptions.length &&
                        subOptions.map((s) => (
                        <Option key={s._id} value={s._id}>
                            {s.name}
                        </Option>
                        ))}
                </Select>
            </div>



            {/*{subOptions ? subOptions.length : 'no subs yet'}*/}

            {/*{categories.length}*/}


            <br/>

            <button className="btn btn-outline-info">
                Save
            </button>

        </form>
    );
};

export default ProductUpdateForm;