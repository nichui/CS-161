import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/navigation/AdminNav'
//import UserNav from "../../components/navigation/UserNav";
import {toast} from 'react-toastify'
import {useSelector} from "react-redux";
import {createProduct} from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons'

const initialState = {
    title: "",
    description: "",
    address: "",
    city: "",
    states: ['AZ','CA','NY','TX'],
    state: '',
    zipcode: "",
    email: "",
    phone: "",
    start_date: "",
    end_date: "",
    price: "",
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: "",
    images: [],
    seasons: ['Spring', 'Summer', 'Fall', 'Winter', 'Whole Year'],
    brands: ['Hiking', 'Visiting', 'Traveling', 'Entertaining', 'Relaxing'],
    season: '',
    brand: '',
}


const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);


    //redux
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadCategories().then().catch();
    }, []);

    const loadCategories = () => getCategories().then(c =>
        setValues({...values, categories: c.data})
    );




    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token).then(
            (res) => {
                //console.log(res);

                window.alert(`"${res.data.title}" is created`);
                //toast.success(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
            console.log(err)

            /*if(err.response.status === 400)
                toast.error(err.response.data);*/

                toast.error(err.response.data.err);

        });
    };



    const  handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value});
        //console.log(e.target.name, ' ----- ', e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('CLICKED CATEGORY', e.target.value)
        setValues({ ...values, subs: [], category : e.target.value});
        getCategorySubs(e.target.value).then(res => {
            console.log('SUBS OPTION ON CATEGORY CLICK', res);
            setSubOptions(res.data);
        });
        setShowSub(true);
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ?
                        (
                            <LoadingOutlined className="text-danger h1"/> )
                                : (<h4>Product create</h4>)
                                }
                    <hr/>
                    {/*{JSON.stringify(values)}*/}
                    {/*{JSON.stringify(values.categories)}*/}
                    {/*{JSON.stringify(values.images)}*/}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}

                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;