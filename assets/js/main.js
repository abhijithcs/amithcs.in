'use strict';

updateWorkEx();
updateCopyRightYear();

function updateWorkEx(){
    const dateOfStartingWork = new Date(1436239800000); // July 7, 2015
    const dateToday = new Date();
    const totalMonths = monthsSince(dateOfStartingWork, dateToday);
    const displayYears = totalMonths % 12 == 0 ? totalMonths / 12 : parseInt(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    var displayText = displayMonths == 0 ? displayYears + " years" : "";
    if(displayMonths <= 3 && displayMonths != 0){
        displayText = displayYears + "+ years";
    } else if(displayMonths > 3 && displayMonths <= 10){
        displayText = displayYears + " years and "+displayMonths+" months";
    } else if(displayMonths > 10){
        displayText = "close to " + (displayYears + 1) + " years";
    }
    document.getElementById("workExCount").innerHTML = displayText;
}

function updateCopyRightYear() {
    const dateToday = new Date();
    document.getElementById("copyrightYear").innerHTML = dateToday.getFullYear();;
}

function monthsSince(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function copyToClipboardMobile(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    var textData = $(element).text();
    textData = textData.replace(/-/g, '');
    textData = textData.trim();
    $temp.val(textData).select();
    document.execCommand("copy");
    $temp.remove();

    //UI Changes
    document.getElementById("copyMobileButton").innerHTML = '<tag class="copyTextSuccess">Copied</tag>';
    $('#copyMobileButton').fadeOut(2000);
    setTimeout(function(){
    document.getElementById("copyMobileButton").innerHTML = '<i class="fa fa-eye"></i>';
    $('#copyMobileButton').fadeIn(1000); 
    }, 2100);
}

function copyToClipboardEmail(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    var textData = $(element).text();
    textData = textData.replace(/-/g, '');
    textData = textData.trim();
    $temp.val(textData).select();
    document.execCommand("copy");
    $temp.remove();

    //UI Changes
    document.getElementById("copyEmailButton").innerHTML = '<tag class="copyTextSuccess">Copied</tag>';
    $('#copyEmailButton').fadeOut(2000);
    setTimeout(function(){
    document.getElementById("copyEmailButton").innerHTML = '<i class="fa fa-eye"></i>';
    $('#copyEmailButton').fadeIn(1000); 
    }, 2100);
}

function viewMobileNumber() {
    var mobilesContentList = document.getElementsByClassName("myMobileNumber");
    var replaceX = [4,3,6,8,7];
    
    var mobilesDisplayCounter = 0;
    while(mobilesDisplayCounter < mobilesContentList.length){
        var mobileNumber = mobilesContentList[mobilesDisplayCounter].innerText;
        let formattedNumber = "";
        let xIndex = 0;
        for(let n = 0; n < mobileNumber.length; n++){
            if(mobileNumber[n] == 'X'){
                formattedNumber = formattedNumber + "" + replaceX[xIndex];
                xIndex++;
            } else {
                formattedNumber = formattedNumber + "" + mobileNumber[n];
            }
        }
        mobilesContentList[mobilesDisplayCounter].innerText = formattedNumber;

        copyToClipboardMobile('#profileMobileNumber');
        
        mobilesDisplayCounter++;
    }

    
}

function viewEmailAddress() {
    var emailContentList = document.getElementsByClassName("myEmailAddress");
    var replaceX = ['r','t','o','b','j','t','h','g','m','a','i','l'];
    
    var emailDisplayCounter = 0;
    while(emailDisplayCounter < emailContentList.length){
        var emailAddress = emailContentList[emailDisplayCounter].innerText;
        let formattedEmail = "";
        let xIndex = 0;
        for(let n = 0; n < emailAddress.length; n++){
            if(emailAddress[n] == 'x'){
                formattedEmail = formattedEmail + "" + replaceX[xIndex];
                xIndex++;
            } else {
                formattedEmail = formattedEmail + "" + emailAddress[n];
            }
        }
        emailContentList[emailDisplayCounter].innerText = formattedEmail;

        copyToClipboardEmail('#profileEmailAddress');

        emailDisplayCounter++;
    }
}

//Hide Personal Info
setInterval(function(){
    const maskedMobileNumber = "90XX-9X0-XX6";
    var mobilesContentList = document.getElementsByClassName("myMobileNumber");
    var mobilesDisplayCounter = 0;
    while(mobilesDisplayCounter < mobilesContentList.length){
        mobilesContentList[mobilesDisplayCounter].innerText = maskedMobileNumber;
        mobilesDisplayCounter++;
    }

    const maskedEmailAddress = "wxixetxaxhixixx@xxxxx.com";
    var emailContentList = document.getElementsByClassName("myEmailAddress");
    var emailDisplayCounter = 0;
    while(emailDisplayCounter < emailContentList.length){
        emailContentList[emailDisplayCounter].innerText = maskedEmailAddress;
        emailDisplayCounter++;
    }
}, 8000);

//Anchors
$(function(){
    $('a[href^="#"]').click(function(){
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 50}, 800);
        return false;
    });
});

//Fixed-top menu
function fixedHeader() {
    var ww = $(window).scrollTop();
    if(ww > 0){
        $('.menu').addClass('menu--active');
        $('.mobile-menu').addClass('mobile-menu--active');
    }else{
        $('.menu').removeClass('menu--active');
        $('.mobile-menu').removeClass('mobile-menu--active');
    }
}
fixedHeader();
$(window).on('scroll', function () {
    fixedHeader();
});


//Animate progress-bar
$('.js-progress-list').waypoint({
    handler: function () {
        $(".progress-bar").each(function () {
            $(this).animate({
                width: $(this).attr('aria-valuenow') + '%'
            }, 200);
        });
        this.destroy();
    }, offset: '50%'
});



//Animate headers of .section
var hideHeader = function(header) {
    header.css('text-indent', '-9999px');
};

var showHeader = function(header) {
    header.css('text-indent', '0px');
};

var animateHeader = function(header, text) {
    //clear header text
    header.text("");
    //and animate it
    var nextAnimationStep = function() {
        if (text.length > 0) {
            header.text(header.text() + text.substr(0,1));
            text = text.substr(1);
            setTimeout(nextAnimationStep, 100);
        }
    };
    nextAnimationStep();
};

var animateHeaders = function(headers) {
    return Object.keys(headers).map(function(key, index) {
        var elementSelector = key;
        var offset = headers[key];
        var header = $(elementSelector);
        hideHeader(header);
        var waypoint = {};
        waypoint[key] = header.waypoint({
            handler: function() {
                showHeader(header);
                animateHeader(header, header.text());
                this.destroy();
            },
            offset: offset
        })[0];
        return waypoint;
    }).reduce(Object.assign, {});
};

//All ids of titles should be written here to animation work
var animatedHeaders = animateHeaders({
    "#hello_header": '90%',
    "#resume_header": '70%',
    "#portfolio_header": '70%',
    "#testimonials_header": '70%',
    "#blog_header": '70%',
    "#contacts_header": '70%',
    "#other_posts": '70%'
});


//Filter project cards
var previousClickedMenuLink = undefined;
$('.portfolio-menu').on('click', 'a', function(event){
    event.preventDefault();

    if (previousClickedMenuLink) {
        previousClickedMenuLink.removeClass('portfolio-menu__link--active');
    }
    var link = $(event.target);
    link.addClass('portfolio-menu__link--active');
    previousClickedMenuLink = link;

    var targetTag = $(event.target).data('portfolio-target-tag');
    var portfolioItems = $('.portfolio-cards').children();

    if (targetTag === 'all') {
        portfolioItems.fadeIn({duration: 500});
    } else {
        portfolioItems.hide();
    }

    portfolioItems.each(function(index, value){
        var item = $(value);
        if (item.data('portfolio-tag') === targetTag) {
            item.fadeIn({duration: 500});
        }
    });
});


//Settings for carousel from bootstrap 4.0
$('.carousel').carousel({
    pause: "hover",
    interval: 5000
});

$(".carousel-control-prev").click(function(){
    $(".carousel").carousel("prev");
});

$(".carousel-control-next").click(function(){
    $(".carousel").carousel("next");
});



//Open mobile menu
$('.menu__mobile-button, .mobile-menu__close').on('click', function () {
    $('.mobile-menu').toggleClass('active');
});

//Close mobile menu after click
$('.mobile-menu__wrapper ul li a').on('click', function () {
    $('.mobile-menu').removeClass('active');
});





//Validation forms
function validateForm(selector) {
    Array.from(document.querySelectorAll(selector)).forEach(item => {
        item.addEventListener('input', (e) => {
            if(e.target.value === ''){
            item.dataset.touched = false;
            }
        });
        item.addEventListener('invalid', () => {
            item.dataset.touched = true;
        });
        item.addEventListener('blur', () => {
            if (item.value !== '') item.dataset.touched = true;
        });
    });
};

validateForm('.js-form .form-field');

var form = document.querySelector('.js-form');
var formName = '.js-form';

form.addEventListener('submit', function(e){
    submitForm(e, formName);
});

function submitForm(e, formName) {
    e.preventDefault();
    var name = $(formName + ' .js-field-name').val();
    var email = $(formName + ' .js-field-email').val();
    var content = $(formName + ' .js-field-message').val();
    var mobile = $(formName + ' .js-field-mobile').val();

    var formData = {
        name: name,
        email: email,
        content: content,
        mobile: mobile
    };

    $.ajax({
        type: "POST",
        url: 'https://accelerateengine.app/email-engine/sendmessage.php',
        data: formData,
        success: function () {
            alert('Thank you! Abhijith will get back to you soon.');
            $(formName + ' .js-field-name').val('');
            $(formName + ' .js-field-email').val('');
            $(formName + ' .js-field-message').val('');
            $(formName + ' .js-field-mobile').val('');
        },
        error: function () {
            alert('Unable to send the message.');
        }
    });
}



//Settings for mbcliker.min.js
var $click = $('.site-btn');
$click.mbClicker({
    size: 300, //Maximum size of circle
    speed: 750, //Time of animation in miliseconds
    colour: 'rgba(0,0,0,0.11)', //Colour of circle and shadow
    shadow: false, //Whether or not to have a shadow on the circle
    buttonAnimation: true //Only use if button doesn't have a style attribute
});



