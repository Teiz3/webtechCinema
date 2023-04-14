makeElNode('div', document.body, '', 'info-container')

function getUserInfo(){
    fetch('../../db/profile')
    .then(res => res.json()).then(
        data => {
            console.log('userinfo fetched');
            userInfo = JSON.parse(data);
            makeProfilePage(userInfo[0]);
        }
    )
}

//Hardcoded because too little time
function makeProfilePage(userInfo){ 
    // form for fullname
    makeElNode('form', getElClass('info-container'), '', 'form__name', '', {action: '/db/changeprofile', method: 'POST'});
    makeElNode('label', getElClass('form__name'), 'Name:', '', '', {for: 'fname'});
    makeElNode('div', getElClass('form__name'), '', 'input-container', 'input-container__fullname');
    makeElNode('input', getElId('input-container__fullname'), '', '', 'fname', {type: 'text', name: 'fname', placeholder: userInfo.fullname});
    makeElNode('input', getElId('input-container__fullname'), '', '', '', {type: 'submit', value: 'Change'});
    makeElNode('hr', getElClass('info-container'), '', 'hr');

    // form for username
    makeElNode('form', getElClass('info-container'), '', 'form__uname', '', {action: '/db/changeprofile', method: 'POST'});
    makeElNode('label', getElClass('form__uname'), 'Username:', '', '', {for: 'uname'});
    makeElNode('div', getElClass('form__uname'), '', 'input-container', 'input-container__uname');
    makeElNode('input', getElId('input-container__uname'), '', '', 'uname', {type: 'text', name: 'uname', placeholder: userInfo.username});
    makeElNode('input', getElId('input-container__uname'), '', '', '', {type: 'submit', value: 'Change'});
    makeElNode('hr', getElClass('info-container'), '', 'hr');

    //Form for password
    makeElNode('form', getElClass('info-container'), '', 'form__password', '', {action: '/db/changeprofile', method: 'POST'});
    makeElNode('label', getElClass('form__password'), 'Password:', '', '', {for: 'password'});
    makeElNode('div', getElClass('form__password'), '', 'input-container', 'input-container__password');
    makeElNode('input', getElId('input-container__password'), '', '', 'password', {type: 'password', name: 'password', placeholder: '******'});
    makeElNode('input', getElId('input-container__password'), '', '', '', {type: 'submit', value: 'Change'});
    makeElNode('hr', getElClass('info-container'), '', 'hr');

    // form for email
    makeElNode('form', getElClass('info-container'), '', 'form__email', '', {action: '/db/changeprofile', method: 'POST'});
    makeElNode('label', getElClass('form__email'), 'Email:', '', '', {for: 'email'});
    makeElNode('div', getElClass('form__email'), '', 'input-container', 'input-container__email');
    makeElNode('input', getElId('input-container__email'), '', '', 'email', {type: 'text', name: 'email', placeholder: userInfo.email});
    makeElNode('input', getElId('input-container__email'), '', '', '', {type: 'submit', value: 'Change'});
    makeElNode('hr', getElClass('info-container'), '', 'hr');

    // Form for street name
    makeElNode('form', getElClass('info-container'), '', 'form__street', '', {action: '/db/changeprofile', method: 'POST'});
    makeElNode('label', getElClass('form__street'), 'Street:', '', '', {for: 'street'});
    makeElNode('div', getElClass('form__street'), '', 'input-container', 'input-container__street');
    makeElNode('input', getElId('input-container__street'), '', '', 'street', {type: 'text', name: 'street', placeholder: userInfo.street});
    makeElNode('input', getElId('input-container__street'), '', '', '', {type: 'submit', value: 'Change'});
    makeElNode('hr', getElClass('info-container'), '', 'hr');

    // Form for street number
    makeElNode('form', getElClass('info-container'), '', 'form__streetno', '', {action: '/db/changeprofile', method: 'POST'});
    makeElNode('label', getElClass('form__streetno'), 'Street Number:', '', '', {for: 'streetno'});
    makeElNode('div', getElClass('form__streetno'), '', 'input-container', 'input-container__streetno');
    makeElNode('input', getElId('input-container__streetno'), '', '', 'streetno', {type: 'number', name: 'streetno', placeholder: userInfo.streetno, min: '1'});
    makeElNode('input', getElId('input-container__streetno'), '', '', '', {type: 'submit', value: 'Change'});
};

getUserInfo();