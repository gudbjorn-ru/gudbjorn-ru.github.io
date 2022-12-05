

 window.onload = fetchGuestBook_Entries();

 function fetchGuestBook_Entries(){
 
 // Fetching Spreadsheet JSON Data	
 fetch(
     `https://opensheet.elk.sh/${Google_Form_ID}/${Google_Form_Name}`
 )
     .then((res) => res.json())
     .then((data) => {
 
         // reversing JSON data to make things easier
          let sortedInput = (data.reverse())
              
             
          
     // Add 5 entries to main page
           // ie; iterate 5 times
     for(var i = 0; i < 5 && i < sortedInput.length; i++){
         
         // Split timestamp data
         var splitTime =  sortedInput[i].Timestamp.split(' ')[0];
         var splitTime_1 =  sortedInput[i].Timestamp.split(' ').pop();
 
         
          // Work in Progress - Convert to 24 Hour
         let ConvertedTime =  tConvert (splitTime_1)
         
         // Sanitize Data
         let SantizeName =  encodeHTML(sortedInput[i].Identification)
         
         let SantizeResponses =  encodeHTML(sortedInput[i].Operation)
                   
         // Add Entries To Main Section
         document.getElementById("json").innerHTML += `
                      <div class="entry">
                 <div class="entry-info">
                     <p><span class="author"> ${SantizeName}.</span> | <span class="date">${splitTime}</span> | <span class="time">${ConvertedTime}</span></p>
                 </div>
                 <div class="entry-text">
                     <p>${SantizeResponses} </p>
                 </div>
             </div>`
         
 }
     
     
     /// Adding all entries to all entry section
     
         data.forEach((row) => {
         
         // Sanitize Data
         let SantizeResponses =  encodeHTML(row.Operation)
         
         let SantizeName =  encodeHTML(row.Identification)
         
         // Split timestamp data
                     var splitTime =  row.Timestamp.split(' ')[0];
         var splitTime_1 =  row.Timestamp.split(' ').pop();
 
         
          // Work in Progress - Convert to 24 Hour
         let ConvertedTime =  tConvert (splitTime_1)
                     
                 
            document.getElementById("AllEntries_Content").innerHTML += `
                      <div class="entry">
                 <div class="entry-info">
                     <p><span class="author">${SantizeName}</span> | <span class="date">${splitTime}</span> | <span class="time">${ConvertedTime}</span></p>
                 </div>
                 <div class="entry-text">
                     <p>${SantizeResponses}</p>
                 </div>
             </div>`
           
         });
     });
 
     
 }
 
 
 function tConvert (time) {
   
   return time; // return adjusted time or original string
 }
 
          
 var subscribeForm = document.getElementById("SendForm")
 
 /// Profanity Filter
 
    // Enter the words to be not allowed in form submission for Profanity Filter
 var swear_words_arr=new Array("algjörlega óþarft en ég nenni ekki að breyta kóðanum");
 
 var swear_alert_arr=new Array;
 var swear_alert_count=0;
 function reset_alert_count()
 {
  swear_alert_count=0;
 }
 function validate_text()
 {
  reset_alert_count();
  var compare_text=document.getElementById(GOOGLE_ENTRY_ID_Name).value;
  for(var i=0; i<swear_words_arr.length; i++)
  {
   for(var j=0; j<(compare_text.length); j++)
   {
    if(swear_words_arr[i]==compare_text.substring(j,(j+swear_words_arr[i].length)).toLowerCase())
    {
     swear_alert_arr[swear_alert_count]=compare_text.substring(j,(j+swear_words_arr[i].length));
     swear_alert_count++;
    }
   }
  }
  var alert_text="";
  for(var k=1; k<=swear_alert_count; k++)
  {
   alert_text+="\n" + "(" + k + ")  " + swear_alert_arr[k-1];
  }
 
     // if profanity is detected - show this message	 	
  if(swear_alert_count>0)
  {
      
   var subscribeForm = document.getElementById("SendForm")
   // Fade out form to make things look nice
  subscribeForm.setAttribute("style", "-webkit-animation: fadeOut 1s; animation: fadeOut 1s;  animation-fill-mode: forwards;");
 // Hide the input form values	 
  Gform.setAttribute("style", "display:none;");  
  // Show the user this message + the illegal character they used.
 subscribeForm.innerHTML = `	<a class="close" onclick="ResetSwearForm();" href="#">&times;</a>
 <h1  style="text-align: center;
     margin-top: 2em;">Your message will not be added! \nThe following illegal words were found:</h1> <p>${alert_text}</p>`   
   // Fade message in
 subscribeForm.setAttribute("style", "-webkit-animation: fadeIn 1s; animation: fadeIn 1s;  animation-fill-mode: forwards;");  
      
 
  }
  else  // if no profanities found - check if Captcha is complete
  {
      
       document.gform.submit();
 
      
        // Timeout is needed for form to properly submit with animation
      
      setTimeout(function(){
    
          
 
   // Hide the form values 
 Gform.setAttribute("style", "display:none;");  
   var subscribeForm = document.getElementById("SendForm")
 
   
      // Show the user message their entry has been added
 subscribeForm.innerHTML = `	<a class="close" href="#">&times;</a>
 <h1 style="text-align: center;
     margin-top: 2em;">Your Guestbook Entry Has Added! It will appear shortly!</h1> `   
   
 },500);
  }
 }
 window.onload=reset_alert_count;
 
 // After profanity message is shown - we need to reset it to allow user to try again
 
     /// ie : Reset form after showing user message of violation
 var subscribeForm = document.getElementById("SendForm")
 
 function ResetSwearForm(){
     
              
                       // Fade out form to make things look nice
  subscribeForm.setAttribute("style", "-webkit-animation: fadeOut 1s; animation: fadeOut 1s;  animation-fill-mode: forwards;");
  
  
 subscribeForm.innerHTML = `<h1>Sign The Guestbook</h1>
 <a class="close" href="#">&times;</a>
 <div class="content">
<br>
 
<form name="gform" id="gform" enctype="text/plain" action="GOOGLE_FORM_URL" target="hidden_iframe" onsubmit="submitted=true;">

<label for="GOOGLE_ENTRY_ID_Name"  class="aterisk_after">Name </label>

 <input class="form-element" type="text" name="GOOGLE_ENTRY_ID_Name" id="GOOGLE_ENTRY_ID_Name" placeholder="Gul peysa." style="background: #c9c9c9;" required>

 <label for="GOOGLE_ENTRY_ID_Email">Inn / Kassi / Út</label>


 <input class="form-element" type="text" name="GOOGLE_ENTRY_ID_Email" id="GOOGLE_ENTRY_ID_Email" placeholder="Inn" style="background: #c9c9c9;">

 <input class="form-button" type="submit" value="Submit">
 <input class="form-button" type="reset" value="Reset Form">

</form>
 </div>
</div>
</div>    
          
 `   
   
 subscribeForm.setAttribute("style", "-webkit-animation: fadeIn 1s; animation: fadeIn 1s;  animation-fill-mode: forwards;");  
 }
 
 // Santize Input - Basic XSS filter 
 
 function encodeHTML(sanizitedInput) {
     return sanizitedInput.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
 }