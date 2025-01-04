import { analytics, logEvent } from './firebase.js';

window.onload = function() {
    loadFromLocalStorage(); // ローカルストレージからデータを読み込む
    // logEvent(analytics, 'page_view');
};

window.setSubject = setSubject;
window.reset = reset;
window.addSubjectInput = addSubjectInput;
window.calculate = calculate;
window.removeSubjectDiv = removeSubjectDiv;

function getSubjectCount() {
    // 現在の科目数を取得
    const subjectInputs = document.getElementById('autumn_subject');
    return subjectInputs.children.length;
}

function reset(){
    if (confirm("科目の情報がすべてリセットされます。よろしいですか？")) {
        const subjectInputs = document.getElementById('autumn_subject');
        while (subjectInputs.firstChild) {
            subjectInputs.removeChild(subjectInputs.firstChild);
        };
        
        if(document.querySelector(`input[name="language"]:checked`)){
            document.querySelector(`input[name="language"]:checked`).checked = false;
        }
        if(document.querySelector(`input[name="gakumon"]:checked`)){
            document.querySelector(`input[name="gakumon"]:checked`).checked = false;
        }


        document.getElementById('springGpaInput').value = "";
        document.getElementById('springTotalDegreeInput').value = "";
        localStorage.clear();
        calculate();
    }
}

function setSubject() {
    const subjectInputs = document.getElementById('autumn_subject');
    while (subjectInputs.firstChild) {
        subjectInputs.removeChild(subjectInputs.firstChild);
    };

    let selectedLanguageIndex = 0;
    if (document.querySelector(`input[name="language"]:checked`)){
        selectedLanguageIndex = document.querySelector(`input[name="language"]:checked`).value;
    }

    // console.log(selectedLanguageIndex);
    const languageList=["第二外国語", "中国語", "フランス語", "ドイツ語", "朝鮮語", "ロシア語"];

    const defaultSubjects = [
        [`${languageList[selectedLanguageIndex]} 1`, `${languageList[selectedLanguageIndex]} 2`, `${languageList[selectedLanguageIndex]} 3`, `${languageList[selectedLanguageIndex]} 4`, "英語 2", "物理学 D" , "化学 B", "数学 1B", "数学 2B"],
        [`${languageList[selectedLanguageIndex]} 1`, `${languageList[selectedLanguageIndex]} 2`, `${languageList[selectedLanguageIndex]} 3`, `${languageList[selectedLanguageIndex]} 4`, "英語 2", "物理学 D" , "化学 B", "数学 1B", "数学 2B"],
        [`${languageList[selectedLanguageIndex]} 1`, `${languageList[selectedLanguageIndex]} 2`, `${languageList[selectedLanguageIndex]} 3`, `${languageList[selectedLanguageIndex]} 4`, "英語 2", "物理学 D" , "化学 B", "数学 2B", "数学 3B"],
        [`${languageList[selectedLanguageIndex]} 1`, `${languageList[selectedLanguageIndex]} 2`, `${languageList[selectedLanguageIndex]} 3`, `${languageList[selectedLanguageIndex]} 4`, "英語 2", "物理学 D" , "化学 B", "数学 1B", "数学 2B"],
        [`${languageList[selectedLanguageIndex]} 1`, `${languageList[selectedLanguageIndex]} 2`, `${languageList[selectedLanguageIndex]} 3`, `${languageList[selectedLanguageIndex]} 4`, "英語 2", "物理学 D" , "化学 C", "化学 D", "数学 1B"],
    ];

    if(document.querySelector(`input[name="gakumon"]:checked`)){
        const gakumonIndex = document.querySelector(`input[name="gakumon"]:checked`).value;
        for (let i = 0; i < defaultSubjects[gakumonIndex].length; i++) {
            addSubjectInput(defaultSubjects[gakumonIndex][i]);
        }
    };
}

let subjectIndex = 0;
let subjectIndexList = [];


function addSubjectInput(subjectName="") {
    subjectIndex += 1;
    subjectIndexList[subjectIndexList.length] = subjectIndex;

    const subjectInputs = document.getElementById('autumn_subject');
    const newSubjectDiv = document.createElement('div');

    newSubjectDiv.className = `subject-input-${subjectIndex} subject-div`;
    newSubjectDiv.innerHTML = `
        <button onclick="removeSubjectDiv(${subjectIndex})" class="remove-subject-button">&times;</button>
        <div class="subject-inner-div">
            <p>科目名</p>
            <input type="text" value="${subjectName}" placeholder="ここに入力" list="subjects" class="subject-name-input">
            <datalist id="subjects">
                <option value="数学 1B"></option>
                <option value="数学 2B"></option>
                <option value="数学 3B"></option>
                <option value="物理学 C"></option>
                <option value="物理学 D"></option>
                <option value="化学 B"></option>
                <option value="化学 C"></option>
                <option value="化学 D"></option>
                <option value="理工学概論"></option>
                <option value="生物学序論"></option>
                <option value="自然科学実験"></option>
                <option value="英語リスニング"></option>
                <option value="英語スピーキング"></option>
                <option value="総合教育セミナー"></option>
                <option value="経済学"></option>
                <option value="論理学"></option>
                <option value="倫理学"></option>
                <option value="心理学"></option>
                <option value="法学"></option>
            </datalist>
        </div>
        <div class="subject-inner-div">
            <p>評価</p>
            <div class="subject-radio-group">
                <input type="radio" name="subject-${subjectIndex}" value="4" id="S-${subjectIndex}" oninput="calculate()">
                <label class="subject-label" for="S-${subjectIndex}">S</label>

                <input type="radio" name="subject-${subjectIndex}" value="3" id="A-${subjectIndex}" oninput="calculate()">
                <label class="subject-label" for="A-${subjectIndex}">A</label>

                <input type="radio" name="subject-${subjectIndex}" value="2" id="B-${subjectIndex}" oninput="calculate()">
                <label class="subject-label" for="B-${subjectIndex}">B</label>

                <input type="radio" name="subject-${subjectIndex}" value="1" id="C-${subjectIndex}" oninput="calculate()">
                <label class="subject-label" for="C-${subjectIndex}">C</label>

                <input type="radio" name="subject-${subjectIndex}" value="0" id="D-${subjectIndex}" oninput="calculate()">
                <label class="subject-label" for="D-${subjectIndex}">D</label>
            </div>
        </div>
        <div class="subject-inner-div">
            <p>単位数</p>
            <div class="degree-radio-group">
                <input type="radio" name="degree-count-${subjectIndex}" value="1" id="1-${subjectIndex}" oninput="calculate()">
                <label class="degree-count-label" for="1-${subjectIndex}">1</label>

                <input type="radio" name="degree-count-${subjectIndex}" value="2" id="2-${subjectIndex}" oninput="calculate()" checked> 
                <label class="degree-count-label" for="2-${subjectIndex}">2</label>
            </div>
        </div>`;
    subjectInputs.appendChild(newSubjectDiv);
    requestAnimationFrame(() => {
        newSubjectDiv.classList.add('added');
        calculate();
    });

}

function removeSubjectDiv(subjectIndex) {
    const subjectInputs = document.getElementById('autumn_subject');

    let index = subjectIndexList.indexOf(subjectIndex);
    if (index !== -1) {
        subjectIndexList.splice(index, 1);
    }

    const subjectDiv = document.querySelector(`.subject-input-${subjectIndex}`);
    if (subjectDiv) {
        subjectDiv.classList.add('removing');
        subjectDiv.addEventListener('transitionend', () => {
            subjectInputs.removeChild(subjectDiv);
            calculate();
        }, { once: true });
    }
}

function truncateToTwoDecimals(number) {
    return (Math.floor(number * 100) / 100).toFixed(2);
}

function calculate() {
    const springGPA = document.getElementById('springGpaInput').value;
    const springTotalDegree = document.getElementById('springTotalDegreeInput').value;
    const springGradesTotal = springGPA * springTotalDegree;

    let autumnGradesTotal = 0;
    let autumnTotalDegree = 0;

    subjectIndexList.forEach(i => {
        const gradeValue = document.querySelector(`input[name="subject-${i}"]:checked`);
        const degreeCount = document.querySelector(`input[name="degree-count-${i}"]:checked`);
        if (gradeValue && degreeCount) {
            autumnGradesTotal = parseFloat(autumnGradesTotal) + parseFloat(gradeValue.value, 10) * parseFloat(degreeCount.value, 10); 
            autumnTotalDegree = parseFloat(autumnTotalDegree) + parseFloat(degreeCount.value, 10); 
        }
    });

    const gradesTotal = parseFloat(springGradesTotal) + parseFloat(autumnGradesTotal);
    const totalDegree = parseFloat(springTotalDegree) + parseFloat(autumnTotalDegree);

    let totalGPA = gradesTotal / totalDegree;
    if (isNaN(totalGPA) || !isFinite(totalGPA)) {
        totalGPA = "-";
    } else {
        totalGPA = truncateToTwoDecimals(totalGPA);
    }
    
    document.getElementById('autumn_degree_count_text').textContent = autumnTotalDegree;
    document.getElementById('total_degree').textContent = totalDegree;
    document.getElementById('result').textContent = totalGPA;

    saveToLocalStorage();

      if (analytics) {
        logEvent(analytics, 'result', {
            springGPA,
            springTotalDegree,
            springGradesTotal,
            autumnGradesTotal,
            autumnTotalDegree,
            gradesTotal,
            totalDegree,
            totalGPA
        });
    } else {
        console.error('Firebase Analytics is not initialized.');
    }

}

function saveToLocalStorage() {
    // if(document.querySelector(`input[name="language"]:checked`) && document.querySelector(`input[name="gakumon"]:checked`)){
        const languageInput = document.querySelector(`input[name="language"]:checked`);
        let languageIndex = "none";
        if (languageInput){
            languageIndex = languageInput.value;
        }
        const gakumonInput = document.querySelector(`input[name="gakumon"]:checked`);
        let gakumonIndex = "none";
        if(gakumonInput){
            gakumonIndex = gakumonInput.value;
        }

        // const gakumonIndex = document.querySelector(`input[name="gakumon"]:checked`).value;

        const springGPA = document.getElementById('springGpaInput').value;
        const springTotalDegree = document.getElementById('springTotalDegreeInput').value;
        
        let subjects = [];
        subjectIndexList.forEach(i => {
            if (document.querySelector(`input[name="subject-${i}"]:checked`)){
                const subjectName = document.querySelector(`.subject-input-${i} input[type="text"]`).value;
                const gradeValue = document.querySelector(`input[name="subject-${i}"]:checked`).value;
                const degreeCount = document.querySelector(`input[name="degree-count-${i}"]:checked`).value;
                subjects.push({ subjectName, gradeValue, degreeCount });
            }
        });

        // データをオブジェクトとして保存
        const data = {
            languageIndex,
            gakumonIndex,
            springGPA,
            springTotalDegree,
            subjects
        };
        
        // JSON に変換して localStorage に保存
        localStorage.setItem('gpaData', JSON.stringify(data));
        // console.log("保存しました", data);

}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('gpaData'));
    // console.log("復元データ", data);
    if (data) {
        if (data.languageIndex !== "none") { 
            document.querySelector(`input[name="language"][value="${data.languageIndex}"]`).checked = true;
        }
        if (data.gakumonIndex !== "none") {
            document.querySelector(`input[name="gakumon"][value="${data.gakumonIndex}"]`).checked = true;
        }

        document.getElementById('springGpaInput').value = data.springGPA;
        document.getElementById('springTotalDegreeInput').value = data.springTotalDegree;
        
        data.subjects.forEach((subject, index) => {
            addSubjectInput(subject.subjectName);
            
            const lastSubjectIndex = subjectIndexList[subjectIndexList.length - 1];
            
            if (subject.gradeValue !== "none") {
                document.querySelector(`input[name="subject-${lastSubjectIndex}"][value="${subject.gradeValue}"]`).checked = true;
            }
            document.querySelector(`input[name="degree-count-${lastSubjectIndex}"][value="${subject.degreeCount}"]`).checked = true;
        });
    }
}