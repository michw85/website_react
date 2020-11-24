const e = React.createElement; // Псевдоним

class Book extends React.Component {
			constructor(props){
				super(props);
				this.state = {books:[]};
				this.click1 = this.click1.bind(this);
				//this.click2 = this.click2.bind(this);
				this.handleClick = this.handleClick.bind(this);
			}
			
			click1(){
				// this.setState({cnt: this.state.books[3]})
				fetch("/api/books/2")
				.then(r=>r.json())
				.then(b=>{this.setState({books:this.state.books.concat(b)})});

		
			}
			// click2(){
				 // this.setState({this.state.books.map(x=> e('label', x.title, null)}
				
			// }
			
			handleClick(e) {
				console.log(e.target.attributes["data-id"].value)
					//window.location="/details.html?b="+e.target.getAttribute("data").value;
					switch(e.target.attributes["data-id"].value){
						case "1":
							window.location='https://librebook.me/sobache_serdce';
						break;
						case "2":
							window.location='https://librebook.me/voina_i_mir';
						break;
						case "3":
							window.location='https://librebook.me/taras_bulba';
						break;
						case "4":
							window.location='https://mybook.ru/author/nikolaj-vasilevich-gogol/vij-2/read/';
						break;
						default:
						break;
				}
			}
			
			componentDidMount(){	// Событие размещения
				fetch("/api/books/1")
				.then(r=>r.json())
				.then(b=>{this.setState({books:b})});
			}			
			render(){
				/*return e('div', {className:"book-div"},
					e('img',{src:"/cover/"+x.Cover_file},null))
				)*/
				return <div>
				{this.state.books.map(x=>
				<img onClick={this.handleClick} src={"/cover/"+x.Cover_file} data-id={x.id}/>
				//<img onClick={this.click2} src={"/cover/"+x.Cover_file}/>
				)}
				<button onClick={this.click1} className="btn btn-primary"> Ещё</button> 
				
				</div>;
			}
		}
		ReactDOM.render(e(Book, {}, null), document.getElementById("library"));
		// ReactDOM.render(<Book/>, document.getElementById("library"));