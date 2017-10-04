import React, { Component } from 'react';
import './App.css';
import {render} from "react-dom";
import ReactModal from 'react-modal';
import axios from "axios";
import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// const rawData = makeData();

const requestData = (pageSize, page) => {
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:8000/api/items/").then(function (response) {
            console.log(response);

            const res = {
                rows: response.data.slice(pageSize * page, pageSize * page + pageSize),
                pages: Math.ceil(response.data.length / pageSize)
            };
            resolve(res);
        }).catch(function (error) {
            console.log(error);
        });

    });
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true,
            showModal: false,
            content: "",
            priority: 1,
            expire_date: moment()
        };
        this.fetchData = this.fetchData.bind(this);
        this.renderEditable = this.renderEditable.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlerPriority = this.handlerPriority.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.handleDate = this.handleDate.bind(this);

    }

    handleOpenModal() {
        this.setState({showModal: true});
        this.setState({id: ""});
        this.setState({content: ""});
        this.setState({priority: 1});
        this.setState({expire_date: moment()});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleSubmit() {
        console.log(this.state)
        this.setState({showModal: false});
        var value = {
            content: this.state.content,
            priority: this.state.priority,
            expire_date: moment(this.state.expire_date).format('YYYY-MM-DD'),
        }
        let self = this;
        if (this.state.id !== "") { //edit

            axios.patch("http://127.0.0.1:8000/api/items/" + this.state.id + '/', value).then(function (response) {
                value.id = self.state.id
                self.state.data.splice(self.state.index, 1, value)
                self.setState({data: self.state.data})
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {//create
            axios.post("http://127.0.0.1:8000/api/items/", value).then(function (response) {
                self.state.data.push(response.data)
                self.setState({data: self.state.data})
            }).catch(function (error) {
                console.log(error);
            });
        }

    }

    handleChange(date) {
        this.setState({
            expire_date: date
        });
    }

    handlerPriority(event) {
        this.setState({priority: event.target.value});
    }

    handleContent(event) {
        this.setState({content: event.target.value});
    }

    handleDate(date) {
        this.setState({expire_date: date});
    }

    componentDidMount() {
        console.log("did mount")
        let self = this
        axios.get("http://127.0.0.1:8000/api/items/").then(function (response) {
            console.log(response);
            self.setState({data: response.data})
            self.setState({loading: false});
        }).catch(function (error) {
            console.log(error);
        });
    }

    renderEditable(cellInfo) {
        return (
            <div>
                <button onClick={() => {
                    console.log(cellInfo)
                    let self = this;
                    var value = {
                        id: cellInfo.original.id,
                        content: cellInfo.original.content,
                        priority: cellInfo.original.priority,
                        status: 1,
                        expire_date: cellInfo.original.expire_date,
                        created_at: cellInfo.original.created_at
                    }
                    this.setState({loading: true});
                    axios.patch("http://127.0.0.1:8000/api/items/" + cellInfo.original.id.toString() + '/', {status: 1}).then(function (response) {
                        self.state.data.splice(cellInfo.index, 1, value)
                        self.setState({data:self.state.data})
                        self.setState({loading: false});
                    }).catch(function (error) {
                        console.log(error);
                    });
                }}
                   disabled={cellInfo.original.status!==0} type="button" className="btn btn-success">完成
                </button>

                <button onClick={() => {
                    this.setState({showModal: true});
                    this.setState({index: cellInfo.index});
                    this.setState({id: cellInfo.original.id});
                    this.setState({content: cellInfo.original.content});
                    this.setState({priority: cellInfo.original.priority});
                    this.setState({expire_date: moment(cellInfo.original.expire_date)});
                }} type="button" className="btn btn-primary">详情
                </button>

                <button onClick={() => {
                    console.log(cellInfo)
                    let self = this;
                    axios.delete("http://127.0.0.1:8000/api/items/" + cellInfo.original.id.toString() + '/').then(function (response) {
                        self.state.data.splice(cellInfo.index, 1)
                        self.setState({data:self.state.data})
                    }).catch(function (error) {
                        console.log(error);
                    });
                }} type="button" className="btn btn-danger">删除
                </button>

            </div>
        );
    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: true});
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        requestData(state.pageSize, state.page,
        ).then(res => {
            console.log(res);
            // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false
            });
        });
    }

    render() {
        // const {data, pages, loading} = this.state;
        return (
            <div className="content">
                <div>
                    <button style={{marginBottom:10}} onClick={this.handleOpenModal} className="btn btn-primary">新建待办事项</button>
                </div>
                <ReactTable
                    columns={[
                        {
                            Header: "内容",
                            accessor: "content",
                            filterable: true,
                            sortable: false
                        },
                        {
                            Header: "到期时间",
                            accessor: "expire_date"
                        },
                        {
                            Header: "创建时间",
                            accessor: "created_at",
                            Cell: row => (moment(row.value).format('YYYY-MM-DD'))
                        },
                        {
                            Header: "状态",
                            id: "status",
                            accessor: "status",
                            Cell: row => (row.value === 1 ? "已完成" : row.value === 0 ? "未完成" : "已过期"),
                        },
                        {
                            Header: "优先级",
                            accessor: "priority",
                            Cell: row => (row.value === 1 ? "中" : row.value === 0 ? "低" : "高")
                        },
                        {
                            Header: "操作",
                            accessor: "operation",
                            sortable: false,
                            Cell: this.renderEditable
                        }
                    ]}
                    data={this.state.data}
                    loading={this.state.loading} // Display the loading overlay when we need it
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20]}
                    className="-striped -highlight"
                />
                <br />
                <div>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                    >
                        <form>
                            <div className="form-group">
                                <label htmlFor="content">内容</label>
                                <textarea value={this.state.content} className="form-control" id="content" rows="3"
                                          onChange={this.handleContent}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="priority">优先级</label>
                                <select value={this.state.priority} onChange={this.handlerPriority}>
                                    <option value="0">低</option>
                                    <option value="1">中</option>
                                    <option value="2">高</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expire_date">到期时间</label>
                                <DatePicker id="expire_date"
                                            selected={this.state.expire_date}
                                            onChange={this.handleDate}
                                />
                            </div>
                        </form>
                        <button onClick={this.handleCloseModal}>取消</button>
                        <button onClick={this.handleSubmit}>确定</button>
                    </ReactModal>
                </div>
            </div>
        );
    }
}

export default App;
