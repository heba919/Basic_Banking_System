import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from "react-bootstrap";

const gotofile = (id) => {
  window.location.replace(
    `/OneUser?ID=${id}`
  );
};

const divStyle = {
   
    backgroundColor: '#41729F',
    color: 'white'
  };
  const TabStyle = {
   
    backgroundColor: '#f7e7ce',
    color: 'black'
  };

export function AllUsers() {
  
    const [data, setData] = useState("")
    const getCustomersData =  () => {
        Axios.get('http://localhost:3002/customers')
          .then((response) => {
            const dat = response.data;
            setData(dat);
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
      <div className="col-xl-12">
           <h1 className="card-title my-3 " style={{color:"white"}}>Registered Customers</h1>
        </div>
          <div className="mt-4 mb-4 ">
            <div className="forms mx-3 ">
              <div className="card ">
                <div className="card-body "  style={{backgroundColor: '#41729F'}}>
                  <div className="row d-flex align-items-center ">
                  
                  
                  </div>
                  {data.length > 0 ? (
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
                        {data.map((date) => {
                          return (
                            <tr>
                              <th scope="row" style={TabStyle}>{date.id}</th>
                              <td style={TabStyle}>{date.name}</td>
                              <td style={TabStyle}>{date.email}</td>
                              <td style={TabStyle}>{date.balance} $</td>
                              <td style={TabStyle} >
                              <Button
                                className=" bg-dark"
                                onClick={() =>
                                 gotofile(date.id)
                                }
                              >
                                View
                              </Button>
                            </td>
                            </tr>
                           );
                        })} 
                      </tbody>
                    </table>
                   ) : (
                    <p className="text-center text-danger fs-5">
                      There isn't match result..!
                    </p>
                  )} 
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
          </>
  );
    }