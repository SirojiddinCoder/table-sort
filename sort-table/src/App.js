import React, { Component } from "react";
import { data } from "./Backend";
import './table.css';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      name: "",
      status: "",
      address:"",
      selected: null,
      // restore: data,
      newName: "",
      newStatus: "",
      newAddress:"",
    };
  }
  render() {
    const onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    const onEdit = (e) => {
      this.setState({
        name: e.name,
        status: e.status,
        address: e.address,
        selected: e.id,
      });
    };
    const onSave = () => {
      let newData = this.state.data.map((value) =>
        value.id === this.state.selected
          ? { ...value,
             name: this.state.name,
             status: this.state.status,
             address: this.state.address

            }
          : value
      );
      this.setState({
        data: newData,
        selected: null,
      });
    };
    const onDelete = (e) => {
      let map = this.state.data.filter((value) => value.id !== e.id);
      this.setState({
        data: map,
      });
    };

    const onAdd = () => {
      let newBaze = {
        id: this.state.data[this.state.data.length - 1].id + 1,
        name: this.state.newName,
        status: this.state.newStatus,
        address: this.state.newAddress,
      };
      let data2 = this.state.data;
      data2.push(newBaze);
      this.setState({
        data: data2,
      });
    };

    // Filtered
    const onFilter = (e) => {
      if (e.target.value === "name") {
        this.setState({
          data: this.state.data.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          }),
        });
      } else {
        this.setState({
          data: this.state.data.sort(function (a, b) {
            if (a.status < b.status) {
              return -1;
            }
            if (a.status < b.status) {
              return 1;
            }
            return 0;
          }),
        });
      }
    };

    return (
      <div>
        <table
          // border="1"
          // style={{ borderCollapse: "collapse", width: "70%", margin: "auto", position:"relative",top:"100px"}}
        >
          <thead>
            <tr>
              <th>
                <input
                  onChange={onChange}
                  name="newName"
                  value={this.state.newName}
                />
              </th>
              <th>
                <input
                  onChange={onChange}
                  name="newStatus"
                  value={this.state.newStatus}
                />
              </th>
              <th>
                <input
                  onChange={onChange}
                  name="newStatus"
                  value={this.state.newAddress}
                />
              </th>
              <th>
                <button
                 style={{ backgroundColor:"green",width:"80px", height:"30px",color:"white" }}
                onClick={onAdd}>Qo'shish</button>
                 <select className="filtered"   style={{ backgroundColor:"slateblue",width:"60px", height:"40px",color:"yellow" }} onChange={onFilter}>
                  <option value="name">Name</option>
                  <option value="status">Status</option>
                </select>

              </th>
            </tr>
          </thead>
        </table>
        <table className="TableFixed"
          // border="1"
          // style={{ borderCollapse: "collapse", width: "80%", margin: "auto",position:"relative",top:"150px" }}
        >
          <thead>
            <tr style={{ backgroundColor:"green",color:"white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>
                  {this.state.selected === value.id ? (
                    <input
                      name="name"
                      onChange={onChange}
                      value={this.state.name}
                    />
                  ) : (
                    value.name
                  )}
                </td>
                <td>
                  {this.state.selected === value.id ? (
                    <input
                      name="status"
                      onChange={onChange}
                      value={this.state.status}
                    />
                  ) : (
                    value.status
                  )}
                </td>
                <td>
                  {this.state.selected === value.id ? (
                    <input
                      name="address"
                      onChange={onChange}
                      value={this.state.address}
                    />
                  ) : (
                    value.address
                  )}
                </td>
                <td>
                  {this.state.selected === value.id ? (
                    <button  style={{ backgroundColor:"green",margin:"6px 4px",cursor:"pointer",color:"white",fontSize:"16px", width:"70px",height:"25px", position:"relative",right:"-50px"}}

                    onClick={onSave}>Save</button>
                  ) : (
                    <button
                    style={{ backgroundColor:"blue",margin:"6px 4px",cursor:"pointer",color:"white",fontSize:"16px", width:"70px",height:"25px", position:"relative",right:"-50px"}}

                    onClick={() => onEdit(value)

                    }>Edit</button>
                  )}
                  <button style={{backgroundColor:"red",margin:"6px 4px",cursor:"pointer",color:"white",fontSize:"16px", width:"70px",height:"25px", position:"relative",right:"-50px"}} onClick={() => onDelete(value)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
