const options = {

}

fetch('http://localhost:8080/build/bundle.js', options)
.then(res => {
    console.log(res);
    return res.json();
})

///////////////////////////////////////////////////////////
.then(myjson => {
    console.log(myjson);
})

///////////////////////////////////////////////////////////
.catch(err => {
    console.log('im the err from the catch', err);
})