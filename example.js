//Make an API call
fetch("json.txt")
.then(response=>response.json())
.then(dataFromApi=>{
    console.log(dataFromApi)
    //send the data
    loadingSelector(dataFromApi)
    setData(dataFromApi)
    displayTable()
})
.catch(error=>console.log(error.message))

//get data from api
var empProfile;
//set data
function setData(empProf){
    empProfile=empProf  
}
//get data
function getData(){
    return empProfile
}

let select = document.getElementById("select")
//load the selector with data
function loadingSelector(empProfile){
    //check array
    checkArray=[]
    for(let empObj of empProfile){
        for(let empData in empObj){
            if(empData=="albumId"){
                if(!checkArray.includes(empObj["albumId"])){
                    //create option
                    let option =document.createElement("OPTION")
                    //assign the albumIds
                    option.setAttribute("value",empObj[empData])
                    option.textContent="albumId "+empObj["albumId"]
                    //push to check array
                    checkArray.push(empObj["albumId"])
                    //append it to select
                    select.appendChild(option)
                }
            }
        }
    }
}

//update after every selection of user
function update(){
    let userChoice=select.options[select.selectedIndex].value
    console.log("user",userChoice)
    let empProf = getData()
    console.log(empProf)
    displayInfoInTable(userChoice,empProf)
}
let table = document.getElementById("table")
let thead = document.getElementById("thead")
let tbody = document.getElementById("tbody")

//display data in table
function displayTable(){
    //create tr element
    let tr = document.createElement("tr")
    let empProf = getData()
    console.log(empProf)
    for(let empObj in empProf[0]){
        //create th element
        let th=document.createElement("th")
        //assign content
        th.textContent=empObj.charAt(0).toUpperCase()+empObj.slice(1)
        //append it to tr
        tr.appendChild(th)
    }
    //append it to thead
    thead.appendChild(tr)    
}
function displayInfoInTable(userChoice,empProf){
    //search for user choice
    if(userChoice!==undefined){
        clearing()
        for(let empObj of empProf){
            if(empObj["albumId"]==userChoice){ 
                //create tr element
                let tr = document.createElement("tr") 
                tr.setAttribute("class","trow")
                for(let empData in empObj){
                    //create td
                    let td=document.createElement("td")
                    //assign td
                    td.textContent=empObj[empData]
                    //append td to tr
                    tr.appendChild(td)
                }
                //append on tbody
                tbody.appendChild(tr)
            }
        }
        //clears the old data
        function clearing(){
            while(tbody.hasChildNodes())
            {
                tbody.removeChild(tbody.firstChild);
            }
        }
    }
}

    
