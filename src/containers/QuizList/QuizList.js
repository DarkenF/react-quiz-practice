import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import classes from './QuizList.module.scss'
import axios from 'axios'

export default class QuizList extends Component{

    state = {
        quizes: []
    }

    renderQuizes(){

        return this.state.quizes.map(quiz => {
            return(
                <li
                    key={quiz.id}
                >
                    {/*После уквазания в адресе quiz.id мы сможем его забрать на странице в переходе*/}
                    {/*и отгрузить данные по этому id*/}
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-practice-q.firebaseio.com/quiz/quizes.json')

            const quizes = []

            Object.keys(response.data).forEach( (key, index) =>{

                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })



            this.setState({
                quizes
            })

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Cписок тестов</h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>


            </div>
        );
    }

}
