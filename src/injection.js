// Variable initialization.
const exerciseDiv = document.getElementById('exercise');
const shieldButtsDiv = document.createElement('div');
const shieldGottenText = document.createElement('h3');
const shields = [createShieldButt(1), createShieldButt(2), createShieldButt(3), createShieldButt(4)];

// Styling.
shieldButtsDiv.style.display = 'flex';
shieldButtsDiv.style.justifyContent = 'center';
shieldGottenText.innerHTML = 'Štít připsán. Radši už dál ve cvičení nepokračuj než obnovíš stránku, mohlo by se to resetovat :D';
shieldGottenText.style.textAlign = 'center';
shieldGottenText.style.visibility = 'hidden';

const colors = ['gray', 'orange', 'lightGreen', "green"];
for (let i = 0; i < shields.length; ++i) {
	shields[i].style.padding = '3em';
	shields[i].style.cursor = 'pointer';
	shields[i].style.margin = 'auto';
	shields[i].style.display = 'inline';
	shields[i].style.padding = '0.5em 3em';
	shields[i].style.border = '0.16em solid black';
	shields[i].style.margin = '0 0.3em 0.3em 0';
	shields[i].style.boxSizing = 'border-box';
	shields[i].style.textDecoration = 'none';
	shields[i].style.textTransform = 'uppercase';
	shields[i].style.fontFamily = 'Roboto, sand-serif';
	shields[i].style.fontWeight = '400';
	shields[i].style.color = 'black';
	shields[i].style.textAlign = 'center';
	shields[i].style.transition = 'all 0s';
	shields[i].style.height = '4em';
	shields[i].style.transition = 'all 0.4s';
	shields[i].addEventListener('mouseenter', () => {
		shields[i].style.backgroundColor = 'black';
		shields[i].style.borderBottom = '0.5em solid ' + colors[i];
		shields[i].style.color = 'white';
	});
	shields[i].addEventListener('mouseleave', () => {
		shields[i].style.backgroundColor = 'transparent'
		shields[i].style.borderBottom = '0.16em solid black';
		shields[i].style.color = 'black';
	});
	/*
	let id = null;
	let alpha = 1;
	
	setTimeout(() => {
		id = setInterval(() => {
			shields[i].style.backgroundColor = `rgba(255, 0, 0, ${alpha})`;
			alpha -= 0.013;
			if (alpha <= 0.05) {
				clearInterval(id);
				shields[i].style.backgroundColor = 'transparent';
				shields[i].style.transition = 'all 0.4s';
			}
		}, 10);
	}, 200);
	*/
	shieldButtsDiv.appendChild(shields[i]);
}

// Logic.
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertOnTop(node) {
	document.getElementById('content').prepend(node);
}



//insertOnTop(shieldGottenText);
//insertOnTop(shieldButtsDiv);
insertAfter(exerciseDiv, shieldButtsDiv);
insertAfter(shieldButtsDiv, shieldGottenText);
shieldButtsDiv.scrollIntoView({ block: 'end',  behavior: 'smooth' });
document.addEventListener('contextmenu', event => {
	event.preventDefault();
	return false;
});

['keydown', 'keyup'].forEach(() => {
	document.addEventListener("keydown", e => {
  		if (e.key == "Shift" || e.key == "Control" || e.key == "Ctrl" || e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 123) {
    		e.preventDefault;
    		return false;
  		}
	});
})

// Override the default hoverGap, because it interferes with our hack, so fuck it.
function hoverGap(el){}

function createShieldButt(level) {
	const shield = document.createElement('button');
	shield.innerHTML = 'Získat štít ' + level;
	shield.addEventListener('click', () => {
		getShield(level);
		for (let i = 0; i < shields.length; ++i){
			shields[i].disabled = true;
			shields[i].style.cursor = 'default';
		}
	});
	return shield;
}

function getShield(level) {
	const levelValue = window['skillLevel' + level];
	var data = {
          exercise: exercise,
          ps: ps,
          user: user,
          skill: levelValue,
          cookieHash: cookieHash,
          inRow: 21,
          homework: homework, 
          familyHomework: familyHomework, 
          responseMasteryTime: 102611,
          masteryAttempts: 49,
          bufferedAttempts: bufferedAttempts,
          deviceType: deviceType,
          source: source
    }

    var obj = JSON.stringify(data);  
    var dataEncoded = btoa(obj);
    
    $.ajax({
    	url: '/ajax/skillInRowLog.php',
    	type: 'POST',
    	data: { data: dataEncoded }
    });

	updateBar(levelValue);
	skill = levelValue;
    shieldGottenText.style.visibility = 'visible';
}

function modifyLevelClass(elemIds, level) {
	for (let i = 0; i < 5; ++i)
		for (let k = 0; k < elemIds.length; ++k) {
			let elem = document.getElementById(elemIds[k]);
			elem.classList.remove('level' + i);
			elem.classList.add('level' + level);
		}
}

switch (exercise) {
	case '5':
		setUpRozborVet();
		break;
	case '23':
		setUpPexesoSolving(); 
		break;
	case '26':
	case '41':
	case '19':
		setUpAnswerHighlighting();
		break;
	case '4':
		setUpGapHighlighting();
		break;
	case '11':
		setUpConnecting();
}

function setUpRozborVet() {
const nextButts = document.getElementsByClassName('next');
	for (let i = 0; i < nextButts.length; ++i)
		nextButts[i].addEventListener('click', () => setTimeout(() => solveRozborVet(), 800));
	solveRozborVet();
}

function setUpPexesoSolving() {
	const nextButts = document.getElementsByClassName('next');
	for (let i = 0; i < nextButts.length; ++i)
		nextButts[i].addEventListener('click', () => setTimeout(() => solvePexeso(), 800));
	solvePexeso();
}

function setUpConnecting() {
	const nextButts = document.getElementsByClassName('next');
	for (let i = 0; i < nextButts.length; ++i)
		nextButts[i].addEventListener('click', () => setTimeout(() => connectCorrectWords(), 800));
	connectCorrectWords();
}

function setUpGapHighlighting() {
	document.getElementById('gap0').classList.remove('hovered');
	document.getElementById('next').addEventListener('click', () => setTimeout(() => highlightCorrectGaps(), 500));
	highlightCorrectGaps();
}

function setUpAnswerHighlighting() {
	document.addEventListener('click', () => setTimeout(() => highlightCorrectOption(), 500));
	highlightCorrectOption();
}

function solveRozborVet() {
	for (let i = 0; i < correctCategories.length; ++i) {
		let category = correctCategories[i];
		if (category == 'nope')
			continue;

		let marker = $(".marker[category='" + category + "']");
		let chunk = $('.chunk').eq(i);

		if (!marker.classList.contains('selectedMarker'))
			marker.click();
		chunk.click();
		marker.click();
	}
}

function solvePexeso() {
	const pexesoCards = document.getElementsByClassName('card');
	for (let i = 0; i < pexesoCards.length; ++i) {
		for (let k = 0; k < pexesoCards.length; ++k) {
			if (pexesoCards[i].getAttribute('pair') == pexesoCards[k].getAttribute('pair')) {
				pexesoCards[i].click();
				pexesoCards[k].click();
			}
		}
	}
}

function highlightCorrectGaps() {
	const gaps = document.getElementsByClassName('gap');
	for(let i = 0; i < gaps.length; i++)
		if (gaps[i].getAttribute('correct') == '1')
			gaps[i].click();
}

function connectCorrectWords() {
	document.getElementById('solution').click();
}

function highlightCorrectOption() {
	let correctElement;

	// New method that they use.
	if (typeof questions !== 'undefined' && questions[questionOffset].options != undefined) {
		let correctOption = (questions[questionOffset].options[0].correct == 1 ? '0' : '1');
		correctElement = document.getElementById('option' + correctOption);
	}
	// Old method.
	else {
		correctElement = $('[correct=1]')[0];
	}
	correctElement.style.color = 'green';
	correctElement.style.border = '3px green solid';
}

/*
function addCorrectAnswerDirectly() {
		responseTime = Math.floor(Math.random() * (10000 - 1000)) + 1000;
		++inRow;

		processSkillUpdate('correct', responseTime);
		logAnswer(questions[questionOffset++].id, '', 1, responseTime);
}
*/