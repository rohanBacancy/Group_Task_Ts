import {useState} from 'react'
import { checkValidation } from "../helper";
import axios from 'axios'
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
  } from "reactstrap";
import CustomInput from "../Components/customInput";
import { useHistory } from 'react-router';



const initailValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}
const Registration = () => {

  const history = useHistory();

    const [formData, setFormData] = useState(initailValue);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const onCancel = ():void => {
      history.push("/")
    }

    const onSubmit = (): void => {
        const { firstName, lastName, email, password } = formData;
        const validationError = checkValidation(errors, {
            firstName,
            lastName,
          email,
          password,
        });
        if (Object.keys(validationError).length !== 0) {
          setErrors(validationError);
        } else {
            axios.post('https://6094e51894009e00176b5f56.mockapi.io/users', {
                id: Math.random(),
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password
            }).then(res => {
              history.push("/");
            })
        }   
      };
    
      const onChange = (name: string, value: string | boolean): void => {
        setFormData({ ...formData, [name]: value });
      };
    
      const validationHandler = (name: string, error: string): void => {
        setErrors({
          ...errors,
          [name]: error,
        });
      };
      const { firstName, lastName, email, password } = formData;
    return (
        <Container>
      <Row className='h-100vh align-items-center'>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle tag='h4' className='text-primary'>
                Registration
              </CardTitle>

              <CustomInput
                type={"text"}
                name='firstName'
                value={firstName}
                label='First Name'
                placeholder={"Enter First Name"}
                isRequired={true}
                //reqType={"text"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.text}
              />

              <CustomInput
                type={"text"}
                name='lastName'
                value={lastName}
                label='Last Name'
                placeholder={"Enter Last Name"}
                isRequired={true}
                //reqType={"text"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.text}
              />

              <CustomInput
                type={"email"}
                name='email'
                value={email}
                label='Email'
                placeholder={"Enter email"}
                isRequired={true}
                //reqType={"email"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.email}
              />

              <CustomInput
                type={"password"}
                name='password'
                value={password}
                label='Password'
                placeholder={"Enter password"}
                isRequired={true}
                //reqType={"password"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.password}
                helperText='Password must contain one capital latter, number and specical character with at least 8 character long.'
              />
              <Row xs='2'>
              <Button color='danger' onClick={onCancel}>
                Cancel
              </Button>
              <Button color='primary' onClick={onSubmit}>
                Submit
              </Button>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    );
};

export default Registration; 