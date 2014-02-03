// Copyright 2014 Dr Paul Brewer 
// Economic and Financial Technonology Consulting LLC 
// http://eaftc.com
//
// This file is made available under the terms of the MIT LICENSE. 
// see http://opensource.org/licenses/MIT 
//
// This is a toy example for testing CPU or shared hosting performance 
// from within a node.js express application
// 

var express = require('express');
var app = express();


function timeit(what, context, params){
    var t1 = +(new Date());
    var v = what.apply(context, params);
    var t2 = +(new Date());
    return {'value': v, 'ms': (t2-t1)};
}

function sumOfReciprocals(n){
    var i;
    var sum = 0.0;
    for(i=1; i<=n; ++i) sum+=(1.0/i);
    return sum;
}

function randArraySum(n){
    var i;
    var sum = 0.0;
    var A = [];
    for(i=0;i<n;++i) A[i]=Math.random();
    for(i=0;i<n;++i) sum += A[i];
    return sum;
}

function numericCompare(a,b){ return (a-b) }

function randArraySort(n){
    var i;
    var A = [];
    for(i=0;i<n;++i) A[i]=Math.random();
    A.sort(numericCompare);
    return A[0];
}

var resultDate = 0;
var resultHTML = '';

function generateResult(){
    // help avoid numeric typos by defining param array 
    // with one million as first parameter
    var million = [1000000];
    var sor   = timeit(sumOfReciprocals, {}, million);
    var rasum = timeit(randArraySum, {}, million);
    var rasort = timeit(randArraySort, {}, million);
    resultDate = new Date();
    resultHTML = '<body>'+
	'<style type="text/css">'+
	'.right { text-align: right}; '+ 
	'</style>'+
	'<h1>Node CPU Performance Test</h1>'+
	'<h2>Timing in milliseconds. Lower is Better</h2>'+
	'<h3>'+resultDate+'</h3>'+
	'<table border="1">'+
	'<tr>'+
	'<th>Time</th>'+
	'<th>Task</th>'+
	'</tr>'+
	'<tr>'+
	'<td class="right">'+sor.ms+' ms </td>'+
	'<td>Sum 1,000,000 Reciprocals</td>'+
	'</tr>'+
	'<tr>'+
	'<td class="right">'+rasum.ms+' ms </td>'+
	'<td>Generate Array, Sum of 1,000,000 random numbers</td>'+
	'</tr>'+
	'<tr>'+
	'<td class="right">'+rasort.ms+' ms </td>'+
	'<td>Generate Array, Numeric Sort 1,000,000 random numbers</td>'+
	'</tr>'+
	'</table>'+
	'<p>Manually refresh after 60 sec for new result. </p></body>';
}   
    
app.get('/', function(req,res){
    var now = new Date();
    // rate limit the on-demand testing to once per minute
    if (((1*now)-(1*resultDate))>60000) generateResult();
    res.send(resultHTML);
});


app.listen(process.env.PORT);



