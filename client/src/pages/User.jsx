import React from "react";
import { useLocation } from "react-router-dom";
import  { useState, useEffect } from 'react';
import Axios from 'axios';

const divStyle = {
   
    backgroundColor: 'white',
    color: 'black'
  };
  const TabStyle = {
   
    backgroundColor: 'white',
    color: 'black'
  };

export function User() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("ID");

  const [data, setData] = useState("")
  const getCustomersData =  () => {
      Axios.get(`http://localhost:3002/customers/${id}`)
        .then((response) => {
          const data = response.data;
          setData(data);
      })
    }
  
    useEffect(() => getCustomersData, []);
  
    
    return (
      <>
       <div className="" style={{
        backgroundColor: "#050A30",
        backgroundSize: 'cover' ,
        width: '100%',
        height: '800px',
       }}>
      <section className="section container p-4  forms ">
      {/* <div className="col-xl-12">
           <h1 className="card-title my-3 " style={{color:"white"}}>Registered Customers</h1>
        </div> */}
          <div className="mt-5 mb-4 ">
            <div className="forms mx-3 ">
              <div className="card ">
                <div className="card-body " >
                  <div className="row d-flex align-items-center ">
                  
                  
                  </div>
             
                    <table className="table table-borderless datatable m-0"  style={divStyle}>
                      <thead>
                        <tr>
                          <th scope="col" style={divStyle}>ID</th>
                          <th scope="col" style={divStyle}>Name</th>
                          <th scope="col" style={divStyle}>E-mail</th>
                          <th scope="col" style={divStyle}>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                  
                            <tr>
                              <th scope="row" style={TabStyle}>{data.id}</th>
                              <td style={TabStyle}>{data.name}</td>
                              <td style={TabStyle}>{data.email}</td>
                              <td style={TabStyle}>{data.balance} $</td>
                             
                            </tr>
                       
                      </tbody>
                    </table>
                   
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
          </>
  );
    }