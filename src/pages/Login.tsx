import axios from "axios";
import { useState, FC } from "react";
import { useHistory } from "react-router";
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
import { checkValidation, setItemInStorage } from "../helper";
import { useAuth } from '../Hooks/useAuth';


const initailValue = {
  email: "",
  password: "",
};

const Login: FC = () => {
  const history = useHistory();
  const auth = useAuth();

  const [formData, setFormData] = useState(initailValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  interface user {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  }


  const onSubmit = (): void => {
    const { email, password } = formData;
    const validationError = checkValidation(errors, {
      email,
      password,
    });
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
    } else {
      axios.get('https://6094e51894009e00176b5f56.mockapi.io/users')
        .then(res => {
          res.data.forEach((user: user) => {
            if (user.email === email && user.password === password) {
              auth.login()
              setItemInStorage('userId', user.id)
              history.push('/');
            }
          });
        })
        .catch(err => alert(err))

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

  const onRegister = (): void => {
    history.push("/Register")
  }

  const { email, password } = formData;
  return (
    <Container>
      <Row className='h-100vh align-items-center'>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle tag='h4' className='text-primary'>
                Login
              </CardTitle>
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
              <Button color='primary' onClick={onSubmit}>
                Submit
              </Button>
              <Button color="link" onClick={onRegister}>
                Register
              </Button>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
