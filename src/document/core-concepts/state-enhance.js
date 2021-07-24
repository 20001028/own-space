/*
    状态提升
    通常，多个组件需要反映相同的变化数据，将共享状态提升到最近的共同父组件中
*/

import { createElement } from "../utils/common";

const BoilingVerdict = function (props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
};

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: "" };
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input value={temperature} onChange={this.handleChange}></input>
                <BoilingVerdict celsius={parseFloat(temperature)}></BoilingVerdict>
            </fieldset>
        );
    }
}

ReactDOM.render(<Calculator></Calculator>, createElement("div", "caculator"));

/*
    添加第二个输入框
    在已有摄氏温度输入框的基础上，提供华氏度的输入框，保持两个输入框同步
*/
const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit",
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: "" };
    }

    handleChange(e) {
        this.setState({
            temperature: e.target.value,
        });
    }
    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator2 extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c"></TemperatureInput>
                <TemperatureInput scale="f"></TemperatureInput>
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator2></Calculator2>,
    createElement("div", "caculator2")
);

/*
    编写转换函数
*/

const toCelsius = function (fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = function (celsius) {
    return (celsius * 9) / 5 + 32;
};

const tryConvert = function (temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) return "";
    const output = convert(input);
    const round = Math.round(output * 1000) / 1000;
    return round.toString();
};

/*
    状态提升
    在React中，将多个组件需要共享的state向上移动到它们的最近共同父组件中，可实现共享state
*/

class TemperatureInput2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // 当要修改temperature时，调用父组件的方法进行修改
        // 同样onTemperatureChange由父组件进行控制
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        // 将temperature和scale交给父组件控制
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator3 extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFarhrenheitChange = this.handleFarhrenheitChange.bind(this);
        this.state = { temperature: "", scale: "c" };
    }
    handleCelsiusChange(temperature) {
        this.setState({ scale: "c", temperature });
    }
    handleFarhrenheitChange(temperature) {
        this.setState({ scale: "f", temperature });
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius =
            scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit =
            scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput2
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput2
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFarhrenheitChange}
                />
                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator3></Calculator3>,
    createElement('div','caculator3')
);