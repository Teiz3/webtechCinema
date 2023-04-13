makeElNode('div', document.body, '', 'info-container')

function getUserInfo(){
    fetch('../../db/profile')
    .then(res => res.json()).then(
        data => {
            console.log('userinfo fetched');
            userInfo = JSON.parse(data);
            console.log(userInfo);
            makeProfilePage(userInfo[0]);
        }
    )
}

function makeProfilePage(userInfo){ 
    makeElNode('p', getElClass('info-container'), 'Name: ' + userInfo.fullname);
    makeElNode('hr', getElClass('info-container'), '', 'hr');
    makeElNode('p', getElClass('info-container'), 'Username: ' + userInfo.username);
    makeElNode('hr', getElClass('info-container'), '', 'hr');
    makeElNode('p', getElClass('info-container'), 'Email: ' + userInfo.email);
    makeElNode('hr', getElClass('info-container'), '', 'hr');
    makeElNode('p', getElClass('info-container'), 'Street: ' + userInfo.street);
    makeElNode('hr', getElClass('info-container'), '', 'hr');
    makeElNode('p', getElClass('info-container'), 'Street Number: ' + userInfo.streetno);
};

getUserInfo();