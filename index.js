"use strict"
document.addEventListener('DOMContentLoaded',function(){


    // GENERAL SETTINGS
    // displays only the first section when  the page loads
    document.querySelectorAll('.steps_section').forEach(function(stepsSection){
        stepsSection.style.display = 'none'
    })
    // 
    document.querySelector('#step_1').style.display = 'block'
    // 
    document.querySelector('#section_number1').style.cssText = `background:hsl(206, 94%, 87%);color:hsl(213, 96%, 18%)`
    // END


    
    // CLEAR LOCAL STORAGE DATA THAT HAS ANY INFO ON THIS PAGE
    document.querySelectorAll('.check_box').forEach(function(checkBox){
        localStorage.removeItem(`adonType_${checkBox.dataset.name}`)
        localStorage.removeItem(`adonAmount_${checkBox.dataset.name}`)
    })

    document.querySelectorAll('.planType').forEach(function(planType){
        localStorage.removeItem('paymentPlan')
        localStorage.removeItem('paymentPlan_Amount')
    }) 
    // END



    // GENERAL function for next and previous btn
    function nextPreviousBtn(number1,number2){
        var currentStep = document.querySelector(`#step_${number1}`)
        currentStep.style.display = 'none'

        document.querySelector(`#step_${number2}`).style.cssText = `display:block;`
        document.querySelectorAll('.stepsBtn').forEach(function(stepBtn){
            stepBtn.style.cssText = `background:transparent;color:white`
        })
        document.querySelector(`#section_number${number2}`).style.cssText = `background:hsl(206, 94%, 87%);color:hsl(213, 96%, 18%)`
    }
    // previousBtn
    document.querySelectorAll('.previous_btn').forEach(function(nextbtn){
        nextbtn.addEventListener('click',function(){
            const value1 = this.dataset.id
            const value2 =  parseInt(this.dataset.id) - 1
            nextPreviousBtn(value1,value2)
        })
    })
    // nextbtn
    document.querySelectorAll('.next_btn').forEach(function(nextbtn){
        nextbtn.addEventListener('click',function(){
            const value1 = this.dataset.id
            const value2 =  parseInt(this.dataset.id) + 1
            nextPreviousBtn(value1,value2)
         })
    })
 


    // sideBar navigation
    function nextStepBtn(number1){
        // 
        let inputFilelds =  document.querySelectorAll('input')
        const allinputfields = Array.from(inputFilelds).every(input => input.value !== "")
        if(allinputfields){
            if(!email.value.includes('@')){
                document.querySelector(`#label_2`).innerHTML = '@ is not included '
                email.style.cssText = `border: 1px solid hsl(354, 84%, 57%)`
            }
            else{
                document.querySelectorAll('.stepsBtn').forEach(function(stepBtn){
                    stepBtn.style.cssText = `background:transparent;color:white`
                })
                document.querySelector(`#section_number${number1}`).style.cssText = `background:hsl(206, 94%, 87%);color:hsl(213, 96%, 18%)`
        
                document.querySelectorAll('.steps_section').forEach(function(nextbtn){
                    nextbtn.style.display = 'none'
                })
                document.querySelector(`#step_${number1}`).style.display = 'block' 
            }

        }
        else{
            errorInput()
        }

    }

    document.querySelectorAll('.stepsBtn').forEach(function(stepsBtn){
        stepsBtn.addEventListener('click',function(){
            nextStepBtn(this.dataset.id)
        })
    })



    // STEP 1
    // Get all user details, if details are not completely given disable next button on step 1
    const email = document.querySelector('#email')

    // displays error message
    function displayErrorLabel(id){
        document.querySelector(`#label_${id}`).innerHTML = 'This field is required'
    }
    // clear error message when input field is empty
    function clear(){
        document.querySelectorAll('.error_label').forEach(function(error){
             error.innerHTML = ""
        })
        document.querySelectorAll('input').forEach(function(input){
            input.style.cssText = `border: 1px solid hsla(213, 98%, 18%, 0.136);`
        })
    }
    // 
    document.querySelector('#nextBtn_1').addEventListener('click',function(){
        // 
        let inputFilelds =  document.querySelectorAll('input')
        const allinputfields = Array.from(inputFilelds).every(input => input.value !== "")
        if(allinputfields){
            if(!email.value.includes('@')){
                document.querySelector(`#label_2`).innerHTML = '@ is not included '
                email.style.cssText = `border: 1px solid hsl(354, 84%, 57%)`
            }
            else{
                document.querySelectorAll('.error_label').forEach(function(error){
                    error.innerHTML = ""
                })
                const nextBtn1 = document.querySelector('#nextBtn_1')
                const value1 = nextBtn1.dataset.id
                const value2 =  parseInt(nextBtn1.dataset.id) + 1
                nextPreviousBtn(value1,value2) 
            }

        }
        else{
            errorInput()
        }
    })

    function errorInput(){
        document.querySelectorAll('input').forEach(function(inputfields){
            if(inputfields.value == ""){
                displayErrorLabel(inputfields.dataset.number)
                inputfields.style.cssText = `border: 1px solid hsl(354, 84%, 57%)`
            }
        })
    }

    

    // STEP 2
    // toggle between monthly and yearly subscription(paymentType)
    document.querySelector('.payment_toggle').addEventListener('click',function(){
        // 
        if (this.classList.contains('payment_toggle')){
            // 
            this.classList.remove('payment_toggle')
            this.classList.add('toggle_paymentType')
            // 
            document.querySelectorAll('.monthly').forEach(function(monthly){
                monthly.style.display = 'none'
            })
            // 
            document.querySelectorAll('.yearly').forEach(function(monthly){
                monthly.style.display = 'block'
            })
            // converts stored adon plan amount selected to yearly in local storage 
            document.querySelectorAll('.check_box').forEach(function(checkBox){
                if(checkBox.classList.contains('clickedCheckbtn')){
                    localStorage.setItem(`adonType_${checkBox.dataset.name}`,`${checkBox.dataset.name}`)
                    localStorage.setItem(`adonAmount_${checkBox.dataset.name}`,`${checkBox.dataset.yearly}`)
                }
            })
            // converts selected plan amount to yearly in local storage
            document.querySelectorAll('.planType').forEach(function(planType){
                if (planType.classList.contains('selectedPlan')){
                    localStorage.setItem('paymentPlan',`${planType.dataset.name}`)
                    localStorage.setItem('paymentPlan_Amount',`${planType.dataset.yearly}`)
                }
            }) 

        }
        // 
        else{
            // 
            this.classList.add('payment_toggle')
            this.classList.remove('toggle_paymentType')
            // 
            document.querySelectorAll('.monthly').forEach(function(monthly){
                monthly.style.display = 'block'
            })
            // 
            document.querySelectorAll('.yearly').forEach(function(monthly){
                monthly.style.display = 'none'
            })
            // converts stored adon plan amount selected to monthly in local storage
            document.querySelectorAll('.check_box').forEach(function(checkBox){
                if(checkBox.classList.contains('clickedCheckbtn')){
                    localStorage.setItem(`adonType_${checkBox.dataset.name}`,`${checkBox.dataset.name}`)
                    localStorage.setItem(`adonAmount_${checkBox.dataset.name}`,`${checkBox.dataset.monthly}`)
                }
            })
            // converts selected plan amount to yearly in local storage 
            document.querySelectorAll('.planType').forEach(function(planType){
                if(planType.classList.contains('selectedPlan')){
                    localStorage.setItem('paymentPlan',`${planType.dataset.name}`)
                    localStorage.setItem('paymentPlan_Amount',`${planType.dataset.monthly}`)
                }
            }) 
            // 
        }
        // 
    })

    //SELECTING PLAN
    document.querySelectorAll('.planType').forEach(function(planType){
        // SAVES PLAN SELECTED BY USER INCLUDING THE PRICE TO LOCAL STORAGE
        planType.addEventListener('click',function(){
            localStorage.setItem('paymentPlan',`${planType.dataset.name}`)
            if(document.querySelector('.payment_type').children[1].classList.contains('payment_toggle')){
                localStorage.setItem('paymentPlan_Amount',`${planType.dataset.monthly}`)
            }
            else{
                localStorage.setItem('paymentPlan_Amount',`${planType.dataset.yearly}`)
            }
            //1. first it makes all other payment plan neutral then. check 2 for more info
            document.querySelectorAll('.planType').forEach(function(planType){
                planType.classList.remove('selectedPlan')
            }) 
            // 2. makes selected plan standout by having a different background color and border
            this.classList.toggle('selectedPlan')
            
        })
    }) 



    // STEP 3 SECTION
    // Selecting add-ons
    document.querySelectorAll('.check_box').forEach(function(checkBox){
        checkBox.addEventListener('click',function(){
            // toggle css propery when clicked on
            checkBox.classList.toggle('clickedCheckbtn')
            document.querySelector(`#mini_container${checkBox.dataset.id}`).classList.toggle('parent_checkbox')
            // checks if box has been clicked if true save the data in localstorage
            if (checkBox.classList.contains('clickedCheckbtn')){
                 // stores data into local storage and checks if its plan is monthly or yearly so it can store approriately
                localStorage.setItem(`adonType_${checkBox.dataset.name}`,`${checkBox.dataset.name}`)
                if(document.querySelector('.payment_type').children[1].classList.contains('payment_toggle')){
                    localStorage.setItem(`adonAmount_${checkBox.dataset.name}`,`${checkBox.dataset.monthly}`)
                }
                else{
                    localStorage.setItem(`adonAmount_${checkBox.dataset.name}`,`${checkBox.dataset.yearly}`)
                }
            }
            else{
                localStorage.removeItem(`adonType_${checkBox.dataset.name}`)
                localStorage.removeItem(`adonAmount_${checkBox.dataset.name}`)
            }
        })
    })



    // STEP 4 SECTION
    // Finishing up

    document.querySelector('#section_number4').addEventListener('click',function(){
        step4Data()
    })

    document.querySelector('#nextBtn_3').addEventListener('click',function(){
        step4Data()
    })


    function step4Data(){

        // get data for selected stored in localstorage
        const planName = localStorage.getItem('paymentPlan')
        const planAmount = localStorage.getItem('paymentPlan_Amount')
        // assing values to the innerhtml of the appropriate tags
        if(planName && planAmount ){
            document.querySelector('.planName').innerHTML = planName
            document.querySelector('.planAmount').innerHTML = planAmount
        }
        else{
            document.querySelector('.planName').innerHTML = 'No plan'
            document.querySelector('.planAmount').innerHTML = '$0'
        }
        // consver amount to string so i can slice and get the main amount needed to calculate the total
        const stringamount = String(planAmount)
        document.querySelector('.planAmount').dataset.amount = stringamount.slice(1,-3)
        // 
        // clears the content of this tag
        document.querySelector('.ad_selceted').innerHTML = ""
        // get data from adons stored in localstorage
        document.querySelectorAll('.check_box').forEach(function(checkBox){
            if (checkBox.classList.contains('clickedCheckbtn')){
                const adontype = localStorage.getItem(`adonType_${checkBox.dataset.name}`)
                const adonamount = localStorage.getItem(`adonAmount_${checkBox.dataset.name}`)
                // adons_parent
                const ad_ons = document.createElement('div')
                ad_ons.className = 'ad_ons'
               // adons_left
                const adleft = document.createElement('div')
                adleft.innerHTML = adontype
                adleft.className = 'ad_onLeft'
                // adons_right
                const adright = document.createElement('div')
                adright.innerHTML = adonamount
                adright.className = 'ad_onRight'
                const adonStringAmount = String(adonamount)
                adright.dataset.amount = adonStringAmount.slice(2,-3)
                // appends them appropriately to the right tag
                ad_ons.append(adleft)
                ad_ons.append(adright)
                document.querySelector('.ad_selceted').append(ad_ons)
            }
        })

        var total = 0
        // calculating total cost
        // amount on adons
        document.querySelectorAll('.ad_onRight').forEach(function(adRight){
            total = total + parseInt(adRight.dataset.amount)
        })
        // amount for plan
        total = total + parseInt(document.querySelector('.planAmount').dataset.amount)
        //
        if (Number.isInteger(total)){
            document.querySelector('.totalAmount').innerHTML = `+$${total}`
        }
        else{
            document.querySelector('.totalAmount').innerHTML = '$0'
        }

    }
    // 
    document.querySelector('.change').addEventListener('click',function(){
        document.querySelectorAll('.steps_section').forEach(function(stepsSection){
            stepsSection.style.display = 'none'
        })
        document.querySelector('#step_2').style.display = 'block'
        // 
        document.querySelectorAll('.stepsBtn').forEach(function(stepBtn){
            stepBtn.style.cssText = `background:transparent;color:white`
        })
        document.querySelector(`#section_number2`).style.cssText = `background:hsl(206, 94%, 87%);color:hsl(213, 96%, 18%)`
    })


    // display thank you section after confirming purchase
    document.querySelector('.confirm').addEventListener('click',function(){
        document.querySelectorAll('.steps_section').forEach(function(stepssection){
            stepssection.style.display = 'none'
        })
        document.querySelector('#step_5').style.display = 'block'
    })



})