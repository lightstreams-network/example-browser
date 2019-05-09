import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import leth from '../../lib/leth';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;

const Dropzone = ({ user }) => {
    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            // Do whatever you want with the file contents
            console.log('Loading file')
            const binaryStr = reader.result;
            console.log(binaryStr);

        };
        acceptedFiles.forEach(async file => {

            const { response } = await leth.storage.add({
                account: user.account,
                password: user.password,
                file
            });

            console.log(response);

            // const formData = new FormData();
            // formData.append('owner', user.account);
            // formData.append('password', user.password);
            // formData.append('file', file);
            // fetch('https://gateway.sirius.lightstreams.io/storage/add', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .catch(error => console.error('Error:', error))
            // .then(response => console.log('Success:', JSON.stringify(response)));

            // console.log(file);
            // reader.readAsBinaryString(file)
        });
    }, []);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </Container>
    );
};

export default Dropzone;
