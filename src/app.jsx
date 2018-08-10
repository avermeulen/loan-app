import React from "react";
import ReactDOM from "react-dom";
import { getInstallment } from "loan-calculations";
import styled from "styled-components";

const Wrapper = styled.div`
    padding-top: 1em;
    background-color: orange;
    width: 80%;
    margin: auto;
    font-family: Arial,sans-serif;
    padding: 1em;
    border-radius: 5px;
    border: 0.1rem solid grey;
`

const InputLabel = styled.div`
    margin: 0em ;
    padding: 0em 0em;
    width: 12em;
    display: inline-block;
    font-weight: bold;
`;

const Input = styled.input`
    margin: 1em;
    padding: 1em;
    border-radius: 3px;
`

const Button = styled.button`
    padding: 1em;
    margin: 1em;
    border-radius: 3px;
`

class LoanInstallment extends React.Component {
    constructor(){
        super();
        this.state = {
            amountDue : 0,
            interestRate : 0.1225,
            numberOfPayments : 0,
            installment : 0
        }
        this.calculate = this.calculate.bind(this);
        this.setValue = this.setValue.bind(this);
        
    }

    calculate(){
        let installment = getInstallment(Number(this.state.amountDue), this.state.interestRate, Number(this.state.numberOfPayments))
        this.setState({
            installment
        });
    }

    setValue(evt){
        let fieldName = evt.target.name;
        let field = {};
        field[fieldName] = evt.target.value;
        this.setState(field);
    }

    valuesEntered() {
        if (this.state.amountDue > 0 && this.state.numberOfPayments > 0){
            return true;
        }
        return false;
    }

    render(){
        return <Wrapper>
            <h1>Loan calculator</h1>
            <div>
                <InputLabel>Interest rate:</InputLabel>
                {this.state.interestRate * 100}
            </div>

            <div>
                <InputLabel>Amount due:</InputLabel>
                <Input type="text" name="amountDue" value={this.state.amountDue} onChange={this.setValue} placeholder="Total loan amount"  />
            </div>
            
            <div>
                <InputLabel>Number of payments: </InputLabel>
                <Input type="text" name="numberOfPayments" value={this.state.numberOfPayments} onChange={this.setValue} placeholder="Number of payments"  />
            </div>
            
            <div>
                <InputLabel></InputLabel>
                <Button onClick={this.calculate} disabled={!this.valuesEntered()} value="Calculate">Calculate</Button>
            </div>

            <div>
                <InputLabel>Monthly installment:</InputLabel>
                R{this.state.installment.toFixed(2)}
            </div>

        </Wrapper>
    }
}

class TheForm extends React.Component {
    constructor(){
        super();
        this.state = {
            firstName : '',
            lastName : '',
            users : []
        };
        this.readProp = this.readProp.bind(this);
    }    

    readProp(evt){
        let fieldName = evt.target.name;
        let state = {};
        state[fieldName] = evt.target.value;
        this.setState(state);
        if (fieldName === 'firstName'){
            this.state.users.push({
                firstName : evt.target.value
            });
        }
    }

    render() {
        return <div>
            
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.readProp} />
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.readProp} />
            
            <span>{this.state.firstName} {this.state.lastName}</span>
            
        </div>
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<LoanInstallment />, mountNode);