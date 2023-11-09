import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';

const MyProfile = () => {
    const[mydata,setMydata] = useState([]);
    const [userId, setUserid] = useState(sessionStorage.getItem("userId"));
    useEffect(()=>{
      axios.get("http://localhost:8000/api/viewmyprofile/"+userId)
      .then((response)=>{
        console.log(response);
        setMydata(response.data)
      })
    },[])
   
  return (
    <div>
        
        <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12">
            <div className="row g-3">
              {mydata.map((value, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-6 col-lg-6 d-flex align-items-stretch">
                    <div class="card mb-3">
                      <div class="row g-0">
                        <div class="col-md-4">
                          {/* <img
                            src={value.img_url}
                            class="img-fluid rounded-start"
                            alt="..."
                          /> */}
                        </div>
                        <div class="col-md-12">
                          <div class="card-body">
                            <h5 class="card-title" >Name: {value.name} </h5>
                            <p class="card-text"> Email:{value.email} </p>
                            <p class="card-text">
                              <small class="text-body-secondary">
                                Address: {value.address}{" "}
                              </small><br />
                              <small class="text-body-secondary">
                                Phone: {value.phone}{" "}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile