// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
	    let average = calculate();
            alert('معدل شما:'+ average);
            
      }
    }
  );
// ashkantaravati.ir
function calculate(){
    let n_table = document.getElementById('ctl00_ContentPlaceHolder1_grdWorkBook');
let n_tbody=n_table.tBodies[0];
let n_trows=n_tbody.children;
let n_total=n_trows.length;
let n_scores = new Array(n_total);
let n_vaheds = new Array(n_total);
for (let i=1;i<n_trows.length;i++){
    let n_fields=n_trows[i].children;
    let n_theoVahed=parseInt(n_fields[3].innerText);
	let n_amalVahed=parseInt(n_fields[4].innerText);
	let n_totalVahed=n_theoVahed+n_amalVahed;
	let n_score=parseInt(n_fields[9].innerText);
	n_scores[i]=n_score;
    n_vaheds[i]=n_totalVahed;
}
let n_totalVahed=0;
for (let i=1;i<n_total;i++)
{
    if (isNaN(n_scores[i])) continue;
    n_totalVahed += n_vaheds[i];

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
return res;
}
