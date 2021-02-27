import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/navigation/AdminNav'
//import UserNav from "../../components/navigation/UserNav";
import {toast} from 'react-toastify'
import {useSelector} from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/category";
import {Link} from "react-router-dom";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    /// spread state object and get the user out of that
    // object destruction
    const {user} = useSelector(state => ({...state}));
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    //searching/filtering
    //step 1
    const[keyword, setKeyword] = useState(""); //whenever user types something, it will be stored in state


    useEffect(() => {
        loadCategories().then().catch();
    }, []);

    const loadCategories = () => getCategories().then(c =>
        setCategories(c.data)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true)
        createCategory({name}, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`);
                loadCategories().then().catch();
        })
            .catch(err => {
                console.log(err);
                setLoading(false)
                if(err.response.status === 400) toast.error(err.response.data);
            })
    };

    const handleRemove = async(slug) => {
        /*let ans = window.confirm("Delete?");
        console.log(ans, slug);*/
        if(window.confirm("Delete?")){
            setLoading(true)
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategories().then().catch();
                })
                .catch(err => {
                    if(err.response.status === 400){
                        setLoading(false);
                        toast.error(err.response.data);

                    }
                })
        }
    }
    /*const categoryForm = () =>
        <form onSubmit ={handleSubmit}>
            <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control"
                       onChange={e => setName(e.target.value)}
                       value = {name}
                       autoFocus
                       required
                />
                <br/>
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>*/

    /*// step 3
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase());
    }*/

    // step 4
    const searched = (keyword) => (category) => category.name.toLowerCase().includes(keyword)

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    { loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Create Category</h4>
                    )}
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                    {/* Step 2
                    <input
                        type="search"
                        placeholder="Filter"
                        value={keyword}
                        onChange={handleSearchChange}
                        className="form-control mb-4"
                    /> user can type keywords here*/}

                    {/* step 2 and step 3 after combination by LocalSearch.js*/}
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />


                    {/* step 5 */}
                    {categories.filter(searched(keyword)).map((category) => (
                        <div className="alert alert-warning" key = {category._id}>
                        {category.name}
                        <span onClick={() => handleRemove(category.slug)} className="btn btn-sm float-right">
                            <DeleteOutlined className="test-danger"/>
                        </span>
                            <Link to={`/admin/category/${category.slug}`}>

                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning"/>
                                </span>
                            </Link>
                    </div>))}
                    {/*JSON.stringify(categories*/}
                    {/*{categories.length}*/}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;