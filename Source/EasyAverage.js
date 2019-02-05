//pageLoad is a function fired by asp.net after page requests finished.
function pageLoad(){
	showAvarageOnTable();
}
//We need to export it because of firefox xray (It is content script and pageLoad is pagescript)
exportFunction(pageLoad, window, {defineAs:'pageLoad'});

// ashkantaravati.ir
//Editted by m4hdyar, Adding a row below table to show average , sum of units and etc...
function showAvarageOnTable(){
	//Calling calculate function and getting result
	result=calculate();
	// Getting table to edit it
	let n_table = document.getElementById('ctl00_ContentPlaceHolder1_grdWorkBook');
	//Return if table is not loaded yet
	if(n_table == null) return;
	// Getting body
	let n_tbody=n_table.tBodies[0];
	let n_trows=n_tbody.children;
	//finding last row and check if we get avarage of it in the past
	let n_fields=n_trows[n_trows.length-1].children;
	if(n_fields[0].innerText==="0"){return false}
	
	let newRow   = n_tbody.insertRow(n_tbody.rows.length);
	if(n_tbody.rows.length % 2 == 0){ 
		newRow.classList.add("GridViewRow");
	}else{
		newRow.classList.add("GridViewAlternatingRow");
	}
	//Some of these variables are extra (Maybe we need them in future)
	//Moshakhase
	let moshakhaseText = document.createTextNode('0');
	let moshakhaseCell  = newRow.insertCell(0);
	moshakhaseCell.appendChild(moshakhaseText);
	//Name
	let nameText = document.createTextNode('معدل');
	let nameCell  = newRow.insertCell(1);
	nameCell.appendChild(nameText);
	//Teacher
	let TeacherText = document.createTextNode(' ');
	let TeacherCell  = newRow.insertCell(2);
	TeacherCell.appendChild(TeacherText);
	//Total theoretical units
	let theoreticalText = document.createTextNode(result[0]);
	let theoreticalCell  = newRow.insertCell(3);
	theoreticalCell.appendChild(theoreticalText);
	//Total practical units
	let practicalText = document.createTextNode(result[1]);
	let practicalCell  = newRow.insertCell(4);
	practicalCell.appendChild(practicalText);
	//starte eteraz
	let sEterazText = document.createTextNode(' ');
	let sEterazCell  = newRow.insertCell(5);
	sEterazCell.appendChild(sEterazText);
	//payane eteraz
	let payanText = document.createTextNode(' ');
	let payanCell  = newRow.insertCell(6);
	payanCell.appendChild(payanText);
	//Theoretical Score
	let tScoreText = document.createTextNode(' ');
	let tScoreCell  = newRow.insertCell(7);
	tScoreCell.appendChild(tScoreText);
	//Practical Score
	let pScoreText = document.createTextNode(' ');
	let pScoreCell  = newRow.insertCell(8);
	pScoreCell.appendChild(pScoreText);
	//Score (We will add avarage to this cell) unit
	let scoreText = document.createTextNode(result[2]);
	let scoreCell  = newRow.insertCell(9);
	scoreCell.appendChild(scoreText);
	//eteraz 
	let eterazText = document.createTextNode(' ');
	let eterazCell  = newRow.insertCell(10);
	eterazCell.appendChild(eterazText);
	//vaziyat  (Mashroot,Pass,Moadel Alef)
	//Let's start with A+ :))
	let vaziyatText = document.createTextNode('وضعیت فعلی : معدل الف');
	if(result[2] >= 12 && result[2] < 17){
		vaziyatText = document.createTextNode('وضعیت فعلی : پاس');
	}else if (result[2] < 12){
		vaziyatText = document.createTextNode('وضعیت فعلی : مشروط');
	}
	let vaziyatCell  = newRow.insertCell(11);
	vaziyatCell.appendChild(vaziyatText);
	//dokme sabte etera
	let dokmeText = document.createTextNode(' ');
	let dokmeCell  = newRow.insertCell(12);
	dokmeCell.appendChild(dokmeText);
	//natije eteraz
	let natijeText = document.createTextNode(' ');
	let natijeCell  = newRow.insertCell(13);
	natijeCell.appendChild(natijeText);
	return true;
}

function calculate(){
    let n_table = document.getElementById('ctl00_ContentPlaceHolder1_grdWorkBook');
	//Return if table is not loaded yet to prevent TypeError: n_table is null.
	if(n_table == null) return;
	let n_tbody=n_table.tBodies[0];
	let n_trows=n_tbody.children;
	let n_total=n_trows.length;
	let n_scores = new Array(n_total);
	let n_vaheds = new Array(n_total);
	let n_amalVaheds = new Array(n_total);
	let n_theoVaheds = new Array(n_total);
	for (let i=1;i<n_trows.length;i++){
		let n_fields=n_trows[i].children;
		//Counting total theoretical and practical units
		n_theoVaheds[i]=parseInt(n_fields[3].innerText);
		n_amalVaheds[i]=parseInt(n_fields[4].innerText);
		
		//Score needs to be parsed as float not int...
		let n_score=parseFloat(n_fields[9].innerText);
		//Let bela asar comes in :)))
		if( n_score <10){
			n_score = 0;
			n_amalVaheds[i]=0;
			n_theoVaheds[i]=0;
		}
		n_scores[i]=n_score;
		
		//Adding vaheds (!!) Pay attentiSome courses have both practical units and theoretical units
		n_vaheds[i]=n_amalVaheds[i]+n_theoVaheds[i];
		
	}
	let n_totalVahed=0;
	let n_totalAmalVahed=0;
	let n_totalTheoVahed=0;
	for (let i=1;i<n_total;i++)
	{
		if (isNaN(n_scores[i])) continue;
		//calculating Total units :
		n_totalVahed += n_vaheds[i];
		n_totalAmalVahed += n_amalVaheds[i];
		n_totalTheoVahed += n_theoVaheds[i];		
	}
	
	
	let n_avg=0.0;
	let n_totalScoreVahed=0;
	for (let i=1;i<n_total;i++)
	{
		if (isNaN(n_scores[i])) continue;
		n_totalScoreVahed += (n_scores[i] * n_vaheds[i]);
	}

	n_avg=n_totalScoreVahed/n_totalVahed;
	let rounded_avg = n_avg * 100;
	rounded_avg = Math.round(rounded_avg);
	let res = rounded_avg /100;
	return [n_totalTheoVahed,n_totalAmalVahed,res];
}
