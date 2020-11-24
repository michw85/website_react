class Hello extends React.Component {
    render() {
        return React.createElement('h2', {}, "Hello world!");
    }
}

ReactDOM.render(React.createElement(Hello, {}, null), document.getElementById("container1"));
// Container 2
const e = React.createElement; // Псевдоним
class Elem2 extends React.Component {
    render() {
        // return e("ul",{className:"ul-class"},e("li",{style:{color:"red","fontSize":"32vw",}},"Item 1"),e("li",null,"Item 2"),e("li",null,"Item 3"),)  // 1-е: Имя тега, 2-е: Имя класса в css файле , 3-е: Дочернее элементы
        return e("ol", null, ['a', 'b', 'c', 'd'].map(x => e( // map Массив
            'li', {key: x}, x
        )));
    }
}

ReactDOM.render(e(Elem2, null, null), document.getElementById("container2"));

// Container 3
class Cont4 extends React.Component {
    constructor(props) {
        super(props);
        this.click1 = this.click1.bind(this);
        this.state = {data: 0}
    }

    click1() {
        this.setState({data: this.state.data + 1});
        console.log("Click 1 detected")
    }

    render() {
        return e('div', {},
            e('button', {onClick: this.click1}, "Press"),
            e("h3", null, this.state.data)
        );
    }
}

ReactDOM.render(e(Cont4,{}, null), document.getElementById("container3"));

// Container 4
class Cont5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //объект
            data: [],
            cnt:0
        };
        this.click2 = this.click2.bind(this);
    }

    click2() {
        // this.state.data.push({txt: "new element"});
        this.state.cnt++;
        this.state.data.push({id:this.state.cnt,txt:"new "+ this.state.cnt});
        this.setState( this.state );
    }

    render() {
        return e('div', {},
            e('button', {onClick: this.click2}, "Add"),
            this.state.data.map(x => e("h4", {key:x.id}, x.txt))
        )
    }
}
ReactDOM.render(e(Cont5, {}, null), document.getElementById("container4"));


