import { useState,useEffect } from "react";
import axios from "axios";

export default function Usecategory(){
    const [categories, setcategory] = useState([]);

    const getcategory =async()=>{
        try {
            const {data} = await axios.get('https://mernstackecommerce-production.up.railway.app/api/v1/category/get-category')
            setcategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(()=>{
        getcategory();
    },[]);
    return categories;
}