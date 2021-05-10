import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { checkValidation } from "../../helper";
import CustomInput from '../../Components/customInput'
import axios from 'axios'



const initialValue = {
    title: "",
    description: ""
}
const AddPost = () => {
    const [addpost, setAddpost] = useState(initialValue)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [modal, setModal] = useState(false);
    const { title, description } = addpost;
    const toggle = () => setModal(!modal);

    const submitHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        const validationError = checkValidation(errors, {
            title,
            description
        });
        if (Object.keys(validationError).length !== 0) {
            console.log(validationError)
            setErrors(validationError);
        } else {
            console.log('addpost', addpost)
            setAddpost(initialValue)
            let post = {
                createdByUser: localStorage.getItem('userId'),
                title: addpost.title,
                description: addpost.description,
                likes: 0,
                dislikes: 0
            }
            console.log(post)
            axios.post('https://6094e51894009e00176b5f56.mockapi.io/posts', post)
            .then((response) => {
                console.log(response)
            })
            .catch(err => {
                alert(err)
            })
            toggle()
        }

    }

    const onChange = (name: string, value: string | boolean): void => {
        setAddpost({ ...addpost, [name]: value });

    };

    const validationHandler = (name: string, error: string): void => {
        setErrors({
            ...errors,
            [name]: error,
        });

    };

    return (
        <div>
            <div className="my-4 text-center">
                <Button color="danger" onClick={toggle}>Add Post</Button>
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new post</ModalHeader>
                <ModalBody>
                    <CustomInput
                        type={"text"}
                        name='title'
                        value={title}
                        label='Title'
                        placeholder={"Enter Title"}
                        isRequired={true}
                        onChange={onChange}
                        validationHandler={validationHandler}
                        error={errors.text}
                    />
                    <CustomInput
                        type={"textarea"}
                        name='description'
                        value={description}
                        label='Description'
                        placeholder={"Enter Description"}
                        isRequired={true}
                        onChange={onChange}
                        validationHandler={validationHandler}
                        error={errors.text}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitHandler}>Add Post</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddPost;
