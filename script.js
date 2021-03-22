let dataLinks;
const ERR_MESS = {
    isEmpty: "Can't be empty!"
}

getData('data.php');

$( document ).ready(function() {
    let inputForm = document.getElementById('subject'),
        errMess = document.getElementById('err-mess');
    inputForm.value = "";
    $("#send").click(
		function(){ 
            if (inputForm.value !== '') {
                errMess.innerText = '';
                inputForm.style.backgroundColor = "cornsilk";
                sendForm('subject', 'action.php');
            } else {
                inputForm.style.backgroundColor = "#ffdcdc";
                errMess.innerText = ERR_MESS.isEmpty;
            }
             
			return false;
		}
	);
});
 
function sendForm(ajax_form, url) {
    let inputForm = document.getElementById('subject');
    $.ajax({
        url:     url,
        type:     "POST",
        dataType: "html",
        data: $("#"+ajax_form).serialize(),
        success: function(response) {
            result = $.parseJSON(response);
            console.log(result);
            inputForm.value = renderElem(result);
            inputForm.style.backgroundColor = "#f2ffdc";
            document.getElementById('send').innerText = "Ready!";
            setTimeout(() => {
                document.getElementById('send').innerText = "GEN";
            }, 3000);
    	},
        error: function(response) {
            console.log(response);
    	}
 	});
}

function getData(url) {
    $.ajax({
        url:     url,
        type:     "GET",
        dataType: "html",
        success: function(response) {
            result = JSON.parse(response);
            console.log(result);
            dataLinks = result;
            renderResult(result);
            redirect(result);
    	},
        error: function(response) {
            console.log(response);
    	}
 	});
}

function sendStatistics(data, url) {
    $.ajax({
        url:     url,
        type:     "POST",
        dataType: "html",
        data: data,
        success: function(response) {
            console.log(response);
            result = JSON.parse(response);
            window.location.href = result;
    	},
        error: function(response) {
            console.log(response);
    	}
 	});
}

function renderResult(data) {
    for (const key in data) {
        let obj = data[key];
        for (const key in obj) {
            let resultList = document.getElementById('result_form');
            if (key === 'clicks') {
                let span = document.createElement('span');
                span.innerHTML = "  ▶  " + obj[key] + " clicks";
                resultList.appendChild(span);
            } else {
                let element = document.createElement('p'),
                    br = document.createElement('br');
                element.innerHTML = obj[key];
                resultList.appendChild(br);
                resultList.appendChild(element);
            }
        }
    }   
}

function renderElem(obj) {
    let elem;
    for (const key in obj) {
        elem = obj[key];
        return elem;
    }
}

function redirect(obj) {
    let url = document.location.href;
    for (const key in obj) {
        let object = obj[key];
        for (const key in object) {
            if (object[key] === url) {
                object['clicks'] = ++object['clicks'];
                sendStatistics(object, "statistics.php");
            }
        }
    }
}