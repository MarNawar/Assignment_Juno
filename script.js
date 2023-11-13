//Reasons Selectors
  const menu = document.querySelector(".menu");
  const reasons = document.querySelector(".reasons");
  const reason = document.querySelectorAll(".reason");

//Risk Selectors
  const level = document.querySelector(".level");
  const risks = document.querySelector(".risks");
  const risk = document.querySelectorAll(".risk");

//Modal Selectors
  const trigger = document.querySelector('.closeAccountBtn');
  const modalWrapper = document.querySelector('.modal__wrapper');
  const closeBtn = document.querySelector('.btn__purple');
  const closeIcon = document.querySelector('.close');

//Table Selectors
  document.querySelector('.clickpending').addEventListener('click',renderTable);
  document.querySelector('.clickcomplete').addEventListener('click',renderTable);
  const tableheading = document.querySelector('.theading');
  const tablerows = document.querySelector('.trows');


//Reasons Menu

    //show & hide options list
    menu.addEventListener("click", function(e){
      reasons.classList.toggle("active");
      menu.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
      console.log('click ed')
    });
    
    //close the reason menu when click outside the reasons menu
    document.addEventListener('click',function(event){
      if (!event.target.closest('.reasonMenu')) {
        reasons.classList.remove("active");
            menu.querySelector(".fa-angle-down").classList.remove("fa-angle-up");
      }
    })

    //select option
    reason.forEach((option) => {
      option.addEventListener("click", () => {
        reason.forEach((option) => {option.classList.remove('selected')});
        menu.querySelector("span").innerHTML = option.innerHTML;
        option.classList.add("selected");
        reasons.classList.toggle("active");
        menu.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
      });
    });

    

//Risk

    //show & hide options list
    level.addEventListener("click", function(e){
      risks.classList.toggle("active");
      level.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
    });

    //close the risk menu when click outside the risk menu
    document.addEventListener('click',function(event){
      if (!event.target.closest('.riskMenu')) {
        risks.classList.remove("active");
            level.querySelector(".fa-angle-down").classList.remove("fa-angle-up");
      }
    })
    // //select option
    risk.forEach((option) => {
      option.addEventListener("click", () => {
        risk.forEach((option) => {option.classList.remove('selected')});
        level.querySelector("span").innerHTML = option.innerHTML;
        option.classList.add("selected");
        risks.classList.toggle("active");
        level.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
      });
    });

  
    

//Modal   
    trigger.addEventListener('click', function(){
        openModal();
    });

    closeBtn.addEventListener('click', function(){
        closeModal();
    });

    closeIcon.addEventListener('click', function(){
        closeModal();
    });

    modalWrapper.addEventListener('click', function(e){
        if(e.target !== this) return;
        closeModal();
    });

    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape') {
            closeModal();
        }
    })

    function openModal() {
        modalWrapper.classList.add('active');
    }
    function closeModal() {
        modalWrapper.classList.remove('active');
    }

//Table

  //render the table for first time
  render('./pending.json');

  //render updated table
  function renderTable(e){
    document.querySelector('.clickpending').classList.toggle('btnColor'); 
    document.querySelector('.clickcomplete').classList.toggle('btnColor');
    let jsonString;

    if(document.querySelector('.clickpending').classList.contains('btnColor')){
      jsonString = './pending.json';
    }
    else{
      jsonString = './completed.json';
    }
    render(jsonString);
  }

  //render Table 
  function render(jsonString){
    fetch(jsonString)
      .then((response) => response.json())
      .then((data) => {
        let headingstr=``;
        for (const key in data.heading[0]) {
          let str=``;
          if(headingstr===''){
            str += `<th style="width: 270px;padding-left: 15px;">${data.heading[0][key]}</th>`;
          }
          else if((data.heading[0][key]==="Action taken by")||(data.heading[0][key]==="Previously reviewed")){
            str += `<th>${data.heading[0][key]}</th>`;
          }
          else{
            str += `<th>${data.heading[0][key]}  <i class='fas fa-sort fa-xs'></i></th>`;
          }
          headingstr+=str;
        }
        tableheading.innerHTML=headingstr; 

        tablerows.innerHTML = '<tr>';
        for(let i=0;i<data.rows.length;i++){
          let str = '';
          for(const key in data.rows[i]){
            if(typeof data.rows[i][key] === 'string'){
              if(data.rows[i][key]==="High"){
                str+=`<td style="color: #993838;"><i class="fa-solid fa-circle fa-2xs" style="color: #993838;"></i>  ${data.rows[i][key]}</td>`;
              }
              else if(data.rows[i][key]==='Low'){
                str+=`<td style="color: #466f25;"><i class="fa-solid fa-circle fa-2xs" style="color: #466f25;"></i>  ${data.rows[i][key]}</td>`
              }
              else if(data.rows[i][key]==='Medium'){
                str+=`<td style="color: #c5bf2b;"><i class="fa-solid fa-circle fa-2xs" style="color: #c5bf2b;"></i>  ${data.rows[i][key]}</td>`;
              }
              else str+=`<td>${data.rows[i][key]}</td>`;
            }
            else{
              if(str==''){
                str+=`<td style="
                  width: 270px;
                  padding-left: 15px;
                  display:grid;
                  grid-template-columns: 180px 1fr;
                  align-items: center;
                ">
                  <div style="display:grid;
                    grid-template-columns: 1fr;
                    row-gap: 5px;
                  ">
                    <div class="username1">${data.rows[i][key].name}</div>
                    <div class="userid1">${data.rows[i][key].id}</div>
                  </div> 
                  <div><i class="fa-solid fa-up-right-from-square" style="color: #7e61cc;"></i>          
                </td>`
              }
              else{
                str+=`<td>
                    <div style="display:grid;
                        grid-template-columns: 1fr;
                      row-gap: 5px;
                      ">
                      <div class="username1">${data.rows[i][key].name}</div>
                      <div class="userid1">${data.rows[i][key].id}</div>
                    </div>
                  </td>`;
              }
            }
          }
          tablerows.innerHTML+=str;
        }
        tablerows.innerHTML+=`</tr>`; 
      });
  }