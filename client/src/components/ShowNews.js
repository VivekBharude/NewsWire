import React,{ useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getNewsItemsById } from "../Store/Action";
import { useParams, useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from "axios";

const ShowNews = ()=>{
    const newsStore =  useSelector((state)=>{
        return state.news;
    });
    const {id} =useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(
        ()=>{
            dispatch(getNewsItemsById(id));
        },[dispatch,id]
    );

    const deleteNews = async () => {
		try {
			await axios.delete(`/api/news/${id}`);
			navigate('/');
		} catch (error) {
			console.log('danger', 'something went wrong while deleting the post, try again later');
		}
	};
return(
    <React.Fragment>
    {
        newsStore.newsItem?(
            <div>
                <div className="title">
                   <h1> {newsStore.newsItem.title}</h1>
                </div>
                <div className="my-4 ">
                    <img src={newsStore.newsItem.image} alt="" style={{ width: '80%', height: '500px' }} />
                </div>
                <div className="excerpt">
                   <p> {newsStore.newsItem.body}</p>
                </div>
                <div>
                <LinkContainer to={`/news/${newsStore.newsItem._id}/edit`}>
									<Button  className="btn btn-success mt-4 bt" >
										Edit
									</Button>
				</LinkContainer>
                <Button onClick={deleteNews} className="btn btn-danger mt-4 bt"  >
						Delete
					</Button>
                </div>
            </div>

        )
    :null}
    </React.Fragment>
)




}

export default ShowNews;