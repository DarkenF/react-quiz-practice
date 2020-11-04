import React, {Component} from "react";
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'



// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

export default class Auth extends Component{

    state = {
        isFormValid: false,
        formControls:{
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minlength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }
    registerHandler = () => {

    }
    submitHandler = (event) => {
        event.preventDefault();
    }
    validateControl(value, validation){
        if (!validation){
            return true
        }

        let isValid = true

        if (validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email){
            // isValid= validateEmail(value) && isValid
            isValid= is.email(value) && isValid
        }

        if (validation.minlength){
            isValid = value.length >= validation.minlength && isValid
        }

        return isValid
    }

    onChangeHandler= (event, controlName) => {

        // Изменяем состояние state без мутации
        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach( name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs(){
        return  Object.keys(this.state.formControls).map( (controlName,index)=> {
            const control = this.state.formControls[controlName]
            return (
               <Input
                  key={controlName + index}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  label={control.label}
                  errorMessage={control.errorMessage}
                  shouldValidate={!!control.validation}
                  onChange={event => this.onChangeHandler(event, controlName)}
               />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
               <div>
                   <h1>Авторизация</h1>

                   <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                       {
                           this.renderInputs()
                       }

                       <Button
                          type='success'
                          onClick={this.loginHandler}
                          disabled={!this.state.isFormValid}
                       >
                           Войти
                       </Button>
                       <Button
                          type='primary'
                          onClick={this.registerHandler}
                          disabled={!this.state.isFormValid}
                       >
                           Зарегстрироваться
                       </Button>
                   </form>
               </div>
            </div>
        );
    }

}
