import React from 'react';
import ReactTable from 'react-table';

const FileList = ({ files }) => {
    const columns = [{
        Header: 'Filename',
        accessor: 'filename' // String-based value accessors!
    }, {
        Header: 'Meta',
        accessor: 'meta',
    }, {
        Header: 'Permissions Contract',
        accessor: 'acl',
    }, {
        Header: 'Actions',
        accessor: 'acl',
        Cell: (row) => <button onClick={() => console.log(row.value)}>Grant</button>
    }
    ];

    return <ReactTable
        className='-striped -highlight'
        data={files}
        columns={columns}
        defaultPageSize={5}
    />;
};

export default FileList;