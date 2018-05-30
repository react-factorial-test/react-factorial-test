
const lineData=
{

countTest:{
  _rft:'Look at this! I can even comment on my test purpose!',
  CountNullTest:{ count:null },
  Count0Test:{ count:0 },
  Count5Test:{ count:5 },
  CountNegTest:{  count:-5,_rft:'should a negative count be considered valid?', },
  CountBigTest:{  count:5000000 },
  CountWordTest:{ count:'InvalidWord' },
},
costTest:{
  _rft:'test cost parameters',
  CostnullTest:{ cost:null },
  Costval0Test:{ cost:0,_rft:'should zero be considered a valid value?', },
  Costval5Test:{ cost:5 },
  CostnegTest:{  cost:-5 },
  CostbigTest:{  cost:5000000 },
  CostwordTest:{ cost:'InvalidWord' },
},
currencyTest:{
  _rft:'test currency parameters.  Will more of these be added later?',
  CurnullTest:{ currency:null },
  CurusdTest:{  currency:'USD' },
  CurgbpTest:{  currency:'GBP',_rft:'what if this string is lower case?', },
  CureurTest:{  currency:'EUR' },
},
limitTest:{
  LimitnullTest:{ limit:null },
  Limitval0Test:{ limit:0 },
  Limitval5Test:{ limit:5 },
  LimitnegTest:{  limit:-5,_rft:'what does a negative limit mean?', },
  LimitbigTest:{  limit:5000000 },
  LimitwordTest:{ limit:'InvalidWord' },
}  

};

export default lineData;