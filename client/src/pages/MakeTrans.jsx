import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
// import '../assets/js/newtrans.js'

export function MakeTrans() {
  // const [d, setData] = useState([])
  const [users, setusers] = useState([]);
  // const [fromID, setfromID] = useState([])
  // const [toID, settoID] = useState([])

  const getCustomersData = () => {
    Axios.get("http://localhost:3002/customers").then((response) => {
      const data = response.data;
      setusers(data);
    });
  };

  useEffect(() => getCustomersData, []);

  const [trans, setTrans] = useState({
    from: "",
    to: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setTrans({ ...trans, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (trans.from && trans.to && trans.amount && trans.date) {
      // get from account
      try {
        Axios.get(`http://localhost:3002/customer/${trans.from}`).then(
          (response) => {
            const fromID = response.data;
            // get to account
            Axios.get(`http://localhost:3002/customer/${trans.to}`).then(
              (response) => {
                const toID = response.data;
                //update from account
                Axios.patch(
                  `http://localhost:3002/customerbalance/${fromID.id}`,
                  {
                    balance: fromID.balance - trans.amount,
                  }
                )
                  .then((response) => {
                    //update to account
                  Axios.patch(
                      `http://localhost:3002/customerbalance/${toID.id}`,
                      {
                        balance: (parseInt(toID.balance) + parseInt(trans.amount)),
                      }
                    ).then((response) => {
                      // to get number of transaction to put id
                      Axios.get("http://localhost:3002/alltransaction").then(
                        (response) => {
                          const d = response.data;

                          // the add the new transaction
                          Axios.post("http://localhost:3002/makeTransaction", {
                            id: d.length + 1,
                            from: trans.from,
                            to: trans.to,
                            amount: trans.amount,
                            date: trans.date,
                          })
                            .then((response) => {
                              console.log(response);
                              alert("Transaction has been sucessful ! ");
                            })
                            .catch(function (error) {
                              console.log(error);
                              alert(" not done");
                            });
                        }
                      );
                    });
                  })
                  .catch(function (error) {
                    alert(error);
                  });
              }
            );
          }
        );
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please add Transaction Data.");
    }
  };

  return (
    <>
      <div
        className=""
        style={{
          backgroundColor: "#050A30",
          backgroundSize: "cover",
          width: "100%",
          height: "800px",
        }}
      >
        <section className="section container p-4  forms ">
          <div className="col-xl-12">
            <h1 className="card-title m-5 p-2 " style={{ color: "white" }}>
              Make a Transaction
            </h1>
          </div>
          <div className="mt-4 mb-4 ">
            <div className="forms mx-3 ">
              <div className="card ">
                <div
                  className="card-body "
                  style={{ backgroundColor: "white" }}
                >
                  <form onSubmit={handleSubmit} action="" className="p-4  ">
                    <label for="from">
                      From
                      <select
                        type="text"
                        name="from"
                        id="from"
                        className="m-3"
                        value={trans.from}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        {users.map((date) => {
                          return <option value={date.name}>{date.name}</option>;
                        })}
                      </select>
                    </label>
                    <label for="to">
                      To
                      <select
                        type="text"
                        name="to"
                        id="to"
                        className="m-3"
                        value={trans.to}
                        onChange={handleChange}
                      >
                        {" "}
                        <option value=""></option>
                        {users.map((date) => {
                          return <option value={date.name}>{date.name}</option>;
                        })}
                      </select>
                    </label>
                    <label for="amount">
                      Amount
                      <input
                        type="number"
                        name="amount"
                        className="m-3"
                        id="amount"
                        value={trans.amount}
                        onChange={handleChange}
                      />
                    </label>
                    <label for="date">
                      Data
                      <input
                        type="date"
                        name="date"
                        className="m-4"
                        id="date"
                        value={trans.date}
                        onChange={handleChange}
                      />
                    </label>

                    <Button
                      type="submit"
                      className=" btn-info m-5 pe-5 ps-5 ms-5"
                    >
                      Send Money
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
     
    </>
  );
}