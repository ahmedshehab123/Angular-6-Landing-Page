// const dateTimeUtc = moment("2017-06-05T19:41:03Z").utc();
// //document.querySelector(".js-TimeUtc").innerHTML = dateTimeUtc.format("ddd, DD MMM YYYY HH:mm:ss");


// $('#js_TimeUtc').html(dateTimeUtc.format("ddd, DD MMM YYYY HH:mm:ss"));
// const selectorOptions = moment.tz.names()
//   .reduce((memo, tz) => {
//     memo.push({
//       name: tz,
//       offset: moment.tz(tz).utcOffset()
//     });
    
//     return memo;
//   }, [])
//   .sort((a, b) => {
//     return a.offset - b.offset
//   })
//   .reduce((memo, tz) => {
//     const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';

//     return memo.concat(`<option value="${tz.name}">(GMT${timezone}) ${tz.name}</option>`);
//   }, "");

// // document.querySelector(".js-Selector").innerHTML = selectorOptions;

// // console.log(selectorOptions);

// $('#js_Selector').append(selectorOptions);

// $('#js_Selector').on('change', function(){

//   const timestamp = dateTimeUtc.unix();
//   const offset = moment.tz($(this).val()).utcOffset() * 60;
//   const dateTimeLocal = moment.unix(timestamp + offset).utc();

//   $('#js_TimeLocal').html(dateTimeLocal.format("ddd, DD MMM YYYY HH:mm:ss"));
// });

const dateTimeUtc = new Date("2017-06-05T19:41:03Z");
$('#js_TimeUtc').html(dateTimeUtc.toUTCString().split(" GMT")[0]);
//document.querySelector(".js-TimeUtc").innerHTML = dateTimeUtc.toUTCString().split(" GMT")[0];

$('#js_Selector').on('change', function() {
  const dateTimeLocal = new Date(dateTimeUtc.getTime() + $(this).value * 3600 * 1000);
  $('#js_TimeLocal').html(dateTimeLocal.toUTCString().split(" GMT")[0]);
});

