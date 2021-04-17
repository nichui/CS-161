import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCategories} from "../../functions/category";

const CategoryList = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({});

    useEffect(() => {
        setLoading(true)
        getCategories().then(c => {
            setCategories(c.data);
            setLoading(false);
        });
        return () => {
            setState({});
        };
    }, []);

    const showCategories = () => categories.map((c) => (<div
        key = {c._id}
        className="col btn btn-outline-primary btn-block btn-raised m-3" style={{ backgroundColor: '#6ecfff' }}>
        <Link to={`/category/${c.slug}`} style={{ fontWeight: "bold", color: '#ffffff' }}>{c.name}</Link>

    </div>));

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : showCategories()}
            </div>
        </div>
    )
};

export default CategoryList;
