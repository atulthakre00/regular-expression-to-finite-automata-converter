function regExToFAGUI(){
	var titleH2 = document.createElement("h2");
	titleH2.innerHTML = "Regular Expression To Finite Automata Converter";
	document.body.appendChild(titleH2);
	var t1Para = document.createElement("p");
	t1Para.innerHTML = "Enter Regular Expression";
	var t2Input = document.createElement("input");
	t2Input.setAttribute("name","regExp");
	t2Input.setAttribute("type","text");
	t2Input.setAttribute("value","Regular Expression");
	document.body.appendChild(t2Input);

}




class State{
	constructor(a){ 
		this.name = a;// a is name of state
		this.transitions = new Object();//transition from this state to other states
		this.isFinal = false; // If this state is final state, it is set to true
	}
	//If state name is "Q0" then it returns 0 in integer as state number
	getStateNumber(){
		var temp  = this.name.slice(1,this.name.length);
		return(parseInt(temp));
	}
}

class FA{
	constructor(n,ip){
		this.nStates = n; //no. of states
		this.stateHolder = new Array();//array of all states in FA
		this.inputs = ip; // array of all input variables
		this.nInputs = ip.length; //no. of input variables
		this.initialState = null; //reference of initial object
		this.currentState = null; //reference to current State of Automata 
	}
	statesMaker(initial,finalStates){ // creates objects of states and adds it to stateHolder Array
		var i;
		for(i=0;i<(this.nStates);i++){
			var tempAA = "Q".concat(i.toString(10));
			this.stateHolder.push(new State(tempAA));
		}
		//This sets initial state
		this.initialState = this.stateHolder[initial];
		//This sets final State
		var temp = finalStates.length;
		for(i=0;i<temp;i++){
			this.stateHolder[finalStates[i]].isFinal = true;
		}
	}
	printStates(){ //temporary function to see states of FA, this will be removed once GUI is made
		var text = "";
		var i;
		for(i=0;i<this.nStates;i++){
			text = text.concat(" ");
			text = text.concat(this.stateHolder[i].name);
		}
		//alert(text);
	}
	// Link different states of automata using transition matrix given as parameter T
	setTransition(T){ 
		for(var i=0;i<this.nStates;i++){
			for(var j=0;j<this.nInputs;j++){
				this.stateHolder[i].transitions[this.inputs[j]] = new Array();
				for(var k=0;k<T[i][j].length;k++){
					if(T[i][j][k] == -1){
						this.stateHolder[i].transitions[this.inputs[j]].push(null);
					}
					else{
						this.stateHolder[i].transitions[this.inputs[j]].push(this.stateHolder[T[i][j][k]]);
					}
				}
			}
		}
		
	}
	// Temporary function to print transition table of the FA, it will be removed once GUI is made
	printTransitionTable(printConsole){
		var text = "";
		for(var i=0;i<this.nStates;i++){
			if(this.stateHolder[i].isFinal)
				text = text.concat("*");
			text = text.concat(this.stateHolder[i].name," -> ");
			for(var j=0;j<this.nInputs;j++){
				var t2 = this.stateHolder[i].transitions[this.inputs[j]].length;
				text = text.concat("<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",this.inputs[j]," : ");
				for(var k=0;k<t2;k++){
					var temp = this.stateHolder[i].transitions[this.inputs[j]][k];
					if(temp == null)
						text = text.concat("NULL ");
					else
						text = text.concat(temp.name," ");
				}
			}
			text = text.concat("<br/>");
		}
		text = text.concat("<br/>Alphabets:<br/>",this.inputs);
		var para = document.getElementById(printConsole);
		para.innerHTML = text;
	}
}

// calculates epsilon closure of a state and returns array of states belonging to eps closure
function epsClosure(inpFA,stateQ){
	
	var visited = new Array(inpFA.nStates).fill(0);
	var epsSet = new Array();
	var Queue = new Array();
	Queue.push(stateQ);

	visited[stateQ.getStateNumber()] = 1;
	while(Queue.length != 0){
		var x = Queue.shift();
		epsSet.push(x);
		var j = 0;
		while(j<x.transitions["epsilon"].length){
			var ttA = x.transitions["epsilon"];
			if(ttA[j] == null)
				break;
			if (visited[ttA[j].getStateNumber()] != 1){
				visited[ttA[j].getStateNumber()] = 1;
				Queue.push(x.transitions["epsilon"][j]);
			}
			j = j + 1;
		}
	}
	return(epsSet);

}

//returns an array consisting of eps. closure of all states in the automata
function epsCalculator(inpFA){
	var epsMatrix = new Array(inpFA.nStates);
	for(var i=0;i<inpFA.nStates;i++){
		epsMatrix[i] = epsClosure(inpFA,inpFA.stateHolder[i]);
	}
	return(epsMatrix);
}

//This is the main algorithm of conversion of NFA with eps to NFA without eps
function convertNFA(inpFA,T){
	// Removes Epsilon from input symbols for new NFA
	var tempInitial = inpFA.inputs.slice(0,inpFA.nInputs);
	//alert("Inside Convert NFA");
	var opFA = new FA(inpFA.nStates,tempInitial);
	var t2 = new Array();
	for(var i=0;i<inpFA.nStates;i++){
		if(inpFA.stateHolder[i].isFinal){
			t2.push(inpFA.stateHolder[i].getStateNumber());
		}
	}
	opFA.statesMaker(inpFA.initialState.getStateNumber(),t2);
	opFA.setTransition(T);
	var epsMatrix = epsCalculator(opFA);
	for(var i=0;i<opFA.nStates;i++){
		if(opFA.stateHolder[i].isFinal){
			if(epsMatrix[0].indexOf(opFA.stateHolder[i]) != -1){
				opFA.initialState.isFinal = true;
				break;
			}
		}
	}
	for(var i=0;i<opFA.nStates;i++){
		var t8 = opFA.nInputs;
		for(var j=0;j<t8;j++){
			var y = new Set();
			var t9 = epsMatrix[i].length;
			for(var k=0;k<t9;k++){
				var tA = opFA.stateHolder[epsMatrix[i][k].getStateNumber()].transitions[opFA.inputs[j]];
				//console.log(tA);
				if(opFA.inputs[j] != "epsilon"){
					if(tA != null && tA[0] != null){
						tA.forEach(y.add,y);

					}
				}
			}
			y = Array.from(y);
			//console.log(y)
			var tb = y.length;
			//alert(tb);
			var z = new Set();
			if(y[0] == null){
				tb = 0;
				z.add(null);
			}
			
			for(var p=0;p<tb;p++){
				epsMatrix[y[p].getStateNumber()].forEach(z.add,z);
			}
			opFA.stateHolder[i].transitions[opFA.inputs[j]] = Array.from(z);
		}
	}

	for(var i=0;i<opFA.nStates;i++){
		delete opFA.stateHolder[i].transitions['epsilon'];
	}
	opFA.inputs.pop("epsilon");
	opFA.nInputs = opFA.nInputs - 1;
	//console.log(opFA);
	return(opFA);

}

var numStates,numInputs,inputSymbols;

function cont(){
	numStates = document.getElementsByName("nState")[0].value;
	numInputs = document.getElementsByName("nInputs")[0].value;
	inputSymbols = document.getElementsByName("inputSymbols")[0].value.split(",");
	document.getElementById("formI").remove();
	var hs = "";
	for(var i = 0; i < numInputs;i++){
		hs += "<span class='spanLabel'>" + inputSymbols[i] + "</span>" ; 
	}
	//console.log(hs);
	var formNewI = document.createElement("div");
	formNewI.innerHTML = hs;
	
	formNewI.appendChild(document.createElement("br"));
	for(var i = 0; i < numStates;i++){
		var z = document.createElement("span");
		z.innerHTML = "Q" + i;
		z.setAttribute("class","rowLabel");
		formNewI.appendChild(z);
		for(var j = 0; j < numInputs;j++){
			var it = document.createElement("input");
			it.setAttribute("type","text");
			it.setAttribute("name","transQ" + j);
			it.setAttribute("class","textQ");
		
			formNewI.appendChild(it);
		}
		var tbr = document.createElement("br");
		formNewI.appendChild(tbr);
		tbr = document.createElement("br");
		formNewI.appendChild(tbr);
	}
	var z = document.createElement("span");
	z.innerHTML = "Final States: &nbsp; &nbsp; &nbsp;";
	z.setAttribute("class","rowLabel");
	formNewI.appendChild(z);
	var it = document.createElement("input");
	it.setAttribute("type","text");
	it.setAttribute("class","textQ");
	it.name = "finalState";
	formNewI.appendChild(it);
	formNewI.appendChild(document.createElement("br"));
	var u = document.createElement("button");
	u.innerHTML = "Submit";
	u.setAttribute("onclick","return inpToTrans()");
	formNewI.appendChild(u);
	var kt = document.createElement("div");
	kt.setAttribute("class","wrapperO");
	kt.appendChild(formNewI);
	document.getElementsByTagName("body")[0].appendChild(kt);
	return false;
}

function getSelectValues(select) {
  var result = select.split(",");
  for(var i = 0; i<result.length;i++){
  	if(result[i] == "phi")
  		result[i] = -1;
  	else
  		result[i] = parseInt(result[i].trim());
  }
  return result;
}

function inpToTrans(){
	var divHolder1 = document.createElement("div");
	divHolder1.setAttribute("class","divHolder1");
	for(var i=0;i<2;i++){
		var inpDiv = document.createElement("div");
		inpDiv.setAttribute("class","inpDiv");
		var h3I = document.createElement("h3");
		h3I.innerHTML = "NFA With Epsilon";
		var pI = document.createElement("p");
		pI.innerHTML = "HELLO";
		inpDiv.appendChild(h3I);
		inpDiv.appendChild(pI);
		divHolder1.appendChild(inpDiv);
	}
	document.body.appendChild(divHolder1);
	T = []
	for(var i=0;i<numStates;i++){
		var q = document.getElementsByName("transQ" + i);
		L = []
		for(var j=0;j<numInputs;j++){
			L.push(getSelectValues(q[j].value));
		}
		T.push(L);
	}
	console.log(T);
	var q = document.getElementsByName("finalState")[0];
	var F = getSelectValues(q.value);
	console.log(F);
	console.log(inputSymbols);
	var f1 = new FA(numStates,inputSymbols,numInputs); //initializes automata object variables
	f1.statesMaker(0,F); //creates state objects for the automata
	f1.setTransition(T); // sets transition between automata states as entered in matrix T
	/*
	//f1.printTransitionTable("inputTransTable");
	nfa_without_eps = convertNFA(f1,T);
	//nfa_without_eps.printTransitionTable("outputTransTable");
*/
	return false;
}