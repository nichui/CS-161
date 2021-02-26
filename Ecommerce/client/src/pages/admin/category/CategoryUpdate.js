import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/navigation/AdminNav'
//import UserNav from "../../components/navigation/UserNav";
import {toast} from 'react-toastify'
import {useSelector} from "react-redux";
import {updateCategory, getCategory} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";



const CategoryUpdate = ({history, match}) => {
    /// spread state object and get the user out of that
    // object destruction
    const {user} = useSelector(state => ({...state}));
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadCategory().then().catch();
    }, []);

    const loadCategory = () => getCategory(match.params.slug).then((category) =>
        setName(category.data.name)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true)
        updateCategory(match.params.slug, {name}, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is updated`);
                history.push('/admin/category');

            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                if(err.response.status === 400) toast.error(err.response.data);
            })
    };

    /*const handleRemove = async(slug) => {
        /!*let ans = window.confirm("Delete?");
        console.log(ans, slug);*!/
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
    }*/
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
                        <h4>Update Category</h4>
                    )}
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                    <hr/>

                    {/*JSON.stringify(categories*/}
                    {/*{categories.length}*/}
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;