let themeOne = document.getElementById('themeOneDial')
let themeTwo = document.getElementById('themeTwoDial')
let themeThree = document.getElementById('themeThreeDial')
const del = document.getElementById('del')

function switchDials() {
    if (themeOne.checked && !themeTwo.checked && !themeThree.checked) {
        themeOne.checked = false
        themeTwo.checked = true
        return
    }
    if (themeTwo.checked && !themeOne.checked && !themeThree.checked) {
        themeTwo.checked = false
        themeThree.checked = true
        return
    }
    if (themeThree.checked && !themeOne.checked && !themeTwo.checked) {
        themeThree.checked = false
        themeOne.checked = true
        return
    }
    console.log(themeOne.checked)
}


del.addEventListener('click', switchDials)




