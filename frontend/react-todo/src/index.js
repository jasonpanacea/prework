import React from "react";
import {render} from "react-dom";
import _ from "lodash";
import axios from "axios";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:8000/api/items/").then(function (response) {
            console.log(response);
            // You can retrieve your data however you want, in this case, we will just use some local data.
            let filteredData = response.data;

            // You can use the filters in your request, but you are responsible for applying them.
            if (filtered.length) {
                filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                    return filteredSoFar.filter(row => {
                        return (row[nextFilter.id] + "").includes(nextFilter.value);
                    });
                }, filteredData);
            }
            // You can also use the sorting in your request, but again, you are responsible for applying it.
            const sortedData = _.orderBy(
                filteredData,
                sorted.map(sort => {
                    return row => {
                        if (row[sort.id] === null || row[sort.id] === undefined) {
                            return -Infinity;
                        }
                        return typeof row[sort.id] === "string"
                            ? row[sort.id].toLowerCase()
                            : row[sort.id];
                    };
                }),
                sorted.map(d => (d.desc ? "desc" : "asc"))
            );

            // You must return an object containing the rows of the current page, and optionally the total pages number.
            const res = {
                rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
                pages: Math.ceil(filteredData.length / pageSize)
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
            loading: true
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: true});
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
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
        const {data, pages, loading} = this.state;
        return (
            <div>
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
                            accessor: "created_at"
                        },
                        {
                            Header: "状态",
                            id: "status",
                            accessor: "status"
                        },
                        {
                            Header: "优先级",
                            accessor: "priority"
                        },
                        {
                            Header: "操作",
                            accessor: "operation",
                            sortable: false,
                            Cell: row => (
                                <div>
                                    <button type="button" className="btn btn-success">完成</button>

                                    <button type="button" className="btn btn-primary">详情</button>

                                    <button type="button" className="btn btn-danger">删除</button>

                                </div>
                            )
                        }
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20]}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }
}

render(<App />, document.getElementById("root"));
