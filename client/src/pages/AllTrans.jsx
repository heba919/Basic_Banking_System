import React, { useState, useEffect } from 'react';
import Axios from 'axios';
const divStyle = {
 
  backgroundColor: '#41729F',
  color: 'white'
};
const TabStyle = {
 
  backgroundColor: '#f7e7ce',
  color: 'black'
};

export function AllTrans() {
  
    const [data, setData] = useState("")
    const getCustomersData =  () => {
        Axios.get('http://localhost:3002/alltransaction')
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
      <div className="col-xl-12">
         <h1 className="card-title my-3 " style={{color:"white"}}>All Transaction</h1>
      </div>
          <div className="mt-4 mb-4 " >
            <div className="forms mx-3 ">
              <div className="card " >
                <div className="card-body " style={{backgroundColor: '#41729F'}} >
                 
                  {data.length > 0 ? (
                    <table className="table table-borderless datatable m-0"  style={divStyle} >
                      <thead>
                        <tr>
                          <th scope="col"  style={divStyle}>ID</th>
                          <th scope="col"  style={divStyle}>From</th>
                          <th scope="col"  style={divStyle}>To</th>
                          <th scope="col"  style={divStyle}>Amount</th>
                          <th scope="col"  style={divStyle}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((date) => {
                          return (
                            <tr>
                              <th scope="row" style={TabStyle} >{date.id}</th>
                              <td style={TabStyle} >{date.from}</td>
                              <td style={TabStyle} >{date.to}</td>
                              <td style={TabStyle} >{date.amount} $</td>
                              <td style={TabStyle} >{date.date}</td>
                            </tr>
                           );
                        })} 
                      </tbody>
                    </table>
                   ) : (
                    <p className="text-center text-danger fs-5">
                      There is no Transaction yet..!
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