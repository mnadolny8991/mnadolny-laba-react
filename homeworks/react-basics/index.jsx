function Head() {
    return <div className="head"></div>
}

function LightsContainer({ children }) {
    return <div className="container">{children}</div>
}

function Light({ color }) {
    return <div className="light" style={{ backgroundColor: color }}></div>
}

function TrafficLights({ color }) {
    return (
    <div className="wrapper">
        <LightsContainer>
            <Head />
            <Light color={color === 'red' && '#DF4040'}/>
            <Light color={color === 'yellow' && '#E9EC6A'}/>
            <Light color={color === 'green' && '#04CA00'}/>
        </LightsContainer>
    </div>);
}

const element2 = <h1>Hello From JSX</h1>;
const domContainer = document.querySelector('#root_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<TrafficLights color='red' />);