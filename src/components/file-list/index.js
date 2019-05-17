import React, { useState } from 'react';
import ReactTable from 'react-table';

const FileList = ({ user, files, grantAccess}) => {
    const columns = [{
        Header: 'Filename',
        accessor: 'filename', // String-based value accessors!
    }, {
        Header: 'Meta',
        accessor: 'meta',
    }, {
        Header: 'Permissions Contract',
        accessor: 'acl',
    }, {
        Header: 'Actions',
        accessor: 'acl',
        width: 350,
        Cell: (row) => {
            const [toAccount, setToAccount] = useState('');
            return (
                <form
                    onSubmit={(e) => {
                        const grant = {
                            acl: row.value,
                            ownerAccount: user.account,
                            password: user.password,
                            toAccount,
                            permissionType: 'read'
                        };
                        grantAccess(grant);
                        e.preventDefault();
                    }}
                >
                    <button type='submit'>Grant To</button>
                    <input name='acl' type='text' onChange={(e) => setToAccount(e.target.value)} value={toAccount} />
                </form>
            );
        }
    }];

    return <ReactTable
        className='-striped -highlight'
        data={files}
        columns={columns}
        defaultPageSize={5}
    />;
};

export default FileList;