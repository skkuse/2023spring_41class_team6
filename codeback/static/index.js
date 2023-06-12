function getCheckboxValue1(event)  {
  let result = '';
  if(event.target.checked)  {
    result = event.target.value;
    $('input:checkbox[id="check"]').attr("checked", false)
    document.getElementById( 'progress' ).value = '20';
  }else {
    result = '';
  }
  console.log(result);
}

function getCheckboxValue2(event)  {
  let result = '';
  if(event.target.checked)  {
    result = event.target.value;
    $('input:checkbox[id="check"]').attr("checked", false)
    document.getElementById( 'progress' ).value = '40';
  }else {
    result = '';
  }
  console.log(result);
}

function getCheckboxValue3(event)  {
  let result = '';
  if(event.target.checked)  {
    result = event.target.value;
    $('input:checkbox[id="check"]').attr("checked", false)
    document.getElementById( 'progress' ).value = '60';
  }else {
    result = '';
  }
  console.log(result);
}

function getCheckboxValue4(event)  {
  let result = '';
  if(event.target.checked)  {
    result = event.target.value;
    $('input:checkbox[id="check"]').attr("checked", false)
    document.getElementById( 'progress' ).value = '80';
  }else {
    result = '';
  }
  console.log(result);
}

function getCheckboxValue5(event)  {
  let result = '';
  if(event.target.checked)  {
    result = event.target.value;
    $('input:checkbox[id="check"]').attr("checked", false)
    document.getElementById( 'progress' ).value = '100';
  }else {
    result = '';
  }
  console.log(result);
}

function workbook_action() {
  console.log("hello");
}

function backspace(){
  location.href = ' '
  console.log("back");
}
