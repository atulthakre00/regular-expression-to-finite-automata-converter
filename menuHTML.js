var menu1HTML = '<div class="inputRegExWrapper">		<div class="inputRegEx">			<h2>Regular Expression To Finite Automata Converter</h2>			<p>Enter Regular Expression</p><input name="regExp" type="text" placeholder="Regular Expression"><br/><br/>			<button onclick="return convtRegFA()">Convert To Finite Automata</button>		</div>				<div class="otpFA">			<div class="internalOtp">							</div>			<div class="internalOtp">							</div>			<div class="internalOtp">							</div>		</div>		</div>';


var menu2HTML = '<div class="inpFormWrapper"><div class="inpForm" id="formI">	<h3>Inputs</h3><br/>	<form>		No. Of States : <input name = "nState" type="number" min="0" max="100"required><br/><br/>		No. Of Inputs : <input name="nInputs" type="number" min="0" max="100" required><br/><br/>		Input Symbols : <input name="inputSymbols" type="text"required><br/><br/>		<input type="submit" onclick="return cont(0)" value="Continue">	</form></div></div>';



var menu3HTML = '<div class="inpFormWrapper"><div class="inpForm" id="formI">	<h3>Inputs</h3><br/>	<form>		No. Of States : <input name = "nState" type="number" min="0" max="100"required><br/><br/>		No. Of Inputs : <input name="nInputs" type="number" min="0" max="100" required><br/><br/>		Input Symbols : <input name="inputSymbols" type="text"required><br/><br/>		<input type="submit" onclick="return cont(1)" value="Continue">	</form></div></div>';



var mainMenuHTML = '<div class="mainMenu">			<br/><br/>			<button class="mmB" onclick="return menu1()">Regular Expression To Finite Automata</button><br/><br/>			<button class="mmB"onclick="return menu2()">NFA With Epsilon To NFA</button><br/><br/>			<button class="mmB"onclick="return menu3()">NFA To DFA</button>	<br/><br/></div>';



